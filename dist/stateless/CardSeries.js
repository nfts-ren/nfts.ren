import React, {
  useCallback,
  useRef,
  useState
} from "../../_snowpack/pkg/react.js";
import styled from "../../_snowpack/pkg/styled-components.js";
import useSmoothScroll from "../../_snowpack/pkg/react-smooth-scroll-hook.js";
const CardSeriesDiv = styled.div`
  width: 100%;
  position: relative;
`;
const ScrollButton = styled.button`
  position: absolute;
  top: 220px;
  right: 0;
  z-index: 1;
  border: 1px solid ${(props) => props.theme.colors.fg};
  background: none;
  font-size: 2em;
  background: ${(props) => props.theme.colors.bg};
  color: ${(props) => props.theme.colors.fg} !important;
  padding: 0 10px;
`;
const ScrollButtonLeft = styled(ScrollButton)`
  left: 0;
  right: unset;
`;
const CardSeriesScrollable = styled.div`
  display: flex;
  /* justify-content: space-around; */
  justify-content: flex-start;

  overflow-x: auto;

  > div + div {
    margin-left: 50px;
  }

  > div {
    &:first-child {
      padding-left: 50px;
    }
    &:last-child {
      padding-right: 50px;
    }
  }
`;
const CardSeries = (props) => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const {scrollTo} = useSmoothScroll({
    ref: innerRef,
    speed: 10,
    direction: "x"
  });
  const [scrollable, setScrollable] = useState(false);
  const innerWidth = innerRef.current && Array.from(innerRef.current.children).reduce((acc, item) => acc + item.clientWidth + 26, 0) || 0;
  const step = innerRef.current && Array.from(innerRef.current.children)[1].scrollWidth + 26;
  if (innerRef.current && innerRef.current.scrollWidth > innerRef.current.clientWidth) {
    if (!scrollable) {
      setScrollable(true);
    }
  } else {
    if (scrollable) {
      setScrollable(false);
    }
  }
  const fullyScrolled = innerRef.current && innerRef.current.scrollLeft + innerRef.current.clientWidth >= innerRef.current.scrollWidth - 100;
  const hasScrolled = innerRef.current && innerRef.current.scrollLeft > 0;
  const scrollLeft = useCallback(() => {
    if (innerRef.current) {
      scrollTo(26 + step);
    }
  }, [innerRef, innerWidth]);
  const scrollRight = useCallback(() => {
    if (innerRef.current) {
      scrollTo(-(26 + step));
    }
  }, [innerRef, innerWidth]);
  return /* @__PURE__ */ React.createElement(CardSeriesDiv, {
    ref: outerRef
  }, /* @__PURE__ */ React.createElement(CardSeriesScrollable, {
    ref: innerRef,
    ...props
  }), scrollable && !fullyScrolled ? /* @__PURE__ */ React.createElement(ScrollButton, {
    onClick: scrollLeft
  }, "\u2192") : "", scrollable && hasScrolled ? /* @__PURE__ */ React.createElement(ScrollButtonLeft, {
    onClick: scrollRight
  }, "\u2190") : "");
};
export default CardSeries;
