## Show Cases

> Swiper image smoothly

![1.gif](https://cloud.githubusercontent.com/assets/7970947/18501090/878ad6f2-7a80-11e6-8602-a2c4d1f697f3.gif)

> Zoom while sliding

![3.gif](https://cloud.githubusercontent.com/assets/7970947/18501092/87d5efe8-7a80-11e6-9234-516b2be1e729.gif)

> Intelligent zoom

![2.gif](https://cloud.githubusercontent.com/assets/7970947/18501091/87b14d8c-7a80-11e6-904d-8c434e1904ce.gif)

## Getting Started

### Installation

```bash
npm i react-native-image-zoom-viewer --save
```

### Basic Usage

- Install react-native first

```bash
$ npm i react-native -g
```

- Initialization of a react-native project

```bash
$ react-native init myproject
```

- Then, edit myproject/index.ios.js, like this:

```typescript
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Modal
} from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';

const images = [{
    url: 'http://scimg.jb51.net/allimg/160815/103-160Q509544OC.jpg'
}, {
    url: 'http://img.sc115.com/uploads1/sc/jpgs/1508/apic22412_sc115.com.jpg'
}, {
    url: 'http://v1.qzone.cc/avatar/201407/07/00/24/53b9782c444ca987.jpg!200x200.jpg'
}]

class ImageViewer extends React.Component {
    render: function() {
        return (
            <Modal visible={true} transparent={true}>
                <ImageViewer imageUrls={images}/>
            </Modal>
        )
    }
}

AppRegistry.registerComponent('myproject', () => ImageViewer);
```

### Document

![image](https://cloud.githubusercontent.com/assets/7970947/18501167/1d1adcf8-7a81-11e6-8551-163634b3bedd.png)