import React, {useCallback, useMemo} from "../../_snowpack/pkg/react.js";
import styled from "../../_snowpack/pkg/styled-components.js";
import DetailedCard from "../stateless/DetailedCard.js";
import CardSeries from "../stateless/CardSeries.js";
import {ClaimModal} from "../modals/ClaimModal.js";
import {useEthers} from "../../_snowpack/pkg/@usedapp/core.js";
import {UseModal} from "./ModalView.js";
import {ExternalLink} from "../stateless/ExternalLink.js";
import ReactTooltip from "../../_snowpack/pkg/react-tooltip.js";
const EpochDiv = styled.div`
  display: flex;
  flex-flow: column;

  height: 100%;

  padding-top: 200px;

  @media (max-width: ${(props) => props.theme.grid.maxSm}) {
    padding-top: 80px;
  }

  color: ${(props) => props.light ? props.theme.colors.bg : props.theme.colors.fg};

  button {
    color: ${(props) => props.light ? props.theme.colors.bg : props.theme.colors.fg};
  }
`;
const EpochTopTop = styled.div`
  @media (max-width: ${(props) => props.theme.grid.maxSm}) {
    display: none;
  }

  padding: 0 100px;
  min-width: 500px;
  @media (max-width: ${(props) => props.theme.grid.maxLg}) {
    min-width: 400px;
  }
  @media (max-width: ${(props) => props.theme.grid.maxSm}) {
    padding: 0 20px;
    min-width: 200px;
  }
  @media (max-width: ${(props) => props.theme.grid.maxXs}) {
    min-width: 150px;
  }
  padding-right: 20px;
  margin-bottom: 30px;
`;
const EpochTopTopMobile = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  @media (min-width: ${(props) => props.theme.grid.minMd}) {
    display: none;
  }
`;
const EpochBottom = styled.div`
  display: flex;
  flex-flow: column;
  padding: 20px 100px;

  @media (max-width: ${(props) => props.theme.grid.maxSm}) {
    display: none;
  }
