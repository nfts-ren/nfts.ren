import React from "../../_snowpack/pkg/react.js";
import styled from "../../_snowpack/pkg/styled-components.js";
const PageDiv = styled.div`
  width: 100%;
  height: 100vh;

  @media (max-width: ${(props) => props.theme.grid.maxSm}) {
    height: 100%;
  }
`;
const Page = (props) => /* @__PURE__ */ React.createElement(PageDiv, {
  ...props
});
export default Page;
