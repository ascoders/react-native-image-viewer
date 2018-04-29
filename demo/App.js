import React from "react";
import { Modal, Dimensions, View, Text } from "react-native";
import ImageViewer from "./built/index";

const images = [
  {
    url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",
    props: {
      source: {
        headers: {
          Authorization: `Bearer`
        }
      }
    }
  },
  {
    url:
      "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1220656001,756766299&fm=27&gp=0.jpg"
  },
  {
    url:
      "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1220656001,756766299&fm=27&gp=0.jpg"
  },
  {
    url:
      "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1220656001,756766299&fm=27&gp=0.jpg"
  },
  {
    url:
      "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1220656001,756766299&fm=27&gp=0.jpg"
  },
  {
    url:
      "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1220656001,756766299&fm=27&gp=0.jpg"
  },
  {
    url:
      "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1220656001,756766299&fm=27&gp=0.jpg"
  }
];

export default class App extends React.Component {
  state = {
    visible: true
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: "black",
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height
        }}
      >
        <Modal visible={this.state.visible} transparent={true}>
          <ImageViewer
            imageUrls={images}
            onCancel={() => {
              this.setState({ visible: false });
            }}
            renderFooter={() => (
              <View>
                <Text style={{ color: "white" }}>Render footer</Text>
              </View>
            )}
            failImageSource={{
              url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").width
            }}
          />
        </Modal>
      </View>
    );
  }
}
