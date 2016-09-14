/**
 * 由于 react-native 不能动态在根元素创建节点,因此我需要一个节点!!
 */
import * as React from 'react'
import {TouchableOpacity, View, Text, Image, Animated, TouchableHighlight, CameraRoll, Dimensions} from 'react-native'
import * as typings from './image-viewer.type'
import {autoBindClass} from '../../auto-bind/index'
import {TransmitTransparently} from '../../transmit-transparently/index'
import ImageZoom from '../../image-zoom/index'
import styles from './image-viewer.style'

@TransmitTransparently()
@autoBindClass
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

    componentWillMount() {
        // 图片数组为空,不显示
        if (!this.props.visible || this.props.imageUrls.length === 0) {
            return
        }

        // 给 imageSizes 塞入空数组
        const imageSizes: Array<typings.ImageSize> = []
        this.props.imageUrls.forEach(imageUrl=> {
            imageSizes.push({
                width: 0,
                height: 0,
                status: 'loading'
            })
        })

        this.setState({
            currentShowIndex: this.props.index,
            imageSizes
        }, ()=> {
            this.fadeAnim = new Animated.Value(0)

            // 立刻预加载要看的图
            this.loadImage(this.state.currentShowIndex)

            // 跳到当前图的位置
            this.positionXNumber = -Dimensions.get('window').width * this.state.currentShowIndex
            this.standardPositionX = this.positionXNumber
            this.positionX.setValue(this.positionXNumber)

            // 显示动画
            Animated.timing(this.fadeAnim, {
                toValue: 1,
                duration: 200
            }).start()
        })
    }

    /**
     * 加载图片
     */
    loadImage(index: number) {
        const image = this.props.imageUrls[index]
        const imageStatus = this.state.imageSizes[index]

        // 保存 imageSize
        const saveImageSize = ()=> {
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

        // 是否加载完毕了图片大小
        let sizeLoaded = false
        // 是否加载完毕了图片
        let imageLoaded = false

        const prefetchImagePromise = Image.prefetch(image.url)

        // 图片加载完毕回调
        prefetchImagePromise.then(()=> {
            imageLoaded = true
            if (sizeLoaded && imageStatus.status === 'loading') {
                imageStatus.status = 'success'
                saveImageSize()
            }
        }, ()=> {
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

            if (imageLoaded && !this.state.imageLoaded) {
                imageStatus.status = 'success'
                saveImageSize()
            }
        } else {
            Image.getSize(image.url, (width, height)=> {
                sizeLoaded = true
                imageStatus.width = width
                imageStatus.height = height

                if (imageLoaded && !this.state.imageLoaded) {
                    saveImageSize()
                }
            }, (error)=> {
                // 获取大小失败
                imageStatus.status = 'fail'
                saveImageSize()
            })
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
        } else if (vx < -0.7) {
            // 下一张
            this.goNext.call(this)
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

        this.positionXNumber = this.standardPositionX + Dimensions.get('window').width
        this.standardPositionX = this.positionXNumber
        Animated.timing(this.positionX, {
            toValue: this.positionXNumber,
            duration: 100,
        }).start()

        this.setState({
            currentShowIndex: this.state.currentShowIndex - 1
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

        this.positionXNumber = this.standardPositionX - Dimensions.get('window').width
        this.standardPositionX = this.positionXNumber
        Animated.timing(this.positionX, {
            toValue: this.positionXNumber,
            duration: 100,
        }).start()

        this.setState({
            currentShowIndex: this.state.currentShowIndex + 1
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
     * 在图片上长按
     */
    handleLongPress(image: typings.ImageInfo) {
        // 出现操作框
        this.setState({
            isShowMenu: true
        })
    }

    /**
     * 获得整体内容
     */
    getContent() {
        // 获得屏幕宽高
        const screenWidth = Dimensions.get('window').width
        const screenHeight = Dimensions.get('window').height

        const ImageElements = this.props.imageUrls.map((image, index)=> {
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
                               style={styles.modalContainer}
                               cropWidth={Dimensions.get('window').width}
                               cropHeight={Dimensions.get('window').height}
                               imageWidth={width}
                               imageHeight={height}
                               maxOverflow={this.props.maxOverflow}
                               horizontalOuterRangeOffset={this.handleHorizontalOuterRangeOffset.bind(this)}
                               responderRelease={this.handleResponderRelease.bind(this)}
                               onLongPress={this.handleLongPress.bind(this, image)}
                               onCancle={this.props.onCancle}>
                        <Image style={[styles.imageStyle, {width:width, height:height}]}
                               source={{uri:image.url}}/>
                    </ImageZoom>
                )
            } else {
                switch (imageInfo.status) {
                    case 'loading':
                        return (
                            <View key={index}
                                  style={styles.loadingContainer}>
                                {this.props.loadingRender()}
                            </View>
                        )
                    case 'success':
                        return (
                            <Image key={index}
                                   style={[styles.imageStyle, {width:width, height:height}]}
                                   source={{uri:image.url}}/>
                        )
                    case 'fail':
                        return (
                            <TouchableOpacity key={index}
                                              style={styles.failContainer}>
                                <Image source={this.props.failImageSource}
                                       style={styles.failImage}/>
                            </TouchableOpacity>
                        )
                }
            }
        })

        return (
            <Animated.View style={[styles.container, {opacity: this.fadeAnim}]}>

                <Animated.View style={[styles.moveBox, {transform:[{translateX:this.positionX}]}]}>
                    {ImageElements}
                </Animated.View>

                {this.props.imageUrls.length > 1 &&
                <View style={styles.count}>
                    <Text style={styles.countText}>{this.state.currentShowIndex + 1}/{this.props.imageUrls.length}</Text>
                </View>
                }

                {this.props.imageUrls[this.state.currentShowIndex].originSizeKb && this.props.imageUrls[this.state.currentShowIndex].originUrl &&
                <View style={styles.watchOrigin}>
                    <TouchableOpacity style={styles.watchOriginTouchable}>
                        <Text style={styles.watchOriginText}>查看原图(2M)</Text>
                    </TouchableOpacity>
                </View>
                }

            </Animated.View>
        )
    }

    /**
     * 保存当前图片到本地相册
     */
    saveToLocal() {
        CameraRoll.saveImageWithTag(this.props.imageUrls[this.state.currentShowIndex].url)
        this.setState({
            isShowMenu: false
        })
    }

    getMenu() {
        if (!this.state.isShowMenu) {
            return null
        }

        return (
            <View style={styles.menuContainer}>
                <View style={styles.menuShadow}/>
                <View style={styles.menuContent}>
                    <TouchableHighlight underlayColor="#F2F2F2"
                                        onPress={this.saveToLocal.bind(this)}
                                        style={styles.operateContainer}>
                        <Text style={styles.operateText}>保存到相册</Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="#F2F2F2"
                                        onPress={this.handleLeaveMenu.bind(this)}
                                        style={styles.operateContainer}>
                        <Text style={styles.operateText}>取消</Text>
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
        const Menu = this.getMenu()

        return (
            <View {...this.props.others}>
                {this.props.visible && this.getContent()}
                {Menu}
            </View>
        )
    }
}
