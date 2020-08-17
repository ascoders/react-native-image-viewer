import React, { Component } from 'react';
import { View, Modal, TouchableNativeFeedback, Text, Image, FlatList,} from 'react-native';
import ImageViewer from './built/index';

const images = [
  {
    id: 'adfa',
    url:'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_ares_ix_220008.jpg',
    thumbnailUrl:'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_ares_ix_220008.jpg',
    freeHeight: true
  },
  {
    id: 'adasdffa',
    url: 'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_takeoff_215660.jpg',
    thumbnailUrl:'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_takeoff_215660.jpg',
    freeHeight: true
  },
  { 
    id: 'adfafasdf',
    url:'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_ares_ix_220008.jpg',
    thumbnailUrl:'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_ares_ix_220008.jpg',
    freeHeight: true
  },
  {
    id: 'adflma',
    url: 'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_takeoff_215660.jpg',
    thumbnailUrl:'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_takeoff_215660.jpg',
    freeHeight: true
  },
  { id: 'addfkofa',
    url:'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_ares_ix_220008.jpg',
    thumbnailUrl:'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_ares_ix_220008.jpg',
    freeHeight: true
  },
  {
    id: 'adffosdfosa',
    url: 'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_takeoff_215660.jpg',
    thumbnailUrl:'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_takeoff_215660.jpg',
    freeHeight: true
  },
  { 
    id: 'adflksnfosa',
    url:'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_ares_ix_220008.jpg',
    thumbnailUrl:'https://images.all-free-download.com/images/graphiclarge/rocket_launch_rocket_ares_ix_220008.jpg',
    freeHeight: true
  },
  {
    id: 'adasfsndlkfa',
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
