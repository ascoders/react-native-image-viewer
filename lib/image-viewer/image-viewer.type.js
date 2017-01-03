"use strict";

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require("react");
var ReactNative = require("react-native");
var image_viewer_style_1 = require("./image-viewer.style");

var PropsGaea = function PropsGaea() {
    (0, _classCallCheck3.default)(this, PropsGaea);

    this.gaeaName = '大图浏览';
    this.gaeaIcon = 'square-o';
    this.gaeaUniqueKey = 'nt-image-viewer';
};

exports.PropsGaea = PropsGaea;

var Props = function (_PropsGaea) {
    (0, _inherits3.default)(Props, _PropsGaea);

    function Props() {
        (0, _classCallCheck3.default)(this, Props);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Props.__proto__ || Object.getPrototypeOf(Props)).apply(this, arguments));

        _this.show = false;
        _this.imageUrls = [];
        _this.enableImageZoom = true;
        _this.visible = false;
        _this.flipThreshold = 80;
        _this.maxOverflow = 300;
        _this.failImageSource = '';
        _this.index = 0;
        _this.saveToLocalByLongPress = true;
        _this.onShowModal = function () {};
        _this.onCancel = function () {};
        _this.loadingRender = function () {
            return null;
        };
        _this.onSaveToCamera = function () {};
        _this.onChange = function () {};
        _this.onClick = function (close) {
            close();
        };
        _this.onDoubleClick = function (close) {};
        _this.renderHeader = function () {
            return null;
        };
        _this.renderFooter = function () {
            return null;
        };
        _this.renderIndicator = function (currentIndex, allSize) {
            return React.createElement(ReactNative.View, { style: image_viewer_style_1.simpleStyle.count }, React.createElement(ReactNative.Text, { style: image_viewer_style_1.simpleStyle.countText }, currentIndex + '/' + allSize));
        };
        _this.renderArrowLeft = function () {
            return null;
        };
        _this.renderArrowRight = function () {
            return null;
        };
        return _this;
    }

    return Props;
}(PropsGaea);

exports.Props = Props;

var State = function State() {
    (0, _classCallCheck3.default)(this, State);

    this.show = false;
    this.currentShowIndex = 0;
    this.imageSizes = [];
    this.isShowMenu = false;
};

exports.State = State;