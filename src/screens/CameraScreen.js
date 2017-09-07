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
        <CameraComponent userInstance={this.props.userInstance} navigation={this.props.navigation} />
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
        this.openCameraPreview(data);
      })
      .catch(err => console.error(err));
  }

  openCameraPreview(data) {
    this.props.navigation.navigate('CameraPreview', {imageUri: data.path, userInstance: this.props.userInstance});
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
        captureQuality={Camera.constants.CaptureQuality["1080p"]}
        jpegQuality={70}
        >
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