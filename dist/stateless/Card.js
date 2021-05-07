import React, {useCallback, useEffect, useRef, useState} from "../../_snowpack/pkg/react.js";
import styled from "../../_snowpack/pkg/styled-components.js";
import {MediaType} from "../types/NFT.js";
import InnerImageZoom from "../../_snowpack/pkg/react-inner-image-zoom.js";
import LazyLoad from "../../_snowpack/pkg/react-lazyload.js";
import {useIsVisible} from "../../_snowpack/pkg/react-is-visible.js";
import {Spinner} from "./Spinner.js";
const CardOuter = styled.div`
  height: auto;
  width: 350px;
  padding: 10px;
  /* border: 0.5px solid black; */

  @media (max-width: ${(props) => props.theme.grid.maxXs}) {
    width: 250px;
    padding: 5px;
  }

  &.modal-img {
    top: 0;
    left: 0;
    position: fixed;
    display: block;
    width: 100vw;
    height: 100vh;
    background: #00000022;

    img {
      max-width: 500px;
    }
  }

  img {
    height: auto;
    width: 100%;
  }
`;
const Loader = () => {
  return /* @__PURE__ */ React.createElement("div", {
    style: {
      position: "absolute",
      display: "flex",
      left: "0",
      top: "0",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1
    }
  }, /* @__PURE__ */ React.createElement(Spinner, {
    size: "120px",
    white: true
  }));
};
export const RenderArtwork = ({
  nft,
  preview,
  inModal
}) => {
  const videoRef = useRef();
  const isVisible = useIsVisible(videoRef);
  const [loading, setLoading] = useState(true);
  const onLoaded = useCallback(() => {
    setLoading(false);
  }, [setLoading]);
  const image = nft.mediaType === MediaType.Video ? /* @__PURE__ */ React.createElement("video", {
    onLoad: onLoaded,
    ref: videoRef,
    src: nft.url,
    width: "100%",
    style: {
      objectFit: "cover",
      maxWidth: "100%",
      maxHeight: "100%",
      cursor: inModal || preview ? "default" : "zoom-in"
    },
    poster: nft.poster,
    preload: "auto",
    autoPlay: true,
    loop: true,
    playsInline: true,
    muted: true,
    controls: preview
  }) : nft.mediaType === MediaType.Gif ? /* @__PURE__ */ React.createElement("img", {
    style: {
      cursor: inModal || preview ? "default" : "zoom-in",
      minHeight: 300
    },
    onLoad: onLoaded,
    src: nft.url
  }) : nft.mediaType === MediaType.Image ? (inModal || preview) && false ? /* @__PURE__ */ React.createElement(InnerImageZoom, {
    zoomScale: 100,
    onLoad: onLoaded,
    hideHint: true,
    src: nft.url
  }) : /* @__PURE__ */ React.createElement("img", {
    style: {
      cursor: inModal || preview ? "default" : "zoom-in",
      minHeight: 300
    },
    onLoad: onLoaded,
    src: nft.url
  }) : null;
  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    if (nft.mediaType === MediaType.Video) {
      const interval = setInterval(() => setTime(Date.now()), 1e3);
      return () => {
        clearInterval(interval);
      };
    }
  }, []);
  const isPaused = videoRef.current && videoRef.current.paused;
  useEffect(() => {
    if (videoRef.current && isPaused && isVisible) {
      videoRef.current.play();
    }
  }, [isPaused, isVisible]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, image);
};
const Card = (props) => {
  return /* @__PURE__ */ React.createElement(CardOuter, {
    onClick: props.onClick
  }, /* @__PURE__ */ React.createElement(LazyLoad, {
    style: {minHeight: 300, position: "relative"},
    height: 462,
    offset: 100,
    placeholder: /* @__PURE__ */ React.createElement(Loader, null)
  }, /* @__PURE__ */ React.createElement(RenderArtwork, {
    inModal: props.inModal,
    nft: props.nft
  })));
};
export default Card;
