import React from "../../_snowpack/pkg/react.js";
import {useEthers} from "../../_snowpack/pkg/@usedapp/core.js";
import {wallets} from "../hooks/config.js";
import {Modal} from "./Modal.js";
import {isMobile} from "../../_snowpack/pkg/react-device-detect.js";
import styled from "../../_snowpack/pkg/styled-components.js";
const WalletButtonStyle = styled.button`
  border: 1px solid ${(props) => props.theme.colors.highlight};
  padding: 10px;
  width: 100%;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;

  & + button {
    margin-top: 10px;
  }

  img,
  svg {
    max-width: 20px;
    max-height: 20px;
  }
`;
const WalletButton = ({
  wallet: {name, icon, href, connector},
  hideModal
}) => {
  const {activateBrowserWallet, activate} = useEthers();
  const onClick = () => {
    hideModal();
    if (connector) {
      activate(connector, void 0, true).catch(console.error);
    } else {
      activateBrowserWallet();
    }
  };
  return href ? /* @__PURE__ */ React.createElement("a", {
    style: {display: "flex", border: "1px solid black", padding: "5px"},
    className: "hoverUp",
    key: name,
    href
  }, /* @__PURE__ */ React.createElement("img", {
    style: {
      width: 20,
      height: 20,
      marginRight: 20
    },
    src: icon
  }), name) : /* @__PURE__ */ React.createElement(WalletButtonStyle, {
    style: {display: "flex"},
    className: "hoverUp",
    key: name,
    onClick
  }, /* @__PURE__ */ React.createElement("img", {
    style: {
      marginRight: 20
    },
    src: icon
  }), name);
};
export const Web3Modal = ({hideModal}) => {
  let walletsToShow = wallets;
  if (isMobile) {
    walletsToShow = walletsToShow.filter((wallet) => !wallet.desktopOnly);
  } else {
    walletsToShow = walletsToShow.filter((wallet) => !wallet.mobileOnly);
  }
  const isMetaMask = window.ethereum && window.ethereum.isMetaMask;
  if (!window.ethereum || isMetaMask) {
    walletsToShow = walletsToShow.filter((wallet) => !wallet.web3Only);
  }
  if (window.ethereum && !isMetaMask) {
    walletsToShow = walletsToShow.filter((wallet) => wallet.name !== "MetaMask");
  }
  return /* @__PURE__ */ React.createElement(Modal, {
    hideModal,
    className: "grid grid-cols-1 gap-4"
  }, walletsToShow.map((wallet) => /* @__PURE__ */ React.createElement(WalletButton, {
    wallet,
    hideModal
  })));
};
