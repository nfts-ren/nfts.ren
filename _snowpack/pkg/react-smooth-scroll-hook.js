import { r as react } from './common/index-d5182917.js';
import './common/_commonjsHelpers-c99fd594.js';

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

var Direction;

(function (Direction) {
  Direction["X"] = "x";
  Direction["Y"] = "y";
})(Direction || (Direction = {}));

var getAttrMap = function getAttrMap(direction) {
  return {
    leftTop: Direction.X === direction ? 'left' : 'top',
    offsetLeftTop: Direction.X === direction ? 'offsetLeft' : 'offsetTop',
    offsetWidthHeight: Direction.X === direction ? 'offsetWidth' : 'offsetHeight',
    scrollLeftTop: Direction.X === direction ? 'scrollLeft' : 'scrollTop',
    scrollWidthHeight: Direction.X === direction ? 'scrollWidth' : 'scrollHeight',
    clientWidthHeight: Direction.X === direction ? 'clientWidth' : 'clientHeight'
  };
};
function debounce(cb, delay) {
  if (delay === void 0) {
    delay = 100;
  }

  var timer;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    var _this = this;

    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      cb.apply(_this, args);
    }, delay);
  };
} // judge body or documentElement

var isWindowScrollParent = function isWindowScrollParent(elm) {
  return !elm.parentElement || !elm.parentElement.parentElement;
};

var getRelativeDistance = function getRelativeDistance(target, parent, attrMap) {
  if (typeof target === 'number') return target;

  if (typeof target === 'string') {
    var elm = document.querySelector(target);

    if (!elm) {
      console.warn('Please pass correct selector string for scrollTo()!');
      return 0;
    }

    var dis = 0; // if parent is document.documentElement or document.body

    if (isWindowScrollParent(parent)) {
      dis = elm.getBoundingClientRect()[attrMap.leftTop];
    } else {
      dis = elm.getBoundingClientRect()[attrMap.leftTop] - parent.getBoundingClientRect()[attrMap.leftTop];
    }

    return dis;
  }

  return 0;
};
var useSmoothScroll = function useSmoothScroll(_ref) {
  var ref = _ref.ref,
      _ref$speed = _ref.speed,
      speed = _ref$speed === void 0 ? 100 : _ref$speed,
      _ref$direction = _ref.direction,
      direction = _ref$direction === void 0 ? Direction.Y : _ref$direction,
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === void 0 ? 1 : _ref$threshold;
  var attrMap = getAttrMap(direction);

  var _useState = react.useState(true),
      reachedTop = _useState[0],
      setReachedTop = _useState[1];

  var _useState2 = react.useState(true),
      reachedBottom = _useState2[0],
      setReachedBottom = _useState2[1];

  var _useState3 = react.useState(0),
      size = _useState3[0],
      setSize = _useState3[1];

  var isTopEdge = function isTopEdge() {
    var elm = ref.current;
    if (!elm) return false;
    return elm[attrMap.scrollLeftTop] === 0;
  };

  var isBottomEdge = function isBottomEdge() {
    var elm = ref.current;
    if (!elm) return false;
    return Math.abs(elm[attrMap.scrollLeftTop] + elm[attrMap.clientWidthHeight] - elm[attrMap.scrollWidthHeight]) < threshold;
  };

  var refreshSize = debounce(function () {
    if (ref.current) {
      var _size = ref.current[attrMap.clientWidthHeight];
      setSize(_size);
    }
  });
  var refreshState = debounce(function (_evt) {
    isTopEdge() ? setReachedTop(true) : setReachedTop(false);
    isBottomEdge() ? setReachedBottom(true) : setReachedBottom(false);
  });

  var scrollTo = function scrollTo(target, offset) {
    if (!ref || !ref.current) {
      console.warn('Please pass `ref` property for your scroll container! \n Get more info at https://github.com/ron0115/react-smooth-scroll-hook');
      return;
    }

    var elm = ref.current;
    if (!elm) return;

    if (!target && typeof target !== 'number') {
      console.warn('Please pass a valid property for `scrollTo()`! \n Get more info at https://github.com/ron0115/react-smooth-scroll-hook');
    }

    var initScrollLeftTop = elm[attrMap.scrollLeftTop];
    var distance = getRelativeDistance(target, elm, attrMap); // set a offset

    if (typeof offset === 'number') {
      distance += offset;
    }

    var _speed = speed;

    var cb = function cb() {
      refreshState();
      if (distance === 0) return;
      if (isBottomEdge() && distance > 9 || distance < 0 && isTopEdge()) return;

      var gone = function gone() {
        return Math.abs(elm[attrMap.scrollLeftTop] - initScrollLeftTop);
      };

      if (Math.abs(distance) - gone() < _speed) {
        _speed = Math.abs(distance) - gone();
      } // distance to run every frame，always 1/60s


      elm[attrMap.scrollLeftTop] += _speed * (distance > 0 ? 1 : -1); // reach destination, threshold defaults to 1

      if (Math.abs(gone() - Math.abs(distance)) < threshold) {
        return;
      }

      requestAnimationFrame(cb);
    };

    requestAnimationFrame(cb);
  }; // detect dom changes


  react.useEffect(function () {
    if (!ref.current) return;
    refreshState();
    refreshSize();
    var observer = new MutationObserver(function (mutationsList, _observer) {
      // Use traditional 'for loops' for IE 11
      for (var _iterator = _createForOfIteratorHelperLoose(mutationsList), _step; !(_step = _iterator()).done;) {
        var mutation = _step.value;

        if (mutation.type === 'attributes' && mutation.target instanceof Element) {
          refreshSize();
        }
      }
    });
    observer.observe(ref.current, {
      attributes: true
    });
    window.addEventListener('resize', refreshSize);
    return function () {
      observer.disconnect();
      window.removeEventListener('resize', refreshSize);
    };
  }, [ref, refreshState, refreshSize]); // detect scrollbar changes

  react.useEffect(function () {
    if (!ref.current) return;
    var elm = ref.current;
    var observer = new MutationObserver(function (mutationsList, _observer) {
      // Use traditional 'for loops' for IE 11
      for (var _iterator2 = _createForOfIteratorHelperLoose(mutationsList), _step2; !(_step2 = _iterator2()).done;) {
        var mutation = _step2.value;

        if (mutation.type === 'childList' && mutation.target instanceof Element) {
          refreshState();
        }
      }
    });
    observer.observe(elm, {
      childList: true,
      subtree: true
    });
    elm.addEventListener('scroll', refreshState);
    return function () {
      observer.disconnect();
      elm && elm.removeEventListener('scroll', refreshState);
    };
  }, [ref, refreshState]);
  return {
    reachedTop: reachedTop,
    reachedBottom: reachedBottom,
    containerSize: size,
    scrollTo: scrollTo,

    /** @deprecated replace with scrollTo(n * containerSize) */
    scrollToPage: function scrollToPage(page) {
      scrollTo(page * size);
    },

    /** @deprecated */
    refreshState: refreshState,

    /** @deprecated */
    refreshSize: refreshSize
  };
};

export default useSmoothScroll;
