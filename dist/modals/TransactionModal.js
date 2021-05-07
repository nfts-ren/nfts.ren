import React, {useCallback, useState} from "../../_snowpack/pkg/react.js";
import {shortenTransactionHash, useEthers} from "../../_snowpack/pkg/@usedapp/core.js";
import {Modal} from "./Modal.js";
import styled from "../../_snowpack/pkg/styled-components.js";
import {Spinner} from "../stateless/Spinner.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
import {getExplorerTransactionLink, sleep} from "../hooks/config.js";
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
export const TransactionModal = ({
  status,
  submitCallback,
  hideModal,
  buttonLabel,
  children,
  noLine,
  submitting: submittingProp,
  disabled,
  ...props
}) => {
  const {chainId} = useEthers();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState();
  const onClick = useCallback(async () => {
    if (!submitCallback) {
      return;
    }
    setError(void 0);
    await sleep(0);
    setSubmitting(true);
    try {
      await submitCallback();
    } catch (error2) {
      setError(String(error2.message || error2));
    }
    setSubmitting(false);
  }, [submitCallback, setSubmitting]);
  const disableButton = !submitCallback || submitting || submittingProp || disabled;
  return /* @__PURE__ */ React.createElement(Modal, {
    hideModal,
    ...props
  }, /* @__PURE__ */ React.createElement("div", null, children), /* @__PURE__ */ React.createElement("div", {
    style: {
      display: "flex",
      flexFlow: "column",
      justifyContent: "center",
      alignItems: "center",
      borderTop: noLine ? "" : "",
      width: "100%"
    }
  }, error ? /* @__PURE__ */ React.createElement("p", {
    className: "text-red border-red border-2 p-2 m-2 text-center mt-4",
    style: {width: "100%"}
  }, error) : null, status.status === "Fail" || status.status === "Exception" ? /* @__PURE__ */ React.createElement("p", {
    className: "text-red border-red border-2 p-2 m-2 text-center mt-4",
    style: {width: "100%"}
  }, status.status === "Exception" && status.rejected ? /* @__PURE__ */ React.createElement(React.Fragment, null, "Transaction rejected.") : /* @__PURE__ */ React.createElement(React.Fragment, null, status.errorMessage || "An error occured")) : null, status.status === "Success" ? /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col items-center justify-center",
    style: {
      width: "100%",
      display: "flex",
      flexFlow: "column",
      justifyContent: "center",
      alignItems: "center"
    }
  }, /* @__PURE__ */ React.createElement("span", {
    style: {marginBottom: "10px"}
  }, buttonLabel, " successful -", " ", /* @__PURE__ */ React.createElement("a", {
    href: getExplorerTransactionLink(status.transaction.hash, status.transaction.chainId || chainId),
    target: "_blank",
    rel: "noopener noreferrer"
  }, shortenTransactionHash(status.transaction.hash))), /* @__PURE__ */ React.createElement(Link, {
    onClick: hideModal,
    to: "/collection",
    className: "underline"
  }, "View collection.")) : status.status === "Mining" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    style: {
      minWidth: "300px",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexFlow: "row"
    }
  }, "Confirming...", /* @__PURE__ */ React.createElement(Spinner, {
    size: 40
  }), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("a", {
    href: getExplorerTransactionLink(status.transaction.hash, status.transaction.chainId || chainId),
    target: "_blank",
    rel: "noopener noreferrer"
  }, shortenTransactionHash(status.transaction.hash))))) : /* @__PURE__ */ React.createElement(Button, {
    onClick,
    style: {
      width: "100%"
    },
    disabled: disableButton
  }, status.status === "Fail" || status.status === "Exception" ? "Retry" : submitting || submittingProp ? "Submitting..." : buttonLabel || "Submit transaction")));
};
