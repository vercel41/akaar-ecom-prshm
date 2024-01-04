export const getSlicedText = (text, size) => {
  if (typeof text === "string") {
    if (text.length > size) return text.slice(0, size) + "...";
  }
  return text;
};
