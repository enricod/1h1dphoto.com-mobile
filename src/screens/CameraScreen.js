import React, { Component } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
import {
  Content,
  Button,
  Text
} from 'native-base';

import PropTypes from 'prop-types';
import Config from 'react-native-config'
import Camera from 'react-native-camera';

export default class CameraScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Content>
        <CameraComponent userInstance={this.props.userInstance} />
      </Content>
    );
  }
}

class CameraComponent extends Component {
  constructor(props) {
    super(props);
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({ metadata: options })
      .then((data) => {
        console.log(data);
        this.uploadFile(data);
      })
      .catch(err => console.error(err));
  }

  uploadFile(data) {
    let url = `${Config.SERVER_BASE_URL}/api/images/upload`;

    const file = {
      uri: data.path,
      name: data.path,
      type: 'image/jpg'
    }

    const body = new FormData()
    body.append('image', file)

    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': this.props.userInstance.appToken
      },
      body
    }).then(response => response.json())
      .then(response => {
        if (response) {
          console.log(response);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}
        flashMode={Camera.constants.FlashMode.auto}
        captureQuality={Camera.constants.CaptureQuality["1024p"]}>
        <Text style={styles.captureButton} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
      </Camera>
    );
  }
}

// Style
// FIXME: 79px is the height of the footer and something, change with something more dynamic
const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height - 79,
    width: Dimensions.get('window').width
  },
  captureButton: {
    flex: 0,
    backgroundColor: '#4286f4',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});