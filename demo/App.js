import React, { Component } from "react";
import { View, Modal, TouchableNativeFeedback } from "react-native";
import ImageViewer from "./built/index";

const images = [
  {
    url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460"
  },
  {
    url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460"
  },
  {
    url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460"
  }
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
          <ImageViewer imageUrls={images} index={this.state.index} />
        </Modal>
      </View>
    );
  }
}
