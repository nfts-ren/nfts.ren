import React, {useCallback, useState} from "../../_snowpack/pkg/react.js";
import styled from "../../_snowpack/pkg/styled-components.js";
import {Modal} from "./Modal.js";
const Button = styled.button`
  background: ${(props) => props.theme.colors.highlight};
  padding: 10px 40px;
  border: none;
  color: ${(props) => props.theme.colors.bg} !important;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  & + button {
    margin-left: 10px;
  }
`;
export const NetworkModal = ({
  title,
  hideModal,
  showWeb3Modal,
  ...props
}) => {
  const hasEthereum = window.ethereum;
  const [suggesting, setSuggesting] = useState(false);
  const suggestPolygon = useCallback(async () => {
    setSuggesting(true);
    try {
      await window.ethereum.sendAsync({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x89",
            chainName: "Polygon",
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18
            },
            rpcUrls: ["https://rpc-mainnet.maticvigil.com/"],
            blockExplorerUrls: ["https://explorer-mainnet.maticvigil.com/"],
            iconUrls: []
          }
        ]
      });
      showWeb3Modal();
    } catch (error) {
      console.error(error);
    }
    setSuggesting(false);
  }, []);
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
  }, "Connect to Polygon"), /* @__PURE__ */ React.createElement("p", {
    style: {textAlign: "center", marginBottom: "20px"}
  }, "NFTs.REN has been deployed on Ethereum and then bridged to Polygon (MATIC) to reduce claiming gas fees. Bridging back to Ethereum will be provided soon.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "Darknode operators have been airdropped 0.05 MATIC to cover claiming fees.")), hasEthereum ? /* @__PURE__ */ React.createElement(Button, {
    disabled: suggesting,
    onClick: suggestPolygon
  }, "Add Polygon to MetaMask") : null);
};
