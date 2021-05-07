import React, {useCallback} from "../../_snowpack/pkg/react.js";
import styled from "../../_snowpack/pkg/styled-components.js";
import {UseContractState} from "../hooks/useContractState.js";
import Card from "../stateless/Card.js";
import {TransferModal} from "../modals/TransferModal.js";
import {UseModal} from "./ModalView.js";
import {Spinner} from "../stateless/Spinner.js";
const CollectionDiv = styled.div`
  display: flex;
  flex-flow: column;
  background: ${(props) => props.theme.colors.bg};
  color: ${(props) => props.theme.colors.fg};
  min-height: 100vh;

  padding-left: 200px;
  padding-right: 200px;

  padding-top: 200px;

  @media (max-width: ${(props) => props.theme.grid.maxSm}) {
    padding-top: 80px;
  }
`;
const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const RenderFullPageInner = ({
  next,
  previous
}) => {
  const {account, epochDetails, loading} = UseContractState.useContainer();
  const {setModal, clearModal} = UseModal.useContainer();
  const showTransferModal = useCallback((params) => {
    setModal(/* @__PURE__ */ React.createElement(TransferModal, {
      epoch: params.epoch,
      nft: params.nft,
      epochSeriesIndex: params.epochSeriesIndex,
      hideModal: clearModal
    }));
  }, [setModal]);
  return /* @__PURE__ */ React.createElement(CollectionDiv, null, /* @__PURE__ */ React.createElement("h2", {
    style: {marginBottom: 30}
  }, "Your Collection"), /* @__PURE__ */ React.createElement(Cards, null, !account ? /* @__PURE__ */ React.createElement("p", null, "Log in to see your collection.") : loading ? /* @__PURE__ */ React.createElement("div", {
    style: {
      width: "100%",
      display: "flex",
      flexFlow: "column",
      justifyContent: "center",
      alignItems: "center"
    }
  }, /* @__PURE__ */ React.createElement(Spinner, {
    white: true,
    size: "120px"
  })) : epochDetails.reverse().map((epoch, i) => {
    const epochCards = epoch.nfts.map((nft, epochSeriesIndex) => {
      const ret = [];
      for (let i2 = 0; i2 < (nft.owned || 0); i2++) {
        const onClick = () => {
          showTransferModal({
            epoch: {...epoch},
            nft,
            epochSeriesIndex
          });
        };
        ret.push(/* @__PURE__ */ React.createElement(Card, {
          onClick,
          nft
        }));
      }
      return ret;
    });
    const hasCards = epochCards.reduce((any, x) => any || x.length > 0, false);
    if (!hasCards) {
      return;
    }
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        width: "100%",
        marginBottom: "50px"
      }
    }, /* @__PURE__ */ React.createElement("h4", {
      style: {marginBottom: 10}
    }, "Epoch ", epoch.id), /* @__PURE__ */ React.createElement("div", {
      style: {
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "center"
      }
    }, epochCards));
  }).valueSeq().toArray()));
};
export const Collection = () => {
  return /* @__PURE__ */ React.createElement(RenderFullPageInner, {
    next: void 0,
    previous: void 0
  });
};
