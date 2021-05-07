import React, {useCallback, useMemo, useState} from "../../_snowpack/pkg/react.js";
import {useEthers} from "../../_snowpack/pkg/@usedapp/core.js";
import {getAddress} from "../../_snowpack/pkg/@ethersproject/address.js";
import {TransactionModal} from "./TransactionModal.js";
import {useContractFunction} from "../hooks/useContractFunction.js";
import {useNFTPolygonContract} from "../hooks/useContract.js";
import Card from "../stateless/Card.js";
import styled from "../../_snowpack/pkg/styled-components.js";
const Input = styled.input`
  border: 1px solid ${(props) => props.theme.colors.highlight};
  width: 100%;
  margin-bottom: 10px;
`;
export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}
const isENS = (address) => {
  return !!(address && address.length > 4 && address.toLowerCase().slice(-4) === ".eth");
};
export const TransferModal = ({
  nft,
  hideModal,
  ...props
}) => {
  const {chainId, account} = useEthers();
  const nftContract = useNFTPolygonContract(chainId);
  const [recipient, setRecipient] = useState("");
  const recipientIsValid = useMemo(() => isENS(recipient) || isAddress(recipient), [recipient]);
  const onChange = useCallback((e) => {
    setRecipient(e.target.value || "");
  }, [setRecipient]);
  const description = `Transfer NFT`;
  const {send, state} = useContractFunction(nftContract, "safeTransferFrom", description);
  const [submitting, setSubmitting] = useState(false);
  const submitCallback = useCallback(async () => {
    setSubmitting(true);
    try {
      await send(account, recipient, nft.tokenId, 1, []);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      throw error;
    }
  }, [nft, recipient, account, send]);
  const handleKeypress = useCallback((e) => {
    if (e.key === "Enter") {
      submitCallback();
    }
  }, [submitCallback]);
  return /* @__PURE__ */ React.createElement(TransactionModal, {
    buttonLabel: `Transfer`,
    submitCallback: recipientIsValid ? submitCallback : void 0,
    status: state,
    submitting,
    noLine: true,
    hideModal,
    style: {
      padding: 30
    },
    ...props
  }, /* @__PURE__ */ React.createElement("div", {
    style: {
      width: 400,
      maxWidth: "90vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  }, /* @__PURE__ */ React.createElement(Card, {
    inModal: true,
    nft
  })), /* @__PURE__ */ React.createElement("h3", {
    className: "font-bebas text-left text-black text-3xl mt-c16 break-words"
  }, description), /* @__PURE__ */ React.createElement(Input, {
    className: "bg-white border-black border-2 text-black py-2 px-2 rounded flex-grow-0 mt-c16 w-full",
    type: "text",
    value: recipient,
    onChange,
    placeholder: "Recipient",
    onKeyPress: handleKeypress,
    disabled: submitting || !!status && status !== "None"
  }));
};
