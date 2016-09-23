"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require('react');
var react_native_1 = require('react-native');
var typings = require('./image-viewer.type');
var index_1 = require('nt-auto-bind');
var index_2 = require('nt-transmit-transparently');
var index_3 = require('react-native-image-pan-zoom');
var image_viewer_style_1 = require('./image-viewer.style');
var ImageViewer = function (_React$Component) {
    _inherits(ImageViewer, _React$Component);

    function ImageViewer() {
        var _ref;

        _classCallCheck(this, ImageViewer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = ImageViewer.__proto__ || Object.getPrototypeOf(ImageViewer)).call.apply(_ref, [this].concat(args)));

        _this.state = new typings.State();
        _this.fadeAnim = new react_native_1.Animated.Value(0);
        _this.standardPositionX = 0;
        _this.positionXNumber = 0;
        _this.positionX = new react_native_1.Animated.Value(0);
        return _this;
    }

    _createClass(ImageViewer, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.init(this.props);
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            this.init(nextProps);
        }
    }, {
        key: "init",
        value: function init(nextProps) {
            var _this2 = this;

            if (!nextProps.visible || nextProps.imageUrls.length === 0) {
                this.fadeAnim.setValue(0);
                return this.setState(new typings.State());
            }
            var imageSizes = [];
            nextProps.imageUrls.forEach(function (imageUrl) {
                imageSizes.push({
                    width: 0,
                    height: 0,
                    status: 'loading'
                });
            });
            this.setState({
                currentShowIndex: nextProps.index,
                imageSizes: imageSizes
            }, function () {
                _this2.loadImage(nextProps.index);
                _this2.positionXNumber = -react_native_1.Dimensions.get('window').width * _this2.state.currentShowIndex;
                _this2.standardPositionX = _this2.positionXNumber;
                _this2.positionX.setValue(_this2.positionXNumber);
                react_native_1.Animated.timing(_this2.fadeAnim, {
                    toValue: 1,
                    duration: 200
                }).start();
            });
        }
    }, {
        key: "loadImage",
        value: function loadImage(index) {
            var _this3 = this;

            var image = this.props.imageUrls[index];
            var imageStatus = _extends({}, this.state.imageSizes[index]);
            var saveImageSize = function saveImageSize() {
                var imageSizes = _this3.state.imageSizes.slice();
                imageSizes[index] = imageStatus;
                _this3.setState({
                    imageSizes: imageSizes
                });
            };
            if (this.state.imageSizes[index].status === 'success') {
                return;
            }
            var sizeLoaded = false;
            var imageLoaded = false;
            var prefetchImagePromise = react_native_1.Image.prefetch(image.url);
            prefetchImagePromise.then(function () {
                imageLoaded = true;
                if (sizeLoaded) {
                    imageStatus.status = 'success';
                    saveImageSize();
                }
            }, function () {
                imageStatus.status = 'fail';
                saveImageSize();
            });
            if (image.width && image.height) {
                sizeLoaded = true;
                imageStatus.width = image.width;
                imageStatus.height = image.height;
                if (imageLoaded) {
                    imageStatus.status = 'success';
                    saveImageSize();
                }
            } else {
                react_native_1.Image.getSize(image.url, function (width, height) {
                    sizeLoaded = true;
                    imageStatus.width = width;
                    imageStatus.height = height;
                    if (imageLoaded) {
                        imageStatus.status = 'success';
                        saveImageSize();
                    }
                }, function (error) {
                    imageStatus.status = 'fail';
                    saveImageSize();
                });
            }
        }
    }, {
        key: "handleHorizontalOuterRangeOffset",
        value: function handleHorizontalOuterRangeOffset(offsetX) {
            this.positionXNumber = this.standardPositionX + offsetX;
            this.positionX.setValue(this.positionXNumber);
            if (offsetX < 0) {
                if (this.state.currentShowIndex < this.props.imageUrls.length - 1) {
                    this.loadImage(this.state.currentShowIndex + 1);
                }
            } else if (offsetX > 0) {
                if (this.state.currentShowIndex > 0) {
                    this.loadImage(this.state.currentShowIndex - 1);
                }
            }
        }
    }, {
        key: "handleResponderRelease",
        value: function handleResponderRelease(vx) {
            if (vx > 0.7) {
                this.goBack.call(this);
            } else if (vx < -0.7) {
                this.goNext.call(this);
            }
            if (this.positionXNumber - this.standardPositionX > this.props.flipThreshold) {
                this.goBack.call(this);
            } else if (this.positionXNumber - this.standardPositionX < -this.props.flipThreshold) {
                this.goNext.call(this);
            } else {
                this.resetPosition.call(this);
            }
        }
    }, {
        key: "goBack",
        value: function goBack() {
            if (this.state.currentShowIndex === 0) {
                this.resetPosition.call(this);
                return;
            }
            this.positionXNumber = this.standardPositionX + react_native_1.Dimensions.get('window').width;
            this.standardPositionX = this.positionXNumber;
            react_native_1.Animated.timing(this.positionX, {
                toValue: this.positionXNumber,
                duration: 100
            }).start();
            this.setState({
                currentShowIndex: this.state.currentShowIndex - 1
            });
        }
    }, {
        key: "goNext",
        value: function goNext() {
            if (this.state.currentShowIndex === this.props.imageUrls.length - 1) {
                this.resetPosition.call(this);
                return;
            }
            this.positionXNumber = this.standardPositionX - react_native_1.Dimensions.get('window').width;
            this.standardPositionX = this.positionXNumber;
            react_native_1.Animated.timing(this.positionX, {
                toValue: this.positionXNumber,
                duration: 100
            }).start();
            this.setState({
                currentShowIndex: this.state.currentShowIndex + 1
            });
        }
    }, {
        key: "resetPosition",
        value: function resetPosition() {
            this.positionXNumber = this.standardPositionX;
            react_native_1.Animated.timing(this.positionX, {
                toValue: this.standardPositionX,
                duration: 150
            }).start();
        }
    }, {
        key: "handleLongPress",
        value: function handleLongPress(image) {
            this.setState({
                isShowMenu: true
            });
        }
    }, {
        key: "getContent",
        value: function getContent() {
            var _this4 = this;

            var screenWidth = react_native_1.Dimensions.get('window').width;
            var screenHeight = react_native_1.Dimensions.get('window').height;
            var ImageElements = this.props.imageUrls.map(function (image, index) {
                var width = _this4.state.imageSizes[index] && _this4.state.imageSizes[index].width;
                var height = _this4.state.imageSizes[index] && _this4.state.imageSizes[index].height;
                var imageInfo = _this4.state.imageSizes[index];
                if (width > screenWidth) {
                    var widthPixel = screenWidth / width;
                    width *= widthPixel;
                    height *= widthPixel;
                }
                if (height > screenHeight) {
                    var HeightPixel = screenHeight / height;
                    width *= HeightPixel;
                    height *= HeightPixel;
                }
                if (imageInfo.status === 'success' && _this4.props.enableImageZoom) {
                    return React.createElement(index_3.default, { key: index, style: image_viewer_style_1.default.modalContainer, cropWidth: react_native_1.Dimensions.get('window').width, cropHeight: react_native_1.Dimensions.get('window').height, imageWidth: width, imageHeight: height, maxOverflow: _this4.props.maxOverflow, horizontalOuterRangeOffset: _this4.handleHorizontalOuterRangeOffset.bind(_this4), responderRelease: _this4.handleResponderRelease.bind(_this4), onLongPress: _this4.handleLongPress.bind(_this4, image), onCancel: _this4.props.onCancel }, React.createElement(react_native_1.Image, { style: [image_viewer_style_1.default.imageStyle, { width: width, height: height }], source: { uri: image.url } }));
                } else {
                    switch (imageInfo.status) {
                        case 'loading':
                            return React.createElement(react_native_1.View, { key: index, style: image_viewer_style_1.default.loadingContainer }, _this4.props.loadingRender());
                        case 'success':
                            return React.createElement(react_native_1.Image, { key: index, style: [image_viewer_style_1.default.imageStyle, { width: width, height: height }], source: { uri: image.url } });
                        case 'fail':
                            return React.createElement(react_native_1.TouchableOpacity, { key: index, style: image_viewer_style_1.default.failContainer }, React.createElement(react_native_1.Image, { source: _this4.props.failImageSource, style: image_viewer_style_1.default.failImage }));
                    }
                }
            });
            return React.createElement(react_native_1.Animated.View, { style: [image_viewer_style_1.default.container, { opacity: this.fadeAnim }] }, React.createElement(react_native_1.Animated.View, { style: [image_viewer_style_1.default.moveBox, { transform: [{ translateX: this.positionX }] }] }, ImageElements), this.props.imageUrls.length > 1 && React.createElement(react_native_1.View, { style: image_viewer_style_1.default.count }, React.createElement(react_native_1.Text, { style: image_viewer_style_1.default.countText }, this.state.currentShowIndex + 1, "/", this.props.imageUrls.length)), this.props.imageUrls[this.state.currentShowIndex].originSizeKb && this.props.imageUrls[this.state.currentShowIndex].originUrl && React.createElement(react_native_1.View, { style: image_viewer_style_1.default.watchOrigin }, React.createElement(react_native_1.TouchableOpacity, { style: image_viewer_style_1.default.watchOriginTouchable }, React.createElement(react_native_1.Text, { style: image_viewer_style_1.default.watchOriginText }, "查看原图(2M)"))));
        }
    }, {
        key: "saveToLocal",
        value: function saveToLocal() {
            react_native_1.CameraRoll.saveToCameraRoll(this.props.imageUrls[this.state.currentShowIndex].url);
            this.setState({
                isShowMenu: false
            });
        }
    }, {
        key: "getMenu",
        value: function getMenu() {
            if (!this.state.isShowMenu) {
                return null;
            }
            return React.createElement(react_native_1.View, { style: image_viewer_style_1.default.menuContainer }, React.createElement(react_native_1.View, { style: image_viewer_style_1.default.menuShadow }), React.createElement(react_native_1.View, { style: image_viewer_style_1.default.menuContent }, React.createElement(react_native_1.TouchableHighlight, { underlayColor: "#F2F2F2", onPress: this.saveToLocal.bind(this), style: image_viewer_style_1.default.operateContainer }, React.createElement(react_native_1.Text, { style: image_viewer_style_1.default.operateText }, "保存到相册")), React.createElement(react_native_1.TouchableHighlight, { underlayColor: "#F2F2F2", onPress: this.handleLeaveMenu.bind(this), style: image_viewer_style_1.default.operateContainer }, React.createElement(react_native_1.Text, { style: image_viewer_style_1.default.operateText }, "取消"))));
        }
    }, {
        key: "handleLeaveMenu",
        value: function handleLeaveMenu() {
            this.setState({
                isShowMenu: false
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (!this.props.visible) {
                return null;
            }
            return React.createElement(react_native_1.View, __assign({}, this.props.others), this.getContent(), this.getMenu());
        }
    }]);

    return ImageViewer;
}(React.Component);
ImageViewer.defaultProps = new typings.Props();
ImageViewer = __decorate([index_2.TransmitTransparently(), index_1.autoBindClass], ImageViewer);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImageViewer;