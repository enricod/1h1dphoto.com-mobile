import React, { Component } from 'react';
import {
  Image,
  View,
  StyleSheet
} from 'react-native';
import {
  Content,
  Text,
  Button
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
      <View style={styles.container} >
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Button onPress={this.takePicture.bind(this)}>
            <Text>CAPTURE</Text>
          </Button>
        </Camera>

      </View>
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
  container: {
    height: 500
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});