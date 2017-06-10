/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Button
} from 'react-native';
import {  StackNavigator } from 'react-navigation';
import Camera from 'react-native-camera';

class Hello extends React.Component {
  render() {
    return( 
      <Text>Ciao enrico</Text>
    )
  }
}
class CameraScreen extends React.Component {
  static navigationOptions = {
    title: 'Camera',
  };

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => {
        console.log(data)
        
      })
      .catch(err => console.error(err));
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <CameraComponent />
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button
        title="Go to enrico's profile"
        onPress={() =>
          navigate('Profile', { name: 'Jane' })
        }
      />
    );
  }
}

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          title="return to home"
          onPress={() =>
            navigate('Home', { name: 'Home' })
          }
        />
        <Button
          title="camera"
          onPress={() =>
            navigate('Camera', { name: 'Camera' })
          }
        />
      </View>
    );
  }
}

const OnehOnedphoto = StackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
  Camera: { screen: CameraScreen },
});


class CameraComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});


AppRegistry.registerComponent('OnehOnedphoto', () => OnehOnedphoto);
