import React from "../../_snowpack/pkg/react.js";
export const Spinner = ({
  size,
  white
}) => /* @__PURE__ */ React.createElement("div", {
  className: `lds-ripple ${white ? "white" : ""}`,
  style: {marginRight: "10px", width: size, height: size}
}, /* @__PURE__ */ React.createElement("div", null), /* @__PURE__ */ React.createElement("div", null));
