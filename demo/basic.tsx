import * as React from 'react'
import ImageViewer from '../index'

export default class Demo extends React.Component<any, any> {
    static title = '基本用法'
    static description = ``

    render() {
        const images = [{
            url: 'http://scimg.jb51.net/allimg/160815/103-160Q509544OC.jpg'
        }, {
            url: 'http://img.sc115.com/uploads1/sc/jpgs/1508/apic22412_sc115.com.jpg'
        }, {
            url: 'http://h.hiphotos.baidu.com/zhidao/pic/item/0df431adcbef7609bca7d58a2adda3cc7cd99e73.jpg'
        }]


        return (
            <div style={{ width: 400, height: 300, display: 'flex' }}>
                <ImageViewer imageUrls={images} index={2} />
            </div>
        )
    }
}
