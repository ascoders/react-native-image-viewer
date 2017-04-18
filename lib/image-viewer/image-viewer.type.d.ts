import * as React from 'react';
import * as ReactNative from 'react-native';
export interface PropsDefine extends ReactNative.ViewProperties {
    imageUrls: Array<ImageInfo>;
    enableImageZoom?: boolean;
    onShowModal?: (content?: JSX.Element) => void;
    onCancel?: () => void;
    flipThreshold?: number;
    maxOverflow?: number;
    index?: number;
    failImageSource?: string | {
        uri: string;
    };
    loadingRender?: () => React.ReactElement<any>;
    onSaveToCamera?: (index?: number) => void;
    onChange?: (index?: number) => void;
    saveToLocalByLongPress?: boolean;
    others?: any;
    onClick?: (close?: Function) => void;
    onDoubleClick?: (close?: Function) => void;
    onSave?: (url: string) => void;
    renderHeader?: () => React.ReactElement<any>;
    renderFooter?: () => React.ReactElement<any>;
    renderIndicator?: (currentIndex?: number, allSize?: number) => React.ReactElement<any>;
    renderArrowLeft?: () => React.ReactElement<any>;
    renderArrowRight?: () => React.ReactElement<any>;
}
export declare class PropsGaea {
    gaeaName: string;
    gaeaIcon: string;
    gaeaUniqueKey: string;
}
export declare class Props extends PropsGaea implements PropsDefine {
    show: boolean;
    imageUrls: ImageInfo[];
    enableImageZoom: boolean;
    visible: boolean;
    flipThreshold: number;
    maxOverflow: number;
    failImageSource: string;
    index: number;
    saveToLocalByLongPress: boolean;
    onShowModal: () => void;
    onCancel: () => void;
    loadingRender: () => any;
    onSaveToCamera: () => void;
    onChange: () => void;
    onClick: (close?: Function) => void;
    onDoubleClick: (close?: Function) => void;
    renderHeader: () => any;
    renderFooter: () => any;
    renderIndicator: (currentIndex: number, allSize: number) => React.ComponentElement<React.ViewProperties & {
        children?: React.ReactNode;
    }, React.Component<React.ViewProperties, React.ComponentState>>;
    renderArrowLeft: () => any;
    renderArrowRight: () => any;
}
export interface StateDefine {
    show?: boolean;
    currentShowIndex?: number;
    imageLoaded?: boolean;
    imageSizes?: Array<ImageSize>;
    isShowMenu?: boolean;
}
export declare class State implements StateDefine {
    show: boolean;
    currentShowIndex: number;
    imageSizes: any;
    isShowMenu: boolean;
}
export interface ImageInfo {
    url: string;
    width?: number;
    height?: number;
    sizeKb?: number;
    originSizeKb?: number;
    originUrl?: string;
}
export interface ImageSize {
    width: number;
    height: number;
    status: 'loading' | 'success' | 'fail';
}
