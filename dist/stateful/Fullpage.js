import React, {useMemo} from "../../_snowpack/pkg/react.js";
import ReactFullpage from "../../_snowpack/pkg/@fullpage/react-fullpage.js";
import Page from "../stateless/Page.js";
import Landing from "../stateless/Landing.js";
import {ShowEpoch} from "./Epoch.js";
import {UseContractState} from "../hooks/useContractState.js";
const RenderFullPageInner = ({
  next,
  previous
}) => {
  const {epochDetails} = UseContractState.useContainer();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "section"
  }, /* @__PURE__ */ React.createElement(Page, null, /* @__PURE__ */ React.createElement(Landing, {
    next
  }))), epochDetails.reverse().map((epoch, i) => /* @__PURE__ */ React.createElement("div", {
    className: "section"
  }, /* @__PURE__ */ React.createElement(Page, {
    style: {
      background: epoch.light ? "#fff" : "#000",
      ...epoch.light ? {color: "#000"} : {}
    },
    "data-anchor": `epoch-${i}`
  }, /* @__PURE__ */ React.createElement(ShowEpoch, {
    i,
    epoch,
    previous,
    next: i == 1 ? void 0 : next
  })))).valueSeq().toArray());
};
const RenderFullpage = ({state, fullpageApi}) => {
  if (fullpageApi) {
    setTimeout(() => {
      fullpageApi.setScrollingSpeed(1e3);
    }, 1e3);
  }
  const next = fullpageApi ? () => {
    fullpageApi.moveSectionDown();
  } : void 0;
  const previous = fullpageApi ? () => {
    fullpageApi.moveSectionUp();
  } : void 0;
  return /* @__PURE__ */ React.createElement(ReactFullpage.Wrapper, null, /* @__PURE__ */ React.createElement(RenderFullPageInner, {
    next,
    previous
  }));
};
const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};
export const Fullpage = () => {
  const {epochDetails} = UseContractState.useContainer();
  const isMobile = useMemo(() => true, []);
  return /* @__PURE__ */ React.createElement(ReactFullpage, {
    licenseKey: "11111111-11111111-11111111-11111111",
    scrollingSpeed: 0,
    render: RenderFullpage,
    autoScrolling: !isMobile,
    fitToSection: true,
    fitToSectionDelay: 500,
    anchors: [
      "home",
      ...epochDetails.map((x) => `epoch-${x.id}`).reverse().valueSeq().toArray()
    ]
  });
};
