import React from "../../_snowpack/pkg/react.js";
import styled from "../../_snowpack/pkg/styled-components.js";
const ScrollButton = styled.button`
  background: #dcb84c;
  color: #171719;
  border: none;
  font-size: 20px;
  margin-top: 50px;
  padding: 10px 50px;
`;
const LandingDiv = styled.div`
  /* padding-top: 200px;
  @media (max-width: ${(props) => props.theme.grid.maxSm}) {
    padding-top: 80px;
  } */

  height: 100%;

  display: flex;
  flex-flow: column;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;
const Description = styled.h2`
  font-size: 6em;

  @media (max-width: ${(props) => props.theme.grid.maxLg}) {
    font-size: 3em;
  }

  /* @media (max-width: ${(props) => props.theme.grid.maxMd}) {
    font-size: 2em;
  } */

  @media (max-width: ${(props) => props.theme.grid.maxSm}) {
    text-align: center;
  }
`;
const Landing = ({
  next,
  ...props
}) => /* @__PURE__ */ React.createElement(LandingDiv, {
  ...props
}, /* @__PURE__ */ React.createElement(Description, null, /* @__PURE__ */ React.createElement("span", {
  style: {color: "#DCB84C"}
}, "Earn NFTs"), /* @__PURE__ */ React.createElement("br", null), "\xA0by ", /* @__PURE__ */ React.createElement("span", {
  style: {color: "#DCB84C"}
}, "running darknodes"), /* @__PURE__ */ React.createElement("br", null), "\xA0\xA0in the ", /* @__PURE__ */ React.createElement("span", {
  style: {color: "#DCB84C"}
}, "RenVM network"), "."), next ? /* @__PURE__ */ React.createElement(ScrollButton, {
  onClick: next
}, "View gallery") : null);
export default Landing;
