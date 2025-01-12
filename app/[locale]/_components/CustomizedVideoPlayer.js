import React from "react";
import PropTypes from "prop-types";

const BackgroundVideo = ({ videoLink, height = "100vh", style = {} }) => {
  const extractYouTubeID = (url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  if (!videoLink) {
    return <p style={{ color: "red" }}>No video link provided</p>;
  }

  const videoID = extractYouTubeID(videoLink);

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
      <iframe
        src={`https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1&loop=1&playlist=${videoID}`}
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          objectFit: "cover", // Ensures video covers the entire container, cropping as necessary
        }}
      ></iframe>
    </div>
  );
};

BackgroundVideo.propTypes = {
  videoLink: PropTypes.string.isRequired,
  height: PropTypes.string,
  style: PropTypes.object,
};

export default BackgroundVideo;
