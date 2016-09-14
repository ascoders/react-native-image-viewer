import * as React from 'react';
import * as typings from './image-viewer.type';
export default class ImageViewer extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private fadeAnim;
    private standardPositionX;
    private positionXNumber;
    private positionX;
    componentWillMount(): void;
    loadImage(index: number): void;
    handleHorizontalOuterRangeOffset(offsetX: number): void;
    handleResponderRelease(vx: number): void;
    goBack(): void;
    goNext(): void;
    resetPosition(): void;
    handleLongPress(image: typings.ImageInfo): void;
    getContent(): JSX.Element;
    saveToLocal(): void;
    getMenu(): JSX.Element;
    handleLeaveMenu(): void;
    render(): JSX.Element;
}
