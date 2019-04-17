import * as React from 'react';
import { Image, ImageURISource, Text, View, ViewStyle } from 'react-native';
import { simpleStyle } from './image-viewer.style';

interface IOnMove {
  type: string;
  positionX: number;
  positionY: number;
  scale: number;
  zoomCurrentDistance: number;
}

export class Props {
  /**
   * 是否显示
   */
  public show?: boolean = false;

  /**
   * 图片数组
   */
  public imageUrls: IImageInfo[] = [];

  /**
   * 滑动到下一页的X阈值
   */
  public flipThreshold?: number = 80;

  /**
   * 当前页能滑到下一页X位置最大值
   */
  public maxOverflow?: number = 300;

  /**
   * 初始显示第几张图
   */
  public index?: number = 0;

  /**
   * 加载失败的图
   */
  public failImageSource?: IImageInfo = undefined;

  /**
   * 背景颜色
   */
  public backgroundColor?: string = 'black';

  /**
   * style props for the footer container
   */
  public footerContainerStyle?: object = {};

  /**
   * Menu Context Values
   */
  public menuContext?: any = { saveToLocal: 'save to the album', cancel: 'cancel' };

  /**
   * 是否开启长按保存到本地的功能
   */
  public saveToLocalByLongPress?: boolean = true;

  /**
   * 是否允许缩放图片
   */
  public enableImageZoom?: boolean = true;

  public style?: ViewStyle = {};

  /**
   * Enable swipe down to close image viewer.
   * When swipe down, will trigger onCancel.
   */
  public enableSwipeDown?: boolean = false;

  /**
   * threshold for firing swipe down function
   */
  public swipeDownThreshold?: number;

  public doubleClickInterval?: number;

  /**
   * 是否预加载图片
   */
  public enablePreload?: boolean = false;

  /**
   * 翻页时的动画时间
   */
  public pageAnimateTime?: number = 100;

  /**
   * 长按图片的回调
   */
  public onLongPress?: (image?: IImageInfo) => void = () => {
    //
  };

  /**
   * 单击回调
   */
   public onClick?:  (close?: () => any, currentShowIndex?: number) => void = () => {
    //
  };

  /**
   * 双击回调
   */
  public onDoubleClick?: (close?: () => any) => void = () => {
    //
  };

  /**
   * 图片保存到本地方法，如果写了这个方法，就不会调取系统默认方法
   * 针对安卓不支持 saveToCameraRoll 远程图片，可以在安卓调用此回调，调用安卓原生接口
   */
  public onSave?: (url: string) => void = () => {
    //
  };

  public onMove?: (position?: IOnMove) => void = () => {
    //
  };

  /**
   * 自定义头部
   */
  public renderHeader?: (currentIndex?: number) => React.ReactElement<any> = () => {
    return null as any;
  };

  /**
   * 自定义尾部
   */
  public renderFooter?: (currentIndex?: number) => React.ReactElement<any> = () => {
    return null as any;
  };

  /**
   * 自定义计时器
   */
  public renderIndicator?: (currentIndex?: number, allSize?: number) => React.ReactElement<any> = (
    currentIndex?: number,
    allSize?: number
  ) => {
    return React.createElement(
      View,
      { style: simpleStyle.count },
      React.createElement(Text, { style: simpleStyle.countText }, currentIndex + '/' + allSize)
    );
  };

  /**
   * Render image component
   */
  public renderImage?: (props: any) => React.ReactElement<any> = (props: any) => {
    return React.createElement(Image, props);
  };

  /**
   * 自定义左翻页按钮
   */
  public renderArrowLeft?: () => React.ReactElement<any> = () => {
    return null as any;
  };

  /**
   * 自定义右翻页按钮
   */
  public renderArrowRight?: () => React.ReactElement<any> = () => {
    return null as any;
  };

  /**
   * 弹出大图的回调
   */
  public onShowModal?: (content?: any) => void = () => {
    //
  };

  /**
   * 取消看图的回调
   */
  public onCancel?: () => void = () => {
    //
  };

  /**
   * function that fires when user swipes down
   */
  public onSwipeDown?: () => void = () => {
    //
  };

  /**
   * 渲染loading元素
   */
  public loadingRender?: () => React.ReactElement<any> = () => {
    return null as any;
  };

  /**
   * 保存到相册的回调
   */
  public onSaveToCamera?: (index?: number) => void = () => {
    //
  };

  /**
   * 当图片切换时触发
   */
  public onChange?: (index?: number) => void = () => {
    //
  };
}

export class State {
  /**
   * 是否显示
   */
  public show?: boolean = false;

  /**
   * 当前显示第几个
   */
  public currentShowIndex?: number = 0;

  /**
   * 图片拉取是否完毕了
   */
  public imageLoaded?: boolean = false;

  /**
   * 图片长宽列表
   */
  public imageSizes?: IImageSize[] = [];

  /**
   * 是否出现功能菜单
   */
  public isShowMenu?: boolean = false;
}

export interface IImageInfo {
  url: string;
  /**
   * 没有的话会自动拉取
   */
  width?: number;
  /**
   * 没有的话会自动拉取
   */
  height?: number;
  /**
   * 图片字节大小(kb为单位)
   */
  sizeKb?: number;
  /**
   * 原图字节大小(kb为单位)
   * 如果设置了这个字段,并且有原图url,则显示查看原图按钮
   */
  originSizeKb?: number;
  /**
   * 原图url地址
   */
  originUrl?: string;
  /**
   * Pass to image props
   */
  props?: any;
  /**
   * 初始是否不超高 TODO:
   */
  freeHeight?: boolean;
  /**
   * 初始是否不超高 TODO:
   */
  freeWidth?: boolean;
}

export interface IImageSize {
  width: number;
  height: number;
  // 图片加载状态
  status: 'loading' | 'success' | 'fail';
}
