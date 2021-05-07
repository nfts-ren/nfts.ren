import React from "../../_snowpack/pkg/react.js";
export const ExternalLink = ({children, ...props}) => /* @__PURE__ */ React.createElement("a", {
  ...props,
  target: "_blank",
  rel: "noopener noreferrer"
}, children);
