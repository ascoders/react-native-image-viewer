import * as React from 'react';
import * as ReactNative from 'react-native';
export interface PropsDefine extends ReactNative.ViewProperties {
    imageUrls: Array<ImageInfo>;
    enableImageZoom?: boolean;
    onShowModal?: (content?: JSX.Element) => void;
    visible?: boolean;
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
    others?: any;
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
    onShowModal: () => void;
    visible: boolean;
    onCancel: () => void;
    flipThreshold: number;
    maxOverflow: number;
    failImageSource: string;
    index: number;
    loadingRender: () => any;
    onSaveToCamera: () => void;
    onChange: () => void;
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
