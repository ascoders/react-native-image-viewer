import React, { Component } from 'react';
import { View, Modal, TouchableNativeFeedback, Text, Image, ScrollView } from 'react-native';
import ImageViewer from './built/index';


const images = [
  { 
    url:'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_ares_ix_220008.jpg',
    thumbnailUrl:'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_ares_ix_220008.jpg',
    freeHeight: true
  },
  {
    url: 'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_takeoff_215660.jpg',
    thumbnailUrl:'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_takeoff_215660.jpg',
    freeHeight: true
  },
  { 
    url:'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_ares_ix_220008.jpg',
    thumbnailUrl:'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_ares_ix_220008.jpg',
    freeHeight: true
  },
  {
    url: 'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_takeoff_215660.jpg',
    thumbnailUrl:'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_takeoff_215660.jpg',
    freeHeight: true
  },
  { 
    url:'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_ares_ix_220008.jpg',
    thumbnailUrl:'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_ares_ix_220008.jpg',
    freeHeight: true
  },
  {
    url: 'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_takeoff_215660.jpg',
    thumbnailUrl:'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_takeoff_215660.jpg',
    freeHeight: true
  },
  { 
    url:'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_ares_ix_220008.jpg',
    thumbnailUrl:'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_ares_ix_220008.jpg',
    freeHeight: true
  },
  {
    url: 'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_takeoff_215660.jpg',
    thumbnailUrl:'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_takeoff_215660.jpg',
    freeHeight: true
  },
];

export default class Main extends Component {
  state = {
    index: 0,
    modalVisible: true
  };

  render() {
    return (
      <View
        style={{
          padding: 10
        }}
      >
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
        <ImageViewer
            imageUrls={images}
            index={this.state.index}
            onSwipeDown={() => {
              console.log('onSwipeDown');
            }}
            onMove={data => console.log(data)}
            enableSwipeDown={true}
            showThumbnails={true}
          />
        </Modal>
      </View>
    );
  }
}



  // export interface IThumbnailSize {
  //   width: number;
  //   height: number;
  //   // 图片加载状态
  //   status: 'loading' | 'success' | 'fail';
  // }

  // 
