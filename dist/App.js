import React from "../_snowpack/pkg/react.js";
import {Fullpage} from "./stateful/Fullpage.js";
import styled from "../_snowpack/pkg/styled-components.js";
import Header from "./stateful/Header.js";
import {Switch, Route} from "../_snowpack/pkg/react-router-dom.js";
import Preview from "./stateful/Preview.js";
import {ModalView} from "./stateful/ModalView.js";
import {Collection} from "./stateful/Collection.js";
const AppWrapper = styled.div``;
function App({}) {
  return /* @__PURE__ */ React.createElement(AppWrapper, null, /* @__PURE__ */ React.createElement(Header, null), /* @__PURE__ */ React.createElement(ModalView, null), /* @__PURE__ */ React.createElement(Switch, null, /* @__PURE__ */ React.createElement(Route, {
    exact: true,
    path: "/collection/"
  }, /* @__PURE__ */ React.createElement(Preview, null), /* @__PURE__ */ React.createElement(Collection, null)), /* @__PURE__ */ React.createElement(Route, {
    exact: true,
    path: "/:page?"
  }, /* @__PURE__ */ React.createElement(Preview, null), /* @__PURE__ */ React.createElement(Fullpage, null)), /* @__PURE__ */ React.createElement(Route, null, "404")));
}
export default App;
