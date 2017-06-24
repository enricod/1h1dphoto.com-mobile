/**
 * OnehOnedphoto
 */

'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import { Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Drawer
} from 'native-base';
import Camera from 'react-native-camera';
import HomeScreen from './src/HomeScreen.js';
import ProfileScreen from './src/ProfileScreen.js';

class CameraScreen extends React.Component {
  render() {
    return (
      <CameraComponent />
    );
  }
}


class MainHeader extends React.Component {
  render () {
    return (
      <Header>
        <Left>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>OnehOnedphoto</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

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

class OnehOnedphoto extends React.Component {
  constructor() {
    super();
    this.state = {currentScreen: 'homeScreen'};

    this.changeScreen = this.changeScreen.bind(this);
  }

  getCurrentScreen() {
    if (this.state.currentScreen === 'homeScreen') {
      return <HomeScreen/>
    } else if (this.state.currentScreen === 'cameraScreen') {
      return <CameraScreen/>
    }else if (this.state.currentScreen === 'profileScreen') {
      return <ProfileScreen/>
    }
  }

  changeScreen(e) {
    // console.log(e);
    this.setState({currentScreen:e});
  }

  render () {
   return (
      <Container>
        <MainHeader />
        <Content>
          {this.getCurrentScreen()}
        </Content>
        <MainFooter onChangeScreen = {this.changeScreen}/>
      </Container>
    );
  }
}




class MainFooter extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }
  onChange(screenName) 
  {
      this.props.onChangeScreen(screenName);
  }
  render () {
    return (
        <Footer>
          <FooterTab>
            <FooterBtn btnClick = {this.onChange} title='Home' screen='homeScreen' icon='navigate' />
            <FooterBtn btnClick = {this.onChange} title='Camera' screen='cameraScreen' icon='camera' />
            <FooterBtn btnClick = {this.onChange} title='My photos' screen='profileScreen' icon='profile' />
            <FooterBtn btnClick = {this.onChange} title='Profile' screen='profileScreen' icon='profile' />
  
          </FooterTab>
        </Footer>
    );
  }
}

class FooterBtn extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange() {
      this.props.btnClick(this.props.screen);
  } 
  
  render() {
    return (
      <Button onPress = {this.onChange} >
        <Icon name={this.props.icon} />
        <Text>{this.props.title}</Text>
      </Button>
    );
  }
}

MainFooter.PropTypes = {
  onChangeScreen: PropTypes.func
};

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
