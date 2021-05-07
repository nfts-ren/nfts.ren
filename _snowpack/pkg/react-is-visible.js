import { c as createCommonjsModule } from './common/_commonjsHelpers-c99fd594.js';
import { r as react } from './common/index-d5182917.js';
import { h as hoistNonReactStatics_cjs } from './common/hoist-non-react-statics.cjs-da8ecf05.js';
import { r as reactDom } from './common/index-d4f662ee.js';

var interopRequireDefault = createCommonjsModule(function (module) {
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
});

var _extends_1 = createCommonjsModule(function (module) {
function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;
});

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var objectWithoutProperties = _objectWithoutProperties;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

var setPrototypeOf = createCommonjsModule(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
});

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

var inherits = _inherits;

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var getPrototypeOf = createCommonjsModule(function (module) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
});

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

var VisibilityObserver = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var intersectionObserver;
var intersectionObserverOptions = {};
var subscribers = new WeakMap();

var handleIntersections = function handleIntersections(entries) {
  return entries.forEach(function (entry) {
    var maybeEntry = subscribers.get(entry.target);

    if (maybeEntry) {
      maybeEntry.call(null, entry);
    }
  });
};

var getIntersectionObserver = function getIntersectionObserver() {
  if (!intersectionObserver) {
    intersectionObserver = new IntersectionObserver(handleIntersections, intersectionObserverOptions);
  }

  return intersectionObserver;
};

var setIntersectionObserverOptions = function setIntersectionObserverOptions(options) {
  if (intersectionObserver) {
    return;
  }

  intersectionObserverOptions = options;
};

var watch = function watch(domNode, callback) {
  if (!domNode || subscribers.has(domNode)) {
    return;
  }

  subscribers.set(domNode, callback);
  getIntersectionObserver().observe(domNode);
  return function () {
    return unwatch(domNode);
  };
};

var unwatch = function unwatch(domNode) {
  intersectionObserver.unobserve(domNode);
  subscribers["delete"](domNode);
};

var getSubscribers = function getSubscribers() {
  return subscribers;
};

var _default = {
  getSubscribers: getSubscribers,
  setIntersectionObserverOptions: setIntersectionObserverOptions,
  unwatch: unwatch,
  watch: watch
};
exports["default"] = _default;
});

var IsVisible_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = interopRequireDefault(classCallCheck);

var _createClass2 = interopRequireDefault(createClass);

var _assertThisInitialized2 = interopRequireDefault(assertThisInitialized);

var _inherits2 = interopRequireDefault(inherits);

var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);

var _defineProperty2 = interopRequireDefault(defineProperty);

var _react = interopRequireDefault(react);

var _reactDom = interopRequireDefault(reactDom);

var _VisibilityObserver = interopRequireDefault(VisibilityObserver);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var IsVisible = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2["default"])(IsVisible, _React$PureComponent);

  var _super = _createSuper(IsVisible);

  function IsVisible() {
    var _this;

    (0, _classCallCheck2["default"])(this, IsVisible);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      isVisible: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleVisibilityChange", function (_ref) {
      var isIntersecting = _ref.isIntersecting;

      if (_this.state.isVisible !== isIntersecting) {
        _this.setState({
          isVisible: isIntersecting
        });
      }

      if (isIntersecting && _this.props.once) {
        _this.unwatch();
      }
    });
    return _this;
  }

  (0, _createClass2["default"])(IsVisible, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.unwatch = _VisibilityObserver["default"].watch( // eslint-disable-next-line
      _reactDom["default"].findDOMNode(this), this.handleVisibilityChange);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unwatch();
    }
  }, {
    key: "render",
    value: function render() {
      var isVisible = this.state.isVisible;
      var renderedChildren = this.props.children(isVisible);
      return renderedChildren && _react["default"].Children.only(renderedChildren);
    }
  }]);
  return IsVisible;
}(_react["default"].PureComponent);

var _default = IsVisible;
exports["default"] = _default;
});

