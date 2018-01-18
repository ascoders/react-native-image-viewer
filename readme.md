## Show Cases

> Swiper image

![1.gif](https://cloud.githubusercontent.com/assets/7970947/21086300/388dedfc-c056-11e6-955e-0a2a0b541f7f.gif)

> Zoom while sliding

![2.gif](https://cloud.githubusercontent.com/assets/7970947/21086323/7355face-c056-11e6-8d68-384000d41d47.gif)

## Getting Started

### Installation

```bash
npm i react-native-image-zoom-viewer --save
```

### Basic Usage

* Install create-react-native-app first

```bash
$ npm install -g create-react-native-app
```

* Initialization of a react-native project

```bash
$ create-react-native-app AwesomeProject
```

* Then, edit `AwesomeProject/App.js`, like this:

```typescript
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const images = [{
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
}, {
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
}, {
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
}]

export default class App extends React.Component {
    render: function() {
        return (
            <Modal visible={true} transparent={true}>
                <ImageViewer imageUrls={images}/>
            </Modal>
        )
    }
}
```

### Props
|parameter|type|required|description|default|
|:---|:---|:---|:---|:---|
|imageUrls|array|yes|图片数组||
|enableImageZoom|boolean|no|是否开启图片手势功能|`true`|
|onShowModal|function|no|弹出大图的回调|`() => {}`|
|onCancel|funcion|no|取消看图的回调|`() => {}`|
|flipThreshold|number|no|滑动到下一页的阈值|`80`|
|maxOverflow|number|no|当前页能滑到下一页X位置最大值|`300`|
|index|number|no|初始显示第几张图|`0`|
|failImageSource|string, object|no|加载失败的图|`''`|
|loadingRender|function|no|渲染loading元素|`() => null`|
|onSaveToCamera|function|no|保存到相册的回调|`() => {}`|
|onChange|function|no|当图片切换时触发|`() => {}`|
|saveToLocalByLongPress|boolean|no|是否开启长按保存到本地的功能|`true`|
|onClick|function|no|单击回调|`(onCancel) => {onCancel()}`|
|onDoubleClick|function|no|双击回调|`(onCancel) => {onCancel()}`|
|onSave|function|no|图片保存到本地方法，如果写了这个方法就不会调取系统默认方法针对安卓不支持saveToCameraRoll远程图片，可以在安卓调用此回调调用安卓原生接口||
|renderHeader|function|no|自定义头部|`() => null`|
|renderFooter|function|no|自定义尾部|`() => null`|
|renderIndicator|function|no|自定义计时器|`(currentIndex, allSize) => currentIndex + "/" + allSize`|
|renderArrowLeft|function|no|自定义计时器|`() => null`|
|renderArrowRight|function|no|自定义左翻页按钮|`() => null`|

## Development pattern

### Step 1, run TS listener

After clone this repo, then:

```bash
npm install
npm start
```

### Step 2, run demo

```bash
cd demo
npm install
npm start
```

Then, scan the QR, use your [expo app](https://expo.io./).

### Dependence

Depend on `react-native-image-pan-zoom`: https://github.com/ascoders/react-native-image-zoom
