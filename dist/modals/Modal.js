import React from "../../_snowpack/pkg/react.js";
import styled from "../../_snowpack/pkg/styled-components.js";
const ModalOverlay = styled.div`
  position: fixed;
  left: 0%;
  top: 0%;
  z-index: 100;
  background: #000;
  opacity: 0.8;
  width: 100vw;
  height: 100vh;
  cursor: pointer;
`;
const ModalContainer = styled.div`
  /* flex flex-col justify-evenly items-center absolute bg-white text-black border-5 border-black shadow-cardred p-c24 */

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  background: white;
  color: black;
  padding: 24px;
`;
export const Modal = ({
  hideModal,
  className,
  style,
  children,
  ...props
}) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ModalOverlay, {
    onClick: hideModal
  }), /* @__PURE__ */ React.createElement(ModalContainer, {
    className,
    style: {
      zIndex: 110,
      minWidth: 300,
      maxWidth: props.maxWOverride ? "" : "96vw",
      maxHeight: "96vh",
      position: "fixed",
      transform: "translate(-50%, -50%)",
      top: "50%",
      left: "50%",
      ...style
    },
    ...props
  }, children));
};
