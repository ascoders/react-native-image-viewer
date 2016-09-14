# react-native-image-viewer
react native image viewer with pan and zoom

## Show Cases

> Swiper image smoothly

![1.gif](http://odhbct4cw.bkt.clouddn.com/image-viewer/111.gif)

> Zoom while sliding

![3.gif](http://odhbct4cw.bkt.clouddn.com/image-viewer/333.gif)

> Intelligent zoom

![2.gif](http://odhbct4cw.bkt.clouddn.com/image-viewer/222.gif)

## Getting Started

### Installation

```
npm i react-native-image-zoom-viewer --save
```

### Basic Usage

- Install react-native first

```
$ npm i react-native -g
```

- Initialization of a react-native project

```
$ react-native init myproject
```

- Then, edit myproject/index.ios.js, like this:

```
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