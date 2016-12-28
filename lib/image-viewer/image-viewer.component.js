"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof3.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require("react");
var react_native_1 = require("react-native");
var typings = require("./image-viewer.type");
var index_1 = require('nt-auto-bind');
var index_2 = require('nt-transmit-transparently');
var index_3 = require('react-native-image-pan-zoom');
var image_viewer_style_1 = require("./image-viewer.style");
var ImageViewer = function (_React$Component) {
    (0, _inherits3.default)(ImageViewer, _React$Component);

    function ImageViewer() {
        (0, _classCallCheck3.default)(this, ImageViewer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ImageViewer.__proto__ || Object.getPrototypeOf(ImageViewer)).apply(this, arguments));

        _this.state = new typings.State();
        _this.fadeAnim = new react_native_1.Animated.Value(0);
        _this.standardPositionX = 0;
        _this.positionXNumber = 0;
        _this.positionX = new react_native_1.Animated.Value(0);
        _this.width = 0;
        _this.height = 0;
        _this.styles = image_viewer_style_1.default(0, 0);
        _this.hasLayout = false;
        _this.loadedIndex = new Map();
        return _this;
    }

    (0, _createClass3.default)(ImageViewer, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.init(this.props);
        }
    }, {
        key: "init",
        value: function init(nextProps) {
            var _this2 = this;

            if (nextProps.imageUrls.length === 0) {
                this.fadeAnim.setValue(0);
                return this.setState(new typings.State());
            }
            var imageSizes = [];
            nextProps.imageUrls.forEach(function (imageUrl) {
                imageSizes.push({
                    width: imageUrl.width || 0,
                    height: imageUrl.height || 0,
                    status: 'loading'
                });
            });
            this.setState({
                currentShowIndex: nextProps.index,
                imageSizes: imageSizes
            }, function () {
                _this2.loadImage(nextProps.index);
                _this2.jumpToCurrentImage();
                react_native_1.Animated.timing(_this2.fadeAnim, {
                    toValue: 1,
                    duration: 200
                }).start();
            });
        }
    }, {
        key: "jumpToCurrentImage",
        value: function jumpToCurrentImage() {
            this.positionXNumber = -this.width * this.state.currentShowIndex;
            this.standardPositionX = this.positionXNumber;
            this.positionX.setValue(this.positionXNumber);
        }
    }, {
        key: "loadImage",
        value: function loadImage(index) {
            var _this3 = this;

            if (this.loadedIndex.has(index)) {
                return;
            }
            this.loadedIndex.set(index, true);
            var image = this.props.imageUrls[index];
            var imageStatus = (0, _extends3.default)({}, this.state.imageSizes[index]);
            var saveImageSize = function saveImageSize() {
                if (_this3.state.imageSizes[index] && _this3.state.imageSizes[index].status !== 'loading') {
                    return;
                }
                var imageSizes = _this3.state.imageSizes.slice();
                imageSizes[index] = imageStatus;
                _this3.setState({
                    imageSizes: imageSizes
                });
            };
            if (this.state.imageSizes[index].status === 'success') {
                return;
            }
            if (this.state.imageSizes[index].width > 0 && this.state.imageSizes[index].height > 0) {
                imageStatus.status = 'success';
                saveImageSize();
                return;
            }
            var sizeLoaded = false;
            var imageLoaded = false;
            if (react_native_1.Platform.OS !== 'web') {
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
            } else {
                (function () {
                    var imageFetch = new window.Image();
                    imageFetch.src = image.url;
                    imageFetch.onload = function () {
                        imageStatus.width = imageFetch.width;
                        imageStatus.height = imageFetch.height;
                        imageStatus.status = 'success';
                        saveImageSize();
                    };
                    imageFetch.onerror = function () {
                        imageStatus.status = 'fail';
                        saveImageSize();
                    };
                })();
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
                if (this.state.currentShowIndex > 0) {
                    this.loadImage(this.state.currentShowIndex - 1);
                }
            } else if (vx < -0.7) {
                this.goNext.call(this);
                if (this.state.currentShowIndex < this.props.imageUrls.length - 1) {
                    this.loadImage(this.state.currentShowIndex + 1);
                }
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
            var _this4 = this;

            console.log(111);
            if (this.state.currentShowIndex === 0) {
                this.resetPosition.call(this);
                return;
            }
            this.positionXNumber = this.standardPositionX + this.width;
            this.standardPositionX = this.positionXNumber;
            react_native_1.Animated.timing(this.positionX, {
                toValue: this.positionXNumber,
                duration: 100
            }).start();
            this.setState({
                currentShowIndex: this.state.currentShowIndex - 1
            }, function () {
                _this4.props.onChange(_this4.state.currentShowIndex);
            });
        }
    }, {
        key: "goNext",
        value: function goNext() {
            var _this5 = this;

            if (this.state.currentShowIndex === this.props.imageUrls.length - 1) {
                this.resetPosition.call(this);
                return;
            }
            this.positionXNumber = this.standardPositionX - this.width;
            this.standardPositionX = this.positionXNumber;
            react_native_1.Animated.timing(this.positionX, {
                toValue: this.positionXNumber,
                duration: 100
            }).start();
            this.setState({
                currentShowIndex: this.state.currentShowIndex + 1
            }, function () {
                _this5.props.onChange(_this5.state.currentShowIndex);
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
            if (this.props.saveToLocalByLongPress) {
                this.setState({
                    isShowMenu: true
                });
            }
        }
    }, {
        key: "handleClick",
        value: function handleClick() {
            this.props.onClick(this.handleCancel.bind(this));
        }
    }, {
        key: "handleDoubleClick",
        value: function handleDoubleClick() {
            this.props.onDoubleClick(this.handleCancel.bind(this));
        }
    }, {
        key: "handleCancel",
        value: function handleCancel() {
            this.hasLayout = false;
            this.props.onCancel();
        }
    }, {
        key: "handleLayout",
        value: function handleLayout(event) {
            if (this.hasLayout) {
                return;
            }
            this.hasLayout = true;
            this.width = event.nativeEvent.layout.width;
            this.height = event.nativeEvent.layout.height;
            this.styles = image_viewer_style_1.default(this.width, this.height);
            this.forceUpdate();
            this.jumpToCurrentImage();
        }
    }, {
        key: "getContent",
        value: function getContent() {
            var _this6 = this;

            var screenWidth = this.width;
            var screenHeight = this.height;
            var ImageElements = this.props.imageUrls.map(function (image, index) {
                var width = _this6.state.imageSizes[index] && _this6.state.imageSizes[index].width;
                var height = _this6.state.imageSizes[index] && _this6.state.imageSizes[index].height;
                var imageInfo = _this6.state.imageSizes[index];
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
                if (imageInfo.status === 'success' && _this6.props.enableImageZoom) {
                    return React.createElement(index_3.default, { key: index, style: _this6.styles.modalContainer, cropWidth: _this6.width, cropHeight: _this6.height, imageWidth: width, imageHeight: height, maxOverflow: _this6.props.maxOverflow, horizontalOuterRangeOffset: _this6.handleHorizontalOuterRangeOffset.bind(_this6), responderRelease: _this6.handleResponderRelease.bind(_this6), onLongPress: _this6.handleLongPress.bind(_this6, image), onClick: _this6.handleClick, onDoubleClick: _this6.handleDoubleClick }, React.createElement(react_native_1.Image, { style: [_this6.styles.imageStyle, { width: width, height: height }], source: { uri: image.url } }));
                } else {
                    switch (imageInfo.status) {
                        case 'loading':
                            return React.createElement(react_native_1.TouchableHighlight, { key: index, onPress: _this6.handleClick, style: _this6.styles.loadingTouchable }, React.createElement(react_native_1.View, { style: _this6.styles.loadingContainer }, _this6.props.loadingRender()));
                        case 'success':
                            return React.createElement(react_native_1.Image, { key: index, style: [_this6.styles.imageStyle, { width: width, height: height }], source: { uri: image.url } });
                        case 'fail':
                            return React.createElement(index_3.default, { key: index, style: _this6.styles.modalContainer, cropWidth: _this6.width, cropHeight: _this6.height, imageWidth: width, imageHeight: height, maxOverflow: _this6.props.maxOverflow, horizontalOuterRangeOffset: _this6.handleHorizontalOuterRangeOffset.bind(_this6), responderRelease: _this6.handleResponderRelease.bind(_this6), onLongPress: _this6.handleLongPress.bind(_this6, image), onClick: _this6.handleClick, onDoubleClick: _this6.handleDoubleClick }, React.createElement(react_native_1.TouchableOpacity, { key: index, style: _this6.styles.failContainer }, React.createElement(react_native_1.Image, { source: _this6.props.failImageSource, style: _this6.styles.failImage })));
                    }
                }
            });
            return React.createElement(react_native_1.Animated.View, { style: [this.styles.container, { opacity: this.fadeAnim }] }, this.props.renderHeader(), React.createElement(react_native_1.View, { style: this.styles.arrowLeftContainer }, React.createElement(react_native_1.TouchableWithoutFeedback, { onPress: this.goBack }, React.createElement(react_native_1.View, null, this.props.renderArrowLeft()))), React.createElement(react_native_1.View, { style: this.styles.arrowRightContainer }, React.createElement(react_native_1.TouchableWithoutFeedback, { onPress: this.goNext }, React.createElement(react_native_1.View, null, this.props.renderArrowRight()))), React.createElement(react_native_1.Animated.View, { style: [this.styles.moveBox, { transform: [{ translateX: this.positionX }] }, { width: this.width * this.props.imageUrls.length }] }, ImageElements), this.props.imageUrls.length > 1 && this.props.renderIndicator(this.state.currentShowIndex + 1, this.props.imageUrls.length), this.props.imageUrls[this.state.currentShowIndex].originSizeKb && this.props.imageUrls[this.state.currentShowIndex].originUrl && React.createElement(react_native_1.View, { style: this.styles.watchOrigin }, React.createElement(react_native_1.TouchableOpacity, { style: this.styles.watchOriginTouchable }, React.createElement(react_native_1.Text, { style: this.styles.watchOriginText }, "查看原图(2M)"))), this.props.renderFooter());
        }
    }, {
        key: "saveToLocal",
        value: function saveToLocal() {
            if (!this.props.onSave) {
                react_native_1.CameraRoll.saveToCameraRoll(this.props.imageUrls[this.state.currentShowIndex].url);
                this.props.onSaveToCamera(this.state.currentShowIndex);
            } else {
                this.props.onSave(this.props.imageUrls[this.state.currentShowIndex].url);
            }
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
            return React.createElement(react_native_1.View, { style: this.styles.menuContainer }, React.createElement(react_native_1.View, { style: this.styles.menuShadow }), React.createElement(react_native_1.View, { style: this.styles.menuContent }, React.createElement(react_native_1.TouchableHighlight, { underlayColor: "#F2F2F2", onPress: this.saveToLocal.bind(this), style: this.styles.operateContainer }, React.createElement(react_native_1.Text, { style: this.styles.operateText }, "保存到相册")), React.createElement(react_native_1.TouchableHighlight, { underlayColor: "#F2F2F2", onPress: this.handleLeaveMenu.bind(this), style: this.styles.operateContainer }, React.createElement(react_native_1.Text, { style: this.styles.operateText }, "取消"))));
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
            var childs = null;
            childs = React.createElement(react_native_1.View, null, this.getContent(), this.getMenu());
            return React.createElement(react_native_1.View, __assign({ onLayout: this.handleLayout, style: [{ flex: 1, overflow: 'hidden' }, this.props.style] }, this.props.others), childs);
        }
    }]);
    return ImageViewer;
}(React.Component);
ImageViewer.defaultProps = new typings.Props();
ImageViewer = __decorate([index_2.TransmitTransparently('style'), index_1.autoBindClass], ImageViewer);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImageViewer;