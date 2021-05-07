import React, {useCallback} from "../../_snowpack/pkg/react.js";
import {useEthers, useTransactionsContext} from "../../_snowpack/pkg/@usedapp/core.js";
import styled from "../../_snowpack/pkg/styled-components.js";
import {Modal} from "./Modal.js";
import {utils} from "../../_snowpack/pkg/ethers.js";
import {TransactionSummary} from "../stateless/TransactionSummary.js";
import useCopyClipboard from "../hooks/useCopyToClipboard.js";
import {getExplorerAddressLink} from "../hooks/config.js";
const Title = styled.h4`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 400px;
  max-width: 80vw;
  flex: 1;
`;
const Button = styled.button`
  border: 1px solid ${(props) => props.theme.colors.highlight};
  background: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  padding: 10px;
`;
export function shortenString(str, length = 10) {
  length = Math.min(length, str.length);
  const leftSide = Math.floor((length - 2) / 2) + 2;
  const rightSide = length - leftSide;
  return length === str.length ? str : str.substring(0, leftSide) + "..." + str.substring(str.length - rightSide);
}
export function shortenAddress(address, length = 10) {
  try {
    const formattedAddress = utils.getAddress(address);
    return shortenString(formattedAddress, length);
  } catch {
    throw new TypeError("Invalid input, address can't be parsed");
  }
}
export const AccountModal = ({
  hideModal,
  ...props
}) => {
  const {account, deactivate, chainId} = useEthers();
  const {transactions} = useTransactionsContext();
  const logout = useCallback(() => {
    deactivate();
    hideModal();
  }, [deactivate, hideModal]);
  const [isCopied, setCopied] = useCopyClipboard(1e3);
  const copyAddress = useCallback(() => {
    if (account) {
      setCopied(account);
    }
  }, [account, setCopied]);
  return /* @__PURE__ */ React.createElement(Modal, {
    hideModal,
    style: {
      width: 500,
      maxWidth: "90vw",
      display: "flex",
      flexFlow: "column",
      alignItems: "flex-start",
      background: "none",
      padding: 0
    },
    ...props
  }, /* @__PURE__ */ React.createElement("div", {
    style: {
      width: "100%",
      display: "flex",
      flexFlow: "column",
      alignItems: "flex-start",
      background: "white",
      padding: 20
    }
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col"
  }, /* @__PURE__ */ React.createElement(Title, {
    className: "font-sans text-red text-c18 font-bold"
  }, "Account: ", account)), /* @__PURE__ */ React.createElement("div", {
    style: {
      marginTop: "10  px",
      display: "flex",
      flexFlow: "row",
      width: "100%",
      alignItems: "space-between",
      justifyContent: "space-between"
    }
  }, /* @__PURE__ */ React.createElement(Button, {
    className: `${!isCopied ? "cursor-pointer hover:underline" : "cursor-default"} outline-none font-sans sm:ml-auto flex items-center`,
    onClick: copyAddress
  }, isCopied ? /* @__PURE__ */ React.createElement(React.Fragment, null, "Copied") : /* @__PURE__ */ React.createElement(React.Fragment, null, "Copy address")), /* @__PURE__ */ React.createElement("a", {
    href: getExplorerAddressLink(account, chainId)
  }, /* @__PURE__ */ React.createElement(Button, null, "View on Etherscan")), /* @__PURE__ */ React.createElement(Button, {
    onClick: logout
  }, "Logout"))), /* @__PURE__ */ React.createElement("div", {
    style: {
      background: "white",
      padding: 20,
      width: "100%",
      marginTop: 8
    }
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", null, "Transaction History"), " "), /* @__PURE__ */ React.createElement("ul", {
    style: {
      maxHeight: "60vh",
      overflowY: "auto",
      display: "flex",
      flexFlow: "column",
      marginBottom: 0
    }
  }, transactions[chainId].map((tx) => {
    return /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(TransactionSummary, {
      tx
    }));
  }))));
};
