import * as React from 'react'
import * as typings from './image-viewer.type'

export default class ImageViewer extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    render() {
        return (
            <div>
                大图浏览
            </div>
        )
    }
}
                