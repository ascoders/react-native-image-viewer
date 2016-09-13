import * as React from 'react';
import * as typings from './image-viewer.type';
export default class ImageViewer extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    render(): JSX.Element;
}
