import * as React from "react"
import {
  Animated,
  CameraRoll,
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  PanResponder
} from "react-native"
import ImageZoom from "react-native-image-pan-zoom"
import styles from "./image-viewer.style"
import { IImageInfo, IImageSize, Props, State } from "./image-viewer.type"

export default class ImageViewer extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  // 背景透明度渐变动画
  private fadeAnim = new Animated.Value(0)

  // 当前基准位置
  private standardPositionX = 0

  // 整体位移，用来切换图片用
  private positionXNumber = 0
  private positionX = new Animated.Value(0)

  private positionY = new Animated.ValueXY()

  private width = 0
  private height = 0

  private styles = styles(0, 0, "transparent")

  // 是否执行过 layout. fix 安卓不断触发 onLayout 的 bug
  private hasLayout = false

  // 记录已加载的图片 index
  private loadedIndex = new Map<number, boolean>()

  private handleLongPressWithIndex = new Map<number, any>()

  public componentWillMount() {
    this.init(this.props)
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.index !== this.state.currentShowIndex) {
      this.setState(
        {
          currentShowIndex: nextProps.index
        },
        () => {
          // 立刻预加载要看的图
          this.loadImage(nextProps.index || 0)

          this.jumpToCurrentImage()

          // 显示动画
          Animated.timing(this.fadeAnim, {
            toValue: 1,
            duration: 200
          }).start()
        }
      )
    }
  }

  /**
   * props 有变化时执行
   */
  public init(nextProps: Props) {
    if (nextProps.imageUrls.length === 0) {
      // 隐藏时候清空
      this.fadeAnim.setValue(0)
      return this.setState(new State())
    }

    // 给 imageSizes 塞入空数组
    const imageSizes: IImageSize[] = []
    nextProps.imageUrls.forEach(imageUrl => {
      imageSizes.push({
        width: imageUrl.width || 0,
        height: imageUrl.height || 0,
        status: "loading"
      })
    })
    // handle user swiping down
    const panResponderY = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        if (this.props.disableSwipeDown) {
          return;
        }

        this.positionY.setValue({ x: 0, y: gesture.dy })
      },
      onPanResponderRelease: (event) => {
        if (this.props.disableSwipeDown) {
          return;
        }

        const y = event.nativeEvent.pageY;
        const swipeDownThreshold = 230 || this.props.swipeDownThreshold;

        if (y <= swipeDownThreshold) {
          // reset back to 0
          Animated.timing(
            this.positionY.y,
            {
              toValue: 0,
            }
          ).start();
        }

        if (y > swipeDownThreshold) {
          // fire swipe down function
          return this.props.onSwipeDown ? this.props.onSwipeDown() : null
        }
      }
    })


    this.setState(
      {
        currentShowIndex: nextProps.index,
        imageSizes,
        panResponderY,
      },
      () => {
        // 立刻预加载要看的图
        this.loadImage(nextProps.index || 0)

        this.jumpToCurrentImage()

        // 显示动画
        Animated.timing(this.fadeAnim, {
          toValue: 1,
          duration: 200
        }).start()
      }
    )
  }

  /**
   * 调到当前看图位置
   */
  public jumpToCurrentImage() {
    // 跳到当前图的位置
    this.positionXNumber = -this.width * (this.state.currentShowIndex || 0)
    this.standardPositionX = this.positionXNumber
    this.positionX.setValue(this.positionXNumber)
  }

  /**
   * 加载图片
   */
  public loadImage(index: number) {
    if (!this!.state!.imageSizes![index]) {
      return
    }

    if (this.loadedIndex.has(index)) {
      return
    }
    this.loadedIndex.set(index, true)

    const image = this.props.imageUrls[index]
    const imageStatus = { ...this!.state!.imageSizes![index] }

    // 保存 imageSize
    const saveImageSize = () => {
      // 如果已经 success 了，就不做处理
      if (
        this!.state!.imageSizes![index] &&
        this!.state!.imageSizes![index].status !== "loading"
      ) {
        return
      }

      const imageSizes = this!.state!.imageSizes!.slice()
      imageSizes[index] = imageStatus
      this.setState({ imageSizes })
    }

    if (this!.state!.imageSizes![index].status === "success") {
      // 已经加载过就不会加载了
      return
    }

    // 如果已经有宽高了，直接设置为 success
    if (
      this!.state!.imageSizes![index].width > 0 &&
      this!.state!.imageSizes![index].height > 0
    ) {
      imageStatus.status = "success"
      saveImageSize()
      return
    }

    // 是否加载完毕了图片大小
    let sizeLoaded = false
    // 是否加载完毕了图片
    let imageLoaded = false

    // 如果图片是 file: 开头，说明是本地图片，默认已经加载完毕
    if (image.url.startsWith(`file:`)) {
      imageLoaded = true
    }

    if (Platform.OS !== ("web" as any)) {
      const prefetchImagePromise = Image.prefetch(image.url)

      if (image.url.match(/^(http|https):\/\//)) {
        prefetchImagePromise.then(
          () => {
            imageLoaded = true
            if (sizeLoaded) {
              imageStatus.status = "success"
              saveImageSize()
            }
          },
          () => {
            imageStatus.status = "fail"
            saveImageSize()
          }
        )
      } else {
        // 本地图片
        imageLoaded = true
        prefetchImagePromise
          .then(() => {
            //
          })
          .catch(() => {
            //
          })
        if (sizeLoaded) {
          imageStatus.status = "success"
          saveImageSize()
        }
      }

      // 获取图片大小
      if (image.width && image.height) {
        // 如果已经传了图片长宽,那直接 success
        sizeLoaded = true
        imageStatus.width = image.width
        imageStatus.height = image.height

        if (imageLoaded) {
          imageStatus.status = "success"
          saveImageSize()
        }
      } else {
        Image.getSize(
          image.url,
          (width, height) => {
            sizeLoaded = true
            imageStatus.width = width
            imageStatus.height = height

            if (imageLoaded) {
              imageStatus.status = "success"
              saveImageSize()
            }
          },
          error => {
            // 获取大小失败
            imageStatus.status = "fail"
            saveImageSize()
          }
        )
      }
    } else {
      const imageFetch = new (window as any).Image()
      imageFetch.src = image.url
      imageFetch.onload = () => {
        imageStatus.width = imageFetch.width
        imageStatus.height = imageFetch.height
        imageStatus.status = "success"
        saveImageSize()
      }
      imageFetch.onerror = () => {
        imageStatus.status = "fail"
        saveImageSize()
      }
    }
  }

  /**
   * 触发溢出水平滚动
   */
  public handleHorizontalOuterRangeOffset = (offsetX: number) => {
    this.positionXNumber = this.standardPositionX + offsetX
    this.positionX.setValue(this.positionXNumber)

    if (offsetX < 0) {
      if (
        this!.state!.currentShowIndex ||
        0 < this.props.imageUrls.length - 1
      ) {
        this.loadImage((this!.state!.currentShowIndex || 0) + 1)
      }
    } else if (offsetX > 0) {
      if (this!.state!.currentShowIndex || 0 > 0) {
        this.loadImage((this!.state!.currentShowIndex || 0) - 1)
      }
    }
  }

  /**
   * 手势结束，但是没有取消浏览大图
   */
  public handleResponderRelease = (vx: number) => {
    if (vx > 0.7) {
      // 上一张
      this.goBack.call(this)

      // 这里可能没有触发溢出滚动，为了防止图片不被加载，调用加载图片
      if (this.state.currentShowIndex || 0 > 0) {
        this.loadImage((this.state.currentShowIndex || 0) - 1)
      }
    } else if (vx < -0.7) {
      // 下一张
      this.goNext.call(this)
      if (this.state.currentShowIndex || 0 < this.props.imageUrls.length - 1) {
        this.loadImage((this.state.currentShowIndex || 0) + 1)
      }
    }

    if (
      this.positionXNumber - this.standardPositionX >
      (this.props.flipThreshold || 0)
    ) {
      // 上一张
      this.goBack.call(this)
    } else if (
      this.positionXNumber - this.standardPositionX <
      -(this.props.flipThreshold || 0)
    ) {
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
  public goBack = () => {
    if (this.state.currentShowIndex === 0) {
      // 回到之前的位置
      this.resetPosition.call(this)
      return
    }

    this.positionXNumber = this.standardPositionX + this.width
    this.standardPositionX = this.positionXNumber
    Animated.timing(this.positionX, {
      toValue: this.positionXNumber,
      duration: 100
    }).start()

    const nextIndex = (this.state.currentShowIndex || 0) - 1

    this.setState(
      {
        currentShowIndex: nextIndex
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.currentShowIndex)
        }
      }
    )
  }

  /**
   * 到下一张
   */
  public goNext() {
    if (this.state.currentShowIndex === this.props.imageUrls.length - 1) {
      // 回到之前的位置
      this.resetPosition.call(this)
      return
    }

    this.positionXNumber = this.standardPositionX - this.width
    this.standardPositionX = this.positionXNumber
    Animated.timing(this.positionX, {
      toValue: this.positionXNumber,
      duration: 100
    }).start()

    const nextIndex = (this.state.currentShowIndex || 0) + 1

    this.setState(
      {
        currentShowIndex: nextIndex
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.currentShowIndex)
        }
      }
    )
  }

  /**
   * 回到原位
   */
  public resetPosition() {
    this.positionXNumber = this.standardPositionX
    Animated.timing(this.positionX, {
      toValue: this.standardPositionX,
      duration: 150
    }).start()
  }

  /**
   * 长按
   */
  public handleLongPress = (image: IImageInfo) => {
    if (this.props.saveToLocalByLongPress) {
      // 出现保存到本地的操作框
      this.setState({ isShowMenu: true })
    }

    if (this.props.onLongPress) {
      this.props.onLongPress(image)
    }
  }

  /**
   * 单击
   */
  public handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.handleCancel)
    }
  }

  /**
   * 双击
   */
  public handleDoubleClick = () => {
    if (this.props.onDoubleClick) {
      this.props.onDoubleClick(this.handleCancel)
    }
  }

  /**
   * 退出
   */
  public handleCancel = () => {
    this.hasLayout = false
    if (this.props.onCancel) {
      this.props.onCancel()
    }
  }

  /**
   * 完成布局
   */
  public handleLayout = (event: any) => {
    if (this.hasLayout) {
      return
    }

    this.hasLayout = true

    this.width = event.nativeEvent.layout.width
    this.height = event.nativeEvent.layout.height
    this.styles = styles(
      this.width,
      this.height,
      this.props.backgroundColor || "transparent"
    )

    // 强制刷新
    this.forceUpdate()
    this.jumpToCurrentImage()
  }

  /**
   * 获得整体内容
   */
  public getContent() {
    // 获得屏幕宽高
    const screenWidth = this.width
    const screenHeight = this.height

    const ImageElements = this.props.imageUrls.map((image, index) => {
      if (!this.handleLongPressWithIndex.has(index)) {
        this.handleLongPressWithIndex.set(
          index,
          this.handleLongPress.bind(this, image)
        )
      }

      let width =
        this!.state!.imageSizes![index] && this!.state!.imageSizes![index].width
      let height =
        this.state.imageSizes![index] && this.state.imageSizes![index].height
      const imageInfo = this.state.imageSizes![index]

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

      const Wrapper = ({ children, ...others }: any) => (
        <ImageZoom
          cropWidth={this.width}
          cropHeight={this.height}
          maxOverflow={this.props.maxOverflow}
          horizontalOuterRangeOffset={this.handleHorizontalOuterRangeOffset}
          responderRelease={this.handleResponderRelease}
          onLongPress={this.handleLongPressWithIndex.get(index)}
          onClick={this.handleClick}
          onDoubleClick={this.handleDoubleClick}
          {...others}
        >
          {children}
        </ImageZoom>
      )

      switch (imageInfo.status) {
        case "loading":
          return (
            <Wrapper
              key={index}
              style={{
                ...this.styles.modalContainer,
                ...this.styles.loadingContainer
              }}
              imageWidth={screenWidth}
              imageHeight={screenHeight}
            >
              <View style={this.styles.loadingContainer}>
                {this!.props!.loadingRender!()}
              </View>
            </Wrapper>
          )
        case "success":
          return (
            <ImageZoom
              key={index}
              cropWidth={this.width}
              cropHeight={this.height}
              maxOverflow={this.props.maxOverflow}
              horizontalOuterRangeOffset={this.handleHorizontalOuterRangeOffset}
              responderRelease={this.handleResponderRelease}
              onLongPress={this.handleLongPressWithIndex.get(index)}
              onClick={this.handleClick}
              onDoubleClick={this.handleDoubleClick}
              imageWidth={width}
              imageHeight={height}
            >
              <Image
                style={{
                  ...this.styles.imageStyle,
                  width,
                  height
                }}
                source={{ uri: image.url }}
              />
            </ImageZoom>
          )
        case "fail":
          return (
            <Wrapper
              key={index}
              style={this.styles.modalContainer}
              imageWidth={
                this.props.failImageSource
                  ? this.props.failImageSource.width
                  : screenWidth
              }
              imageHeight={
                this.props.failImageSource
                  ? this.props.failImageSource.height
                  : screenHeight
              }
            >
              {this.props.failImageSource && (
                <Image
                  source={{
                    uri: this.props.failImageSource.url
                  }}
                  style={{
                    width: this.props.failImageSource.width,
                    height: this.props.failImageSource.height
                  }}
                />
              )}
            </Wrapper>
          )
      }
    })
    const panResponderYPanHandlers = this.state.panResponderY ?
    this.state.panResponderY.panHandlers :
    {}

    return (
      <Animated.View
        {...panResponderYPanHandlers}
        style={this.positionY.getLayout()}
      >
        <Animated.View
          style={{ ...this.styles.container, opacity: this.fadeAnim }}
        >
          {this!.props!.renderHeader!(this.state.currentShowIndex)}

          <View style={this.styles.arrowLeftContainer}>
            <TouchableWithoutFeedback onPress={this.goBack}>
              <View>{this!.props!.renderArrowLeft!()}</View>
            </TouchableWithoutFeedback>
          </View>

          <View style={this.styles.arrowRightContainer}>
            <TouchableWithoutFeedback onPress={this.goNext}>
              <View>{this!.props!.renderArrowRight!()}</View>
            </TouchableWithoutFeedback>
          </View>

          <Animated.View
            style={{
              ...this.styles.moveBox,
              transform: [{ translateX: this.positionX }],
              width: this.width * this.props.imageUrls.length
            }}
          >
          {ImageElements}

          </Animated.View>
          {
            this!.props!.renderIndicator!(
              (this.state.currentShowIndex || 0) + 1,
              this.props.imageUrls.length
            )
          }

          {this.props.imageUrls[this.state.currentShowIndex || 0] && this.props.imageUrls[this.state.currentShowIndex || 0].originSizeKb &&
            this.props.imageUrls[this.state.currentShowIndex || 0].originUrl && (
              <View style={this.styles.watchOrigin}>
                <TouchableOpacity style={this.styles.watchOriginTouchable}>
                  <Text style={this.styles.watchOriginText}>查看原图(2M)</Text>
                </TouchableOpacity>
              </View>
            )}
          <View
            style={[{ bottom: 0, position: "absolute", zIndex: 9999 }, this.props.footerContainerStyle]}
          >
            {this!.props!.renderFooter!(this.state.currentShowIndex)}
          </View>
        </Animated.View>
      </Animated.View>
    )
  }

  /**
   * 保存当前图片到本地相册
   */
  public saveToLocal = () => {
    if (!this.props.onSave) {
      CameraRoll.saveToCameraRoll(
        this.props.imageUrls[this.state.currentShowIndex || 0].url
      )
      this!.props!.onSaveToCamera!(this.state.currentShowIndex)
    } else {
      this.props.onSave(
        this.props.imageUrls[this.state.currentShowIndex || 0].url
      )
    }

    this.setState({ isShowMenu: false })
  }

  public getMenu() {
    if (!this.state.isShowMenu) {
      return null
    }

    return (
      <View style={this.styles.menuContainer}>
        <View style={this.styles.menuShadow} />
        <View style={this.styles.menuContent}>
          <TouchableHighlight
            underlayColor="#F2F2F2"
            onPress={this.saveToLocal}
            style={this.styles.operateContainer}
          >
            <Text style={this.styles.operateText}>
              {this.props.menuContext.saveToLocal}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#F2F2F2"
            onPress={this.handleLeaveMenu}
            style={this.styles.operateContainer}
          >
            <Text style={this.styles.operateText}>
              {this.props.menuContext.cancel}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  public handleLeaveMenu = () => {
    this.setState({ isShowMenu: false })
  }

  public render() {
    let childs: React.ReactElement<any> = null as any

    childs = (
      <View>
        {this.getContent()}
        {this.getMenu()}
      </View>
    )

    return (
      <View
        onLayout={this.handleLayout}
        style={{ flex: 1, overflow: "hidden", ...this.props.style }}
      >
        {childs}
      </View>
    )
  }
}
