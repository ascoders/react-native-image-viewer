import * as React from 'react'
import {
    TouchableOpacity,
    View,
    Text,
    Image,
    Animated,
    TouchableHighlight,
    TouchableWithoutFeedback,
    CameraRoll,
    Dimensions,
    Platform
} from 'react-native'
import * as typings from './image-viewer.type'
import { TransmitTransparently } from 'nt-transmit-transparently'
import ImageZoom from 'react-native-image-pan-zoom'
import styles from './image-viewer.style'

interface Window {
    Image: {
        prototype: HTMLImageElement
        new (): HTMLImageElement
    }
}
declare var window: Window

@TransmitTransparently('style')
export default class ImageViewer extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 背景透明度渐变动画
    private fadeAnim = new Animated.Value(0)

    // 当前基准位置
    private standardPositionX = 0

    // 整体位移，用来切换图片用
    private positionXNumber = 0
    private positionX = new Animated.Value(0)

    private width = 0
    private height = 0

    private styles = styles(0, 0)

    // 是否执行过 layout. fix 安卓不断触发 onLayout 的 bug
    private hasLayout = false

    // 记录已加载的图片 index
    private loadedIndex = new Map<number, boolean>()

    componentWillMount() {
        this.init(this.props)
    }

    /**
     * props 有变化时执行
     */
    init(nextProps: typings.PropsDefine) {
        if (nextProps.imageUrls.length === 0) {
            // 隐藏时候清空
            this.fadeAnim.setValue(0)
            return this.setState(new typings.State())
        }

        // 给 imageSizes 塞入空数组
        const imageSizes: Array<typings.ImageSize> = []
        nextProps.imageUrls.forEach(imageUrl => {
            imageSizes.push({
                width: imageUrl.width || 0,
                height: imageUrl.height || 0,
                status: 'loading'
            })
        })

        this.setState({
            currentShowIndex: nextProps.index,
            imageSizes
        }, () => {
            // 立刻预加载要看的图
            this.loadImage(nextProps.index)

            this.jumpToCurrentImage()

            // 显示动画
            Animated.timing(this.fadeAnim, {
                toValue: 1,
                duration: 200
            }).start()
        })
    }

    /**
     * 调到当前看图位置
     */
    jumpToCurrentImage() {
        // 跳到当前图的位置
        this.positionXNumber = -this.width * this.state.currentShowIndex
        this.standardPositionX = this.positionXNumber
        this.positionX.setValue(this.positionXNumber)
    }

    /**
     * 加载图片
     */
    loadImage(index: number) {
        if (this.loadedIndex.has(index)) {
            return
        }
        this.loadedIndex.set(index, true)

        const image = this.props.imageUrls[index]
        const imageStatus = Object.assign({}, this.state.imageSizes[index])

        // 保存 imageSize
        const saveImageSize = () => {
            // 如果已经 success 了，就不做处理
            if (this.state.imageSizes[index] && this.state.imageSizes[index].status !== 'loading') {
                return
            }

            const imageSizes = this.state.imageSizes.slice()
            imageSizes[index] = imageStatus
            this.setState({
                imageSizes
            })
        }

        if (this.state.imageSizes[index].status === 'success') {
            // 已经加载过就不会加载了
            return
        }

        // 如果已经有宽高了，直接设置为 success
        if (this.state.imageSizes[index].width > 0 && this.state.imageSizes[index].height > 0) {
            imageStatus.status = 'success'
            saveImageSize()
            return
        }

        // 是否加载完毕了图片大小
        let sizeLoaded = false
        // 是否加载完毕了图片
        let imageLoaded = false

        if (Platform.OS !== 'web' as any) {
            const prefetchImagePromise = Image.prefetch(image.url)

            // 图片加载完毕回调
            prefetchImagePromise.then(() => {
                imageLoaded = true
                if (sizeLoaded) {
                    imageStatus.status = 'success'
                    saveImageSize()
                }
            }, () => {
                // 预加载失败
                imageStatus.status = 'fail'
                saveImageSize()
            })

            // 获取图片大小
            if (image.width && image.height) {
                // 如果已经传了图片长宽,那直接 success
                sizeLoaded = true
                imageStatus.width = image.width
                imageStatus.height = image.height

                if (imageLoaded) {
                    imageStatus.status = 'success'
                    saveImageSize()
                }
            } else {
                Image.getSize(image.url, (width, height) => {
                    sizeLoaded = true
                    imageStatus.width = width
                    imageStatus.height = height

                    if (imageLoaded) {
                        imageStatus.status = 'success'
                        saveImageSize()
                    }
                }, (error) => {
                    // 获取大小失败
                    imageStatus.status = 'fail'
                    saveImageSize()
                })
            }
        } else {
            const imageFetch = new window.Image()
            imageFetch.src = image.url
            imageFetch.onload = () => {
                imageStatus.width = imageFetch.width
                imageStatus.height = imageFetch.height
                imageStatus.status = 'success'
                saveImageSize()
            }
            imageFetch.onerror = () => {
                imageStatus.status = 'fail'
                saveImageSize()
            }
        }
    }

    /**
     * 触发溢出水平滚动
     */
    handleHorizontalOuterRangeOffset(offsetX: number) {
        this.positionXNumber = this.standardPositionX + offsetX
        this.positionX.setValue(this.positionXNumber)

        if (offsetX < 0) {
            if (this.state.currentShowIndex < this.props.imageUrls.length - 1) {
                this.loadImage(this.state.currentShowIndex + 1)
            }
        } else if (offsetX > 0) {
            if (this.state.currentShowIndex > 0) {
                this.loadImage(this.state.currentShowIndex - 1)
            }
        }
    }

    /**
     * 手势结束，但是没有取消浏览大图
     */
    handleResponderRelease(vx: number) {
        if (vx > 0.7) {
            // 上一张
            this.goBack.call(this)

            // 这里可能没有触发溢出滚动，为了防止图片不被加载，调用加载图片
            if (this.state.currentShowIndex > 0) {
                this.loadImage(this.state.currentShowIndex - 1)
            }
        } else if (vx < -0.7) {
            // 下一张
            this.goNext.call(this)
            if (this.state.currentShowIndex < this.props.imageUrls.length - 1) {
                this.loadImage(this.state.currentShowIndex + 1)
            }
        }

        if (this.positionXNumber - this.standardPositionX > this.props.flipThreshold) {
            // 上一张
            this.goBack.call(this)
        } else if (this.positionXNumber - this.standardPositionX < -this.props.flipThreshold) {
            // 下一张
            this.goNext.call(this)
        } else {
            // 回到之前的位置
            this.resetPosition.call(this)
        }
    }

    /**
     * 到上一张
     */
    goBack() {
        if (this.state.currentShowIndex === 0) {
            // 回到之前的位置
            this.resetPosition.call(this)
            return
        }

        this.positionXNumber = this.standardPositionX + this.width
        this.standardPositionX = this.positionXNumber
        Animated.timing(this.positionX, {
            toValue: this.positionXNumber,
            duration: 100,
        }).start()

        this.setState({
            currentShowIndex: this.state.currentShowIndex - 1
        }, () => {
            this.props.onChange(this.state.currentShowIndex)
        })
    }

    /**
     * 到下一张
     */
    goNext() {
        if (this.state.currentShowIndex === this.props.imageUrls.length - 1) {
            // 回到之前的位置
            this.resetPosition.call(this)
            return
        }

        this.positionXNumber = this.standardPositionX - this.width
        this.standardPositionX = this.positionXNumber
        Animated.timing(this.positionX, {
            toValue: this.positionXNumber,
            duration: 100,
        }).start()

        this.setState({
            currentShowIndex: this.state.currentShowIndex + 1
        }, () => {
            this.props.onChange(this.state.currentShowIndex)
        })
    }

    /**
     * 回到原位
     */
    resetPosition() {
        this.positionXNumber = this.standardPositionX
        Animated.timing(this.positionX, {
            toValue: this.standardPositionX,
            duration: 150,
        }).start()
    }

    /**
     * 长按
     */
    handleLongPress(image: typings.ImageInfo) {
        if (this.props.saveToLocalByLongPress) {
            // 出现保存到本地的操作框
            this.setState({
                isShowMenu: true
            })
        }
    }

    /**
     * 单击
     */
    handleClick() {
        this.props.onClick(this.handleCancel.bind(this))
    }

    /**
     * 双击
     */
    handleDoubleClick() {
        this.props.onDoubleClick(this.handleCancel.bind(this))
    }

    /**
     * 退出
     */
    handleCancel() {
        this.hasLayout = false
        this.props.onCancel()
    }

    /**
     * 完成布局
     */
    handleLayout(event: any) {
        if (this.hasLayout) {
            return
        }

        this.hasLayout = true

        this.width = event.nativeEvent.layout.width
        this.height = event.nativeEvent.layout.height
        this.styles = styles(this.width, this.height)

        // 强制刷新
        this.forceUpdate()
        this.jumpToCurrentImage()
    }

    /**
     * 获得整体内容
     */
    getContent() {
        // 获得屏幕宽高
        const screenWidth = this.width
        const screenHeight = this.height

        const ImageElements = this.props.imageUrls.map((image, index) => {
            let width = this.state.imageSizes[index] && this.state.imageSizes[index].width
            let height = this.state.imageSizes[index] && this.state.imageSizes[index].height
            const imageInfo = this.state.imageSizes[index]

            // 如果宽大于屏幕宽度,整体缩放到宽度是屏幕宽度
            if (width > screenWidth) {
                const widthPixel = screenWidth / width
                width *= widthPixel
                height *= widthPixel
            }

            // 如果此时高度还大于屏幕高度,整体缩放到高度是屏幕高度
            if (height > screenHeight) {
                const HeightPixel = screenHeight / height
                width *= HeightPixel
                height *= HeightPixel
            }

            if (imageInfo.status === 'success' && this.props.enableImageZoom) {
                return (
                    <ImageZoom key={index}
                        style={this.styles.modalContainer}
                        cropWidth={this.width}
                        cropHeight={this.height}
                        imageWidth={width}
                        imageHeight={height}
                        maxOverflow={this.props.maxOverflow}
                        horizontalOuterRangeOffset={this.handleHorizontalOuterRangeOffset.bind(this)}
                        responderRelease={this.handleResponderRelease.bind(this)}
                        onLongPress={this.handleLongPress.bind(this, image)}
                        onClick={this.handleClick.bind(this)}
                        onDoubleClick={this.handleDoubleClick.bind(this)}>
                        <Image style={[this.styles.imageStyle, { width: width, height: height }]}
                            source={{ uri: image.url }} />
                    </ImageZoom>
                )
            } else {
                switch (imageInfo.status) {
                    case 'loading':
                        return (
                            <TouchableHighlight key={index}
                                onPress={this.handleClick.bind(this)}
                                style={this.styles.loadingTouchable}>
                                <View style={this.styles.loadingContainer}>
                                    {this.props.loadingRender()}
                                </View>
                            </TouchableHighlight>
                        )
                    case 'success':
                        return (
                            <Image key={index}
                                style={[this.styles.imageStyle, { width: width, height: height }]}
                                source={{ uri: image.url }} />
                        )
                    case 'fail':
                        return (
                            <ImageZoom key={index}
                                style={this.styles.modalContainer}
                                cropWidth={this.width}
                                cropHeight={this.height}
                                imageWidth={width}
                                imageHeight={height}
                                maxOverflow={this.props.maxOverflow}
                                horizontalOuterRangeOffset={this.handleHorizontalOuterRangeOffset.bind(this)}
                                responderRelease={this.handleResponderRelease.bind(this)}
                                onLongPress={this.handleLongPress.bind(this, image)}
                                onClick={this.handleClick.bind(this)}
                                onDoubleClick={this.handleDoubleClick.bind(this)}>
                                <TouchableOpacity key={index}
                                    style={this.styles.failContainer}>
                                    <Image source={this.props.failImageSource}
                                        style={this.styles.failImage} />
                                </TouchableOpacity>
                            </ImageZoom>
                        )
                }
            }
        })

        return (
            <Animated.View style={[this.styles.container, { opacity: this.fadeAnim }]}>
                {this.props.renderHeader()}

                <View style={this.styles.arrowLeftContainer}>
                    <TouchableWithoutFeedback onPress={this.goBack.bind(this)}>
                        <View>
                            {this.props.renderArrowLeft()}
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={this.styles.arrowRightContainer}>
                    <TouchableWithoutFeedback onPress={this.goNext.bind(this)}>
                        <View>
                            {this.props.renderArrowRight()}
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <Animated.View style={[this.styles.moveBox, { transform: [{ translateX: this.positionX }] }, { width: this.width * this.props.imageUrls.length }]}>
                    {ImageElements}
                </Animated.View>

                {this.props.imageUrls.length > 1 &&
                    this.props.renderIndicator(this.state.currentShowIndex + 1, this.props.imageUrls.length)
                }

                {this.props.imageUrls[this.state.currentShowIndex].originSizeKb && this.props.imageUrls[this.state.currentShowIndex].originUrl &&
                    <View style={this.styles.watchOrigin}>
                        <TouchableOpacity style={this.styles.watchOriginTouchable}>
                            <Text style={this.styles.watchOriginText}>查看原图(2M)</Text>
                        </TouchableOpacity>
                    </View>
                }

                {this.props.renderFooter()}
            </Animated.View>
        )
    }

    /**
     * 保存当前图片到本地相册
     */
    saveToLocal() {
        if (!this.props.onSave) {
            CameraRoll.saveToCameraRoll(this.props.imageUrls[this.state.currentShowIndex].url)
            this.props.onSaveToCamera(this.state.currentShowIndex)
        } else {
            this.props.onSave(this.props.imageUrls[this.state.currentShowIndex].url)
        }

        this.setState({
            isShowMenu: false
        })
    }

    getMenu() {
        if (!this.state.isShowMenu) {
            return null
        }

        return (
            <View style={this.styles.menuContainer}>
                <View style={this.styles.menuShadow} />
                <View style={this.styles.menuContent}>
                    <TouchableHighlight underlayColor="#F2F2F2"
                        onPress={this.saveToLocal.bind(this)}
                        style={this.styles.operateContainer}>
                        <Text style={this.styles.operateText}>{this.props.menuContext.saveToLocal}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="#F2F2F2"
                        onPress={this.handleLeaveMenu.bind(this)}
                        style={this.styles.operateContainer}>
                        <Text style={this.styles.operateText}>{this.props.menuContext.cancel}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }

    handleLeaveMenu() {
        this.setState({
            isShowMenu: false
        })
    }

    render() {
        let childs: React.ReactElement<any> = null

        childs = (
            <View>
                {this.getContent()}
                {this.getMenu()}
            </View>
        )

        return (
            <View onLayout={this.handleLayout.bind(this)}
                style={[{ flex: 1, overflow: 'hidden' }, this.props.style]} {...this.props.others}>
                {childs}
            </View>
        )
    }
}