`;
const EpochRight = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  max-width: 100vw;
  /* align-items: center; */
`;
const EpochTitle = styled.h3`
  font-size: 3em;

  @media (max-width: ${(props) => props.theme.grid.maxLg}) {
    font-size: 2em;
  }
`;
const Highlight = styled.span`
  color: ${(props) => props.theme.colors.highlight};
`;
const NavButton = styled.button`
  background: ${(props) => props.theme.colors.highlight};
  padding: 10px 40px;
  border: none;
  color: ${(props) => props.theme.colors.bg} !important;

  & + button {
    margin-left: 10px;
  }
`;
const TooltipOuter = styled.div`
  display: inline-block;
  > div {
    max-width: 300px;
    text-align: center;
  }
`;
const TooltipA = styled.a`
  border: 1px solid ${(props) => props.theme.colors.highlight};
  padding: 2px;
  color: black;
  width: 25px;
  display: inline-block;
  text-align: center;
  :hover {
    text-decoration: none;
    color: black;
    cursor: pointer;
  }
`;
const Tooltip = ({children}) => {
  return /* @__PURE__ */ React.createElement(TooltipOuter, null, /* @__PURE__ */ React.createElement(TooltipA, {
    "data-tip": "React-tooltip"
  }, "i"), /* @__PURE__ */ React.createElement(ReactTooltip, {
    place: "top",
    type: "light",
    effect: "solid"
  }, children));
};
export const ShowEpoch = ({
  next,
  previous,
  epoch,
  i,
  ...props
}) => {
  const {account} = useEthers();
  const {setModal, clearModal} = UseModal.useContainer();
  const showClaimModal = useCallback((params) => {
    setModal(/* @__PURE__ */ React.createElement(ClaimModal, {
      epoch: params.epoch,
      nft: params.nft,
      epochSeriesIndex: params.epochSeriesIndex,
      hideModal: clearModal
    }));
  }, [setModal]);
  const accountCount = useMemo(() => account && epoch ? epoch.operators[account.toLowerCase()] : void 0, [account, epoch]);
  const accountClaimed = useMemo(() => account && epoch ? epoch.nfts.reduce((sum, nft) => sum + (nft.owned || 0), 0) : void 0, [account, epoch]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(EpochDiv, {
    light: epoch.light,
    ...props
  }, /* @__PURE__ */ React.createElement(EpochRight, {
    className: "col-xl-9"
  }, /* @__PURE__ */ React.createElement(EpochTopTopMobile, null, /* @__PURE__ */ React.createElement(EpochTitle, null, "EPOCH", " ", /* @__PURE__ */ React.createElement("span", {
    style: {
      backgroundColor: "#DCB84C",
      padding: 10,
      marginLeft: -10
    }
  }, epoch.id)), epoch.artist ? /* @__PURE__ */ React.createElement("span", {
    style: {fontSize: 18, textAlign: "right"}
  }, "by", " ", /* @__PURE__ */ React.createElement(ExternalLink, {
    target: "_blank",
    href: epoch.artistLink,
    style: {color: "#DCB84C"}
  }, "@", epoch.artist)) : null, account && accountCount && accountCount > 0 ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(Highlight, null, accountClaimed, "/", accountCount), " ", "claimed by ", /* @__PURE__ */ React.createElement(Highlight, null, account.slice(0, 8)))) : null), /* @__PURE__ */ React.createElement(CardSeries, {
    className: "no-scrollbar"
  }, /* @__PURE__ */ React.createElement(EpochTopTop, null, epoch.title ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(EpochTitle, {
    style: {textTransform: "uppercase", marginBottom: 0}
  }, epoch.title)) : /* @__PURE__ */ React.createElement(EpochTitle, null, "EPOCH", " ", /* @__PURE__ */ React.createElement("span", {
    style: {
      backgroundColor: "#DCB84C",
      padding: 10,
      marginLeft: -10
    }
  }, epoch.id)), epoch.title ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", null, "epoch ", epoch.id, " - artist feature", " ", /* @__PURE__ */ React.createElement(Tooltip, null, "Artist features are drops by established or upcoming NFT artists, featuring artworks that aren't necessarily Ren-themed.")), /* @__PURE__ */ React.createElement("br", null)) : null, epoch.artist ? /* @__PURE__ */ React.createElement("div", {
    style: {marginBottom: "20px"}
  }, "by", " ", /* @__PURE__ */ React.createElement(ExternalLink, {
    target: "_blank",
    href: epoch.artistLink,
    style: {color: "#DCB84C"}
  }, "@", epoch.artist), ".") : null, epoch.darknodes, " darknodes.", /* @__PURE__ */ React.createElement("br", null), epoch.operatorsCount, " operators.", account && accountCount && accountCount > 0 && accountClaimed !== void 0 ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(Highlight, null, accountClaimed, "/", accountCount), " ", "claimed by ", /* @__PURE__ */ React.createElement(Highlight, null, account.slice(0, 8)), ".") : null), epoch.nfts.map((nft, epochSeriesIndex) => {
    const onClaim = () => {
      showClaimModal({epoch: {...epoch}, nft, epochSeriesIndex});
    };
    return /* @__PURE__ */ React.createElement(DetailedCard, {
      key: nft.name,
      nft,
      onClaim: account && accountCount && accountClaimed !== void 0 && accountClaimed < accountCount ? onClaim : void 0
    });
  }))), /* @__PURE__ */ React.createElement(EpochBottom, null, /* @__PURE__ */ React.createElement("div", {
    style: {marginTop: 20}
  }, /* @__PURE__ */ React.createElement(NavButton, {
    onClick: previous
  }, "previous"), next ? /* @__PURE__ */ React.createElement(NavButton, {
    onClick: next
  }, "next") : null))));
};
