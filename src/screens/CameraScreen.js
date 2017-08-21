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
import Camera from 'react-native-camera';

export default class CameraScreen extends React.Component {
  render() {
    return (
      <Content>
        <CameraComponent />
      </Content>
    );
  }
}

class CameraComponent extends Component {
  render() {
    return (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}>
        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
      </Camera>
    );
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({ metadata: options })
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#4286f4',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});