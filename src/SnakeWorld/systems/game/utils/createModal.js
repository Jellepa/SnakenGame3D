// css helper function
function css(element, style) {
  for (const property in style) element.style[property] = style[property];
}

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontFamily: "Digital Dream",
  fontSize: "24px",
  width: "calc(100% - 300px)",
  height: "calc(100% - 300px)",
  background: "rgba( 20, 20, 20, 0.6 )",
  boxShadow: "0 8px 32px 0 rgba( 38, 38, 38, 0.17 )",
  backdropFilter: "blur( 4px )",
  border: "1px solid rgba( 10, 10, 10, 0.18 )",
  borderRadius: "10px",
  padding: "30px",
  overflow: "auto",
};

const createModal = () => {
  const modal = document.createElement("div");
  modal.id = "modal";
  css(modal, modalStyles);
  modal.innerHTML = "je moeder";

  return modal;
};

export { createModal };
