import React, {useCallback, useState} from "../../_snowpack/pkg/react.js";
import {useEthers} from "../../_snowpack/pkg/@usedapp/core.js";
import {TransactionModal} from "./TransactionModal.js";
import {useClaim} from "../hooks/useClaim.js";
import Card from "../stateless/Card.js";
export const ClaimModal = ({
  title,
  epoch,
  nft,
  epochSeriesIndex,
  hideModal,
  ...props
}) => {
  const {account} = useEthers();
  const {claim, state} = useClaim();
  const [submitting, setSubmitting] = useState(false);
  const submitCallback = useCallback(async () => {
    setSubmitting(true);
    try {
      await claim(epoch.id, epochSeriesIndex);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      throw error;
    }
  }, [account, claim, epoch, epochSeriesIndex]);
  return /* @__PURE__ */ React.createElement(TransactionModal, {
    buttonLabel: `Claim`,
    submitCallback,
    status: state,
    submitting,
    noLine: true,
    hideModal,
    style: {
      padding: 30
    },
    ...props
  }, /* @__PURE__ */ React.createElement(Card, {
    inModal: true,
    nft
  }));
};
