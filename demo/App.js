import React from 'react';
import { Modal, Dimensions } from 'react-native';
import ImageViewer from './built/index';

const images = [{
  url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
}, {
  url: 'https://error-address'
}, {
  url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
}]

export default class App extends React.Component {
  render() {
    return (
      <Modal visible={true} transparent={true}>
        <ImageViewer
          imageUrls={images}
          failImageSource={{
            url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').width
          }}
        />
      </Modal>
    );
  }
}
