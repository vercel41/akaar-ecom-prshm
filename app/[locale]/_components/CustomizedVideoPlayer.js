import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Image from "next/image";

const BackgroundVideo = ({ videoLink, height = "100vh", style = {}, placeholderImage, imageHeight }) => {
  const [showOverlay, setShowOverlay] = useState(true);

  

  const extractYouTubeID = (url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  const videoID = extractYouTubeID(videoLink);

  // Automatically hide the overlay after a short delay
  useEffect(() => {
    if (videoID) {
      const timer = setTimeout(() => {
        setShowOverlay(false);
      }, 1000); // 1-second delay to allow the iframe to load

      return () => clearTimeout(timer); // Cleanup on component unmount
    }
  }, [videoID]);

  // Early return if videoLink is invalid or missing
  if (!videoLink) {
    return <p style={{ color: "red" }}>No video link provided</p>;
  }

  if (!videoID) {
    return <p style={{ color: "red" }}>Invalid YouTube video link</p>;
  }

  return (
    <div
      style={{
        position: "relative",
        height,
        overflow: "hidden",
        ...style,
      }}
    >
      {showOverlay && placeholderImage && (
        <Image
          src={placeholderImage}
          alt="Video loading..."
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: {imageHeight},
            objectFit: "cover",
            zIndex: 2, // Ensures the image is above the iframe
            transition: "opacity 0.5s ease", // Fade-out effect
            opacity: showOverlay ? 1 : 0,
          }}
        />
      )}
      <iframe
        src={`https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1&loop=1&playlist=${videoID}&controls=0&modestbranding=1&fs=0&disablekb=1`}
        frameBorder="0"
        allow="autoplay; fullscreen"
        aria-disabled="true"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          objectFit: "cover", // Ensures the video covers the container
        }}
      ></iframe>
    </div>
  );
};

BackgroundVideo.propTypes = {
  videoLink: PropTypes.string.isRequired,
  height: PropTypes.string,
  style: PropTypes.object,
  placeholderImage: PropTypes.string, // URL of the placeholder image
};

export default BackgroundVideo;
