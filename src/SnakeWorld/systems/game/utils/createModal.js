// css helper function
function css(element, style) {
  for (const property in style) element.style[property] = style[property];
}

const modalStyles = {
  position: "fixed", // Changed from absolute to fixed for better viewport handling
  top: "0",
  left: "0",
  width: "100%",
  height: "100vh", // Use viewport height instead of 100%
  fontFamily: "Digital Dream",
  fontSize: "16px", // Smaller font size for better readability
  background: "rgba( 20, 20, 20, 0.7 )", // Slightly more opaque for fullscreen
  boxShadow: "0 8px 32px 0 rgba( 38, 38, 38, 0.17 )",
  backdropFilter: "blur( 4px )",
  border: "none", // Remove border for fullscreen
  borderRadius: "0", // Remove border radius for fullscreen
  padding: "30px 20px 80px 20px", // More bottom padding, less side padding
  overflowY: "auto", // Auto instead of scroll to show scrollbar only when needed
  overflowX: "hidden", // Hide horizontal scrollbar
  display: "none",
  zIndex: "1000", // Ensure it's on top
  boxSizing: "border-box", // Include padding in height calculation
};

const createModal = () => {
  const modal = document.createElement("div");
  modal.id = "modal";
  css(modal, modalStyles);

  return modal;
};

export { createModal };
