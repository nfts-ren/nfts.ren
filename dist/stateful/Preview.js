import React, {useCallback} from "../../_snowpack/pkg/react.js";
import styled from "../../_snowpack/pkg/styled-components.js";
import PreviewContainer from "../hooks/usePreviewContainer.js";
const PreviewDiv = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  video,
  img,
  figure {
    /* height: 100%; */
    /* width: auto; */
    width: auto;
    height: 100%;
    max-height: 100%;
    max-width: 100%;
    object-fit: cover;
  }

  figure > div > img {
    max-height: 90vh;
    max-width: 90vw;
    height: 100%;
  }
`;
const Overlay = styled.div`
  z-index: 99 !important;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #00000099;
`;
const X = styled.button`
  background: none;
  border: 1px solid ${(props) => props.theme.colors.fg};
  color: ${(props) => props.theme.colors.fg};
  position: absolute;
  top: 5px;
  right: 5px;
  visibility: hidden;
`;
const PreviewInner = styled.div`
  z-index: 101;
  position: relative;
  max-height: 90vh;
  max-width: 90vw;
  height: 100%;
  width: auto;
  object-fit: cover;

  &:hover {
    button {
      visibility: visible !important;
    }
  }
`;
const Preview = () => {
  const {image, setImage} = PreviewContainer.useContainer();
  const clear = useCallback(() => {
    setImage(null);
  }, [setImage]);
  if (image) {
    return /* @__PURE__ */ React.createElement(PreviewDiv, null, /* @__PURE__ */ React.createElement(Overlay, {
      onClick: clear
    }), /* @__PURE__ */ React.createElement(PreviewInner, null, /* @__PURE__ */ React.createElement(X, {
      onClick: clear
    }, "\u2716"), image));
  }
  return null;
};
export default Preview;
