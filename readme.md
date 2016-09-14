# react-native-image-viewer
react native image viewer with pan and zoom

## Show Cases

> Swiper image smoothly

![1.gif](http://upload-images.jianshu.io/upload_images/2979188-7b2b43f9ded013e9.gif?imageMogr2/auto-orient/strip)

> Zoom while sliding

![3.gif](http://upload-images.jianshu.io/upload_images/2979188-deeef785dcb710be.gif?imageMogr2/auto-orient/strip)

> Intelligent zoom

![2.gif](http://upload-images.jianshu.io/upload_images/2979188-8288c6d3174c3bee.gif?imageMogr2/auto-orient/strip)

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