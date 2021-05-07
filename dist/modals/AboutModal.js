import React from "../../_snowpack/pkg/react.js";
import styled from "../../_snowpack/pkg/styled-components.js";
import {Modal} from "./Modal.js";
const Highlight = styled.span`
  color: ${(props) => props.theme.colors.highlight};
`;
export const AboutModal = ({
  hideModal,
  ...props
}) => {
  return /* @__PURE__ */ React.createElement(Modal, {
    hideModal,
    style: {
      padding: 30
    },
    ...props
  }, /* @__PURE__ */ React.createElement("div", {
    style: {
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
      justifyContent: "center",
      maxWidth: 400
    }
  }, /* @__PURE__ */ React.createElement("h5", {
    style: {marginBottom: "20px"}
  }, "About"), /* @__PURE__ */ React.createElement("p", {
    style: {textAlign: "center", marginBottom: "20px"}
  }, /* @__PURE__ */ React.createElement(Highlight, null, "NFTs.REN"), " is a community project that rewards darknode operators with NFTs. At the end of each epoch, operators can claim an NFT for each of their registered nodes, up to 6 per operator.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "NFTs.REN has been deployed on Ethereum and then bridged to Polygon (MATIC) to reduce claiming gas fees. Bridging back to Ethereum will be provided soon.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "Darknode operators have been airdropped 0.05 MATIC to cover claiming fees.")));
};
