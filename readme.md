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
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
}, {
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
}, {
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
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

![image](https://cloud.githubusercontent.com/assets/7970947/21376663/ea10baf6-c771-11e6-9570-af3333428343.png)

### Dependence

Depend on `react-native-image-pan-zoom`: https://github.com/ascoders/react-native-image-zoom
