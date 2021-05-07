import React, {useCallback} from "../../_snowpack/pkg/react.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
import PreviewContainer from "../hooks/usePreviewContainer.js";
import styled from "../../_snowpack/pkg/styled-components.js";
import Card, {RenderArtwork} from "./Card.js";
const DetailedCardOuter = styled.div`
  display: flex;
  flex-flow: column;
`;
const DetailedCardBottom = styled.div`
  display: flex;
  margin: 10px 40px;
  width: calc(100% - 40px);

  justify-content: center;
  align-items: center;
`;
const ClaimButton = styled.button`
  margin-left: 20px;
  background: none;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.highlight};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
const Owned = styled(Link)`
  color: ${(props) => props.theme.colors.highlight};
  margin-left: 5px;
  margin-right: 5px;
  :hover {
    color: ${(props) => props.theme.colors.highlight};
  }
`;
const DetailedCard = ({nft, onClaim}) => {
  const {setImage} = PreviewContainer.useContainer();
  const onClick = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setImage(/* @__PURE__ */ React.createElement(RenderArtwork, {
      nft,
      preview: true
    }));
  }, [setImage]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DetailedCardOuter, null, /* @__PURE__ */ React.createElement(Card, {
    onClick,
    nft
  }), /* @__PURE__ */ React.createElement(DetailedCardBottom, null, nft.claimed || 0, nft.owned ? /* @__PURE__ */ React.createElement(Owned, {
    to: "/collection"
  }, "(", nft.owned, ")") : null, " / ", nft.count || 0, " claimed", onClaim ? /* @__PURE__ */ React.createElement(ClaimButton, {
    onClick: onClaim
  }, "Claim") : null)));
};
export default DetailedCard;
