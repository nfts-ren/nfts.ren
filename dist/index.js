import * as __SNOWPACK_ENV__ from '../_snowpack/env.js';
import.meta.env = __SNOWPACK_ENV__;

import React from "../_snowpack/pkg/react.js";
import ReactDOM from "../_snowpack/pkg/react-dom.js";
import {ThemeProvider} from "../_snowpack/pkg/styled-components.js";
import App from "./App.js";
import "./index.css.proxy.js";
import {theme} from "./theme.js";
import PreviewContainer from "./hooks/usePreviewContainer.js";
import {ToastContainer} from "../_snowpack/pkg/react-toastify.js";
import {DAppProvider} from "../_snowpack/pkg/@usedapp/core.js";
import {UseContractState} from "./hooks/useContractState.js";
import {dappConfig} from "./hooks/config.js";
import {Router} from "../_snowpack/pkg/react-router-dom.js";
import {UseModal} from "./stateful/ModalView.js";
import {history} from "./hooks/createHistory.js";
import "../_snowpack/pkg/react-toastify/dist/ReactToastify.css.proxy.js";
import "../_snowpack/pkg/video-react/dist/video-react.css.proxy.js";
import "../_snowpack/pkg/bootstrap/dist/css/bootstrap.min.css.proxy.js";
import "../_snowpack/pkg/react-inner-image-zoom/lib/InnerImageZoom/styles.css.proxy.js";
ReactDOM.render(/* @__PURE__ */ React.createElement(React.StrictMode, null, /* @__PURE__ */ React.createElement(UseModal.Provider, null, /* @__PURE__ */ React.createElement(DAppProvider, {
  config: dappConfig
}, /* @__PURE__ */ React.createElement(ThemeProvider, {
  theme
}, /* @__PURE__ */ React.createElement(Router, {
  history
}, /* @__PURE__ */ React.createElement(ToastContainer, null), /* @__PURE__ */ React.createElement(UseContractState.Provider, null, /* @__PURE__ */ React.createElement(PreviewContainer.Provider, null, /* @__PURE__ */ React.createElement(App, null)))))))), document.getElementById("root"));
if (undefined /* [snowpack] import.meta.hot */ ) {
  undefined /* [snowpack] import.meta.hot */ .accept();
}
