import { E as EventEmitter } from './polyfill-node:events-0f2be4c8.js';

var ConnectorEvent;

(function (ConnectorEvent) {
  ConnectorEvent["Update"] = "Web3ReactUpdate";
  ConnectorEvent["Error"] = "Web3ReactError";
  ConnectorEvent["Deactivate"] = "Web3ReactDeactivate";
})(ConnectorEvent || (ConnectorEvent = {}));

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var AbstractConnector =
/*#__PURE__*/
function (_EventEmitter) {
  _inheritsLoose(AbstractConnector, _EventEmitter);

  function AbstractConnector(_temp) {
    var _this;

    var _ref = _temp === void 0 ? {} : _temp,
        supportedChainIds = _ref.supportedChainIds;

    _this = _EventEmitter.call(this) || this;
    _this.supportedChainIds = supportedChainIds;
    return _this;
  }

  var _proto = AbstractConnector.prototype;

  _proto.emitUpdate = function emitUpdate(update) {

    this.emit(ConnectorEvent.Update, update);
  };

  _proto.emitError = function emitError(error) {

    this.emit(ConnectorEvent.Error, error);
  };

  _proto.emitDeactivate = function emitDeactivate() {

    this.emit(ConnectorEvent.Deactivate);
  };

  return AbstractConnector;
}(EventEmitter);

export { AbstractConnector as A, ConnectorEvent as C };
