import {shortenTransactionHash} from "../../_snowpack/pkg/@usedapp/core.js";
import React from "../../_snowpack/pkg/react.js";
import styled from "../../_snowpack/pkg/styled-components.js";
import {getExplorerTransactionLink} from "../hooks/config.js";
import {Spinner} from "./Spinner.js";
const AStyle = styled.a`
  display: flex;
  &:hover {
    text-decoration: underline;
  }
`;
export const TransactionSummary = ({tx}) => {
  return /* @__PURE__ */ React.createElement("div", {
    style: {
      display: "flex",
      flexFlow: "row",
      justifyContent: "between",
      minWidth: "300px"
    }
  }, /* @__PURE__ */ React.createElement(AStyle, {
    href: getExplorerTransactionLink(tx.transaction.hash, tx.transaction.chainId),
    target: "_blank",
    rel: "noopener noreferrer"
  }, tx.description ? tx.description : shortenTransactionHash(tx.transaction.hash), " "), /* @__PURE__ */ React.createElement("div", null, !tx.receipt ? /* @__PURE__ */ React.createElement(Spinner, {
    size: 40
  }) : tx.transaction.status === 0 ? "\u2718" : tx.transaction.status === 1 ? "\u2714" : ""));
};