var withIsVisible_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withIsVisible = void 0;

var _extends2 = interopRequireDefault(_extends_1);

var _objectWithoutProperties2 = interopRequireDefault(objectWithoutProperties);

var _react = interopRequireDefault(react);

var _hoistNonReactStatics = interopRequireDefault(hoistNonReactStatics_cjs);

var _IsVisible = interopRequireDefault(IsVisible_1);

var getDisplayName = function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

var defaultOptions = {
  once: false
};

var withIsVisible = function withIsVisible(WrappedComponent) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions,
      once = _ref.once;

  var WithIsVisible = function WithIsVisible(_ref2) {
    var forwardedRef = _ref2.forwardedRef,
        props = (0, _objectWithoutProperties2["default"])(_ref2, ["forwardedRef"]);
    return /*#__PURE__*/_react["default"].createElement(_IsVisible["default"], {
      once: once
    }, function (isVisible) {
      return /*#__PURE__*/_react["default"].createElement(WrappedComponent, (0, _extends2["default"])({}, props, {
        isVisible: isVisible,
        ref: forwardedRef
      }));
    });
  };
  /* Display name */


  WithIsVisible.displayName = "WithIsVisible(".concat(getDisplayName(WrappedComponent), ")");
  /* Passes non-React static methods */

  (0, _hoistNonReactStatics["default"])(WithIsVisible, WrappedComponent);
  /* Forward refs */

  function forwardRef(props, ref) {
    return /*#__PURE__*/_react["default"].createElement(WithIsVisible, (0, _extends2["default"])({}, props, {
      forwardedRef: ref
    }));
  }

  forwardRef.displayName = "withIsVisible(".concat(getDisplayName(WrappedComponent), ")");
  return /*#__PURE__*/_react["default"].forwardRef(forwardRef);
};

exports.withIsVisible = withIsVisible;
});

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var arrayWithHoles = _arrayWithHoles;

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

var iterableToArrayLimit = _iterableToArrayLimit;

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var arrayLikeToArray = _arrayLikeToArray;

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

var unsupportedIterableToArray = _unsupportedIterableToArray;

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var nonIterableRest = _nonIterableRest;

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

var slicedToArray = _slicedToArray;

var useIsVisible_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = interopRequireDefault(slicedToArray);



var _VisibilityObserver = interopRequireDefault(VisibilityObserver);

var defaultOptions = {
  once: false
};

function useIsVisible(nodeRef) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions,
      once = _ref.once;

  var _useState = (0, react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      isVisible = _useState2[0],
      setVisible = _useState2[1];

  var handleVisibilityChange = (0, react.useCallback)(function (_ref2) {
    var isIntersecting = _ref2.isIntersecting;
    setVisible(isIntersecting);

    if (isIntersecting && once) {
      _VisibilityObserver["default"].unwatch(nodeRef.current);
    }
  }, [nodeRef, once]);
  (0, react.useEffect)(function () {
    return _VisibilityObserver["default"].watch(nodeRef.current, handleVisibilityChange);
  }, [nodeRef, handleVisibilityChange]);
  return isVisible;
}

var _default = useIsVisible;
exports["default"] = _default;
});

var lib = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "withIsVisible", {
  enumerable: true,
  get: function get() {
    return withIsVisible_1.withIsVisible;
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _IsVisible["default"];
  }
});
Object.defineProperty(exports, "useIsVisible", {
  enumerable: true,
  get: function get() {
    return _useIsVisible["default"];
  }
});
Object.defineProperty(exports, "VisibilityObserver", {
  enumerable: true,
  get: function get() {
    return _VisibilityObserver["default"];
  }
});



var _IsVisible = interopRequireDefault(IsVisible_1);

var _useIsVisible = interopRequireDefault(useIsVisible_1);

var _VisibilityObserver = interopRequireDefault(VisibilityObserver);
});

var useIsVisible = lib.useIsVisible;
export { useIsVisible };
