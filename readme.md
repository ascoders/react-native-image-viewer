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

- Install create-react-native-app first

```bash
$ npm install -g create-react-native-app
```

- Initialization of a react-native project

```bash
$ create-react-native-app AwesomeProject
```

- Then, edit `AwesomeProject/App.js`, like this:

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

### Document

![image](https://cloud.githubusercontent.com/assets/7970947/21376663/ea10baf6-c771-11e6-9570-af3333428343.png)

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
