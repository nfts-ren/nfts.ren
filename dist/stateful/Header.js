import React, {useCallback, useEffect, useState} from "../../_snowpack/pkg/react.js";
import styled from "../../_snowpack/pkg/styled-components.js";
import Navbar from "../../_snowpack/pkg/react-bootstrap/esm/Navbar.js";
import Nav from "../../_snowpack/pkg/react-bootstrap/esm/Nav.js";
import {useEthers} from "../../_snowpack/pkg/@usedapp/core.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
import Logo from "../img/ren.svg.proxy.js";
import {useLocation} from "../../_snowpack/pkg/react-router-dom.js";
import {UseModal} from "./ModalView.js";
import {NetworkModal} from "../modals/NetworkModal.js";
import {AccountModal} from "../modals/AccountModal.js";
import {Web3Modal} from "../modals/Web3Modal.js";
import {AboutModal} from "../modals/AboutModal.js";
const HeaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  z-index: 1;

  padding: 0 0px;

  button,
  a {
    color: #0006 !important;
    opacity: 1;
    text-shadow: 0.5px 0.5px ${(props) => props.theme.colors.fg} !important;
  }

  @media (max-width: ${(props) => props.theme.grid.maxSm}) {
    padding: 0;
  }

  img {
    width: 100px;

    @media (max-width: ${(props) => props.theme.grid.maxLg}) {
      width: 80px;
    }
    @media (max-width: ${(props) => props.theme.grid.maxSm}) {
      width: 60px;
    }
  }

  a {
    padding: 10px !important;

    @media (max-width: ${(props) => props.theme.grid.maxSm}) {
      padding: 5px !important;
    }

    & + a {
      margin-left: 20px;
    }

    text-transform: uppercase;
    text-align: center;
    line-height: 1.2em;
    font-size: 1em;

    &.highlighted {
      border: 1px solid ${(props) => props.theme.colors.highlight};
    }
  }
`;
const NavLink = ({
  path,
  title
}) => {
  const location2 = useLocation();
  return /* @__PURE__ */ React.createElement(Nav.Link, {
    className: location2.pathname === path ? "active" : "",
    href: path
  }, title);
};
const Header = () => {
  const {activateBrowserWallet, account, chainId, error} = useEthers();
  const {setModal, clearModal} = UseModal.useContainer();
  const [shownWrongNetwork, setShownWrongNetwork] = useState(true);
  const clearNetworkModal = useCallback(() => {
    clearModal();
    setShownWrongNetwork(false);
  }, [clearModal, setShownWrongNetwork]);
  const connectCallback = useCallback(() => {
    setShownWrongNetwork(false);
    setModal(/* @__PURE__ */ React.createElement(Web3Modal, {
      hideModal: clearModal
    }));
  }, [setShownWrongNetwork]);
  useEffect(() => {
    if (error && error.message.match(/Unsupported chain id/) && !shownWrongNetwork) {
      setShownWrongNetwork(true);
      setModal(/* @__PURE__ */ React.createElement(NetworkModal, {
        showWeb3Modal: connectCallback,
        hideModal: clearNetworkModal
      }));
    }
  }, [error, shownWrongNetwork, setShownWrongNetwork, setModal]);
  const showAccountModal = useCallback(() => {
    setModal(/* @__PURE__ */ React.createElement(AccountModal, {
      hideModal: clearModal
    }));
  }, [setModal, clearModal]);
  const showAboutModal = useCallback(() => {
    setModal(/* @__PURE__ */ React.createElement(AboutModal, {
      hideModal: clearModal
    }));
  }, [setModal, clearModal]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(HeaderWrapper, null, /* @__PURE__ */ React.createElement(Navbar, {
    expand: "lg",
    className: "justify-content-between"
  }, /* @__PURE__ */ React.createElement(Link, {
    to: "/"
  }, /* @__PURE__ */ React.createElement(Navbar.Brand, null, /* @__PURE__ */ React.createElement("img", {
    src: Logo
  }))), /* @__PURE__ */ React.createElement(Navbar.Toggle, {
    "aria-controls": "basic-navbar-nav"
  }), /* @__PURE__ */ React.createElement(Navbar.Collapse, {
    id: "basic-navbar-nav",
    className: "justify-content-end"
  }, /* @__PURE__ */ React.createElement(Nav, {
    className: "justify-content-end"
  }, /* @__PURE__ */ React.createElement("a", {
    style: {cursor: "pointer"}
  }, /* @__PURE__ */ React.createElement(Nav.Item, {
    onClick: showAboutModal,
    className: location.pathname
  }, "About")), /* @__PURE__ */ React.createElement(Link, {
    to: "/collection"
  }, /* @__PURE__ */ React.createElement(Nav.Item, {
    className: location.pathname
  }, "Collection")), account ? /* @__PURE__ */ React.createElement(Nav.Link, {
    className: "highlighted",
    onClick: showAccountModal
  }, account.slice(0, 8)) : /* @__PURE__ */ React.createElement(Nav.Link, {
    onClick: connectCallback,
    className: "highlighted"
  }, "Connect Wallet"))))));
};
export default Header;
