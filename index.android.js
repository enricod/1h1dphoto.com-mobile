/**
 * OnehOnedphoto
 */

'use strict';

<script src="http://localhost:8097"></script>

import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  View,
  Image,
  AsyncStorage
} from 'react-native';

import {
  Container,
  Header,
  Text,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Drawer,
  Grid,
  Col,
  Row,
  Card,
  CardItem,
  H1,
  H3
} from 'native-base';

import HomeScreen from './src/HomeScreen.js';
import ProfileScreen from './src/ProfileScreen.js';
import CameraScreen from './src/CameraScreen.js';
import LoginScreen from './src/LoginScreen.js';

import Config from 'react-native-config'

class MainHeader extends React.Component {
  render() {
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

class MainFooter extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }
  onChange(screen) {
    this.props.onChangeScreen(screen);
  }
  render() {
    return (
      <Footer>
        <FooterTab>
          <FooterBtn onChange={this.onChange} title='Home' screen='homeScreen' icon='navigate' />
          <FooterBtn onChange={this.onChange} title='Camera' screen='cameraScreen' icon='camera' />
          <FooterBtn onChange={this.onChange} title='My photos' screen='profileScreen' icon='person' />
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
    this.props.onChange(this.props.screen);
  }

  render() {
    return (
      <Button onPress={this.onChange} >
        <Icon name={this.props.icon} />
        <Text>{this.props.title}</Text>
      </Button>
    );
  }
}

/**
 * contiene stato globale applicazione - per ora informazioni 
 * su utente, se loggato o meno, e se loggato, l'UID da passare
 * al server
 */
class AppContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentScreen: 'homeScreen',
      needRegistration: false,
      isSignedIn: false,
      user: {}
    };

    // this.storage = new Storage();
    this.changeScreen = this.changeScreen.bind(this);
    this.saveLoginInfo = this.saveLoginInfo.bind(this);
  }

  saveLoginInfo(user, token) {
    AsyncStorage.setItem('user', JSON.stringify(user));
    AsyncStorage.setItem('token', JSON.stringify(token));
    // Share token globallu
    global.token = token;
    this.setState({ user: user, token: token, needRegistration: false, isSignedIn: true })
  }

  componentDidMount() {
    // Get user, if not present isAnon is true and LoginComponent is displayed
    AsyncStorage.getItem('user')
      .then((value) => {
        if (value) {
          var user = JSON.parse(value);

          // Login with saved user
          this.signin(user, (token) => {
            this.saveLoginInfo(user, token);
          })
        } else {
          this.setState({ needRegistration: true })
        }
      })
  }

  
  signin(user, cb) {
    let url = `${Config.SERVER_BASE_URL}/api/AppUsers/signin`;
    console.debug(url);

    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: user.username, email: user.email })
    })
      .then((response) => response.json())
      .then(response => {
        if (!!response) {
          return cb(response.token);
        }
        return;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getCurrentScreen() {
    if (this.state.needRegistration) {
      return <LoginScreen user={this.state.user} saveLoginInfo={this.saveLoginInfo} />
    } else if (this.state.isSignedIn) {
      if (this.state.currentScreen === 'homeScreen') {
        return <HomeScreen user={this.state.user} />
      } else if (this.state.currentScreen === 'cameraScreen') {
        return <CameraScreen user={this.state.user} />
      } else if (this.state.currentScreen === 'profileScreen') {
        return <ProfileScreen user={this.state.user} />
      }
    }
  }

  changeScreen(screenObj) {
    // console.log(e);
    this.setState({ currentScreen: screenObj });
  }

  render() {
    return (
      <Container>
        <MainHeader />
        <Content>
          {this.getCurrentScreen()}
        </Content>
        <MainFooter onChangeScreen={this.changeScreen} />
      </Container>
    );
  }
}

class OnehOnedphoto extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

AppRegistry.registerComponent('OnehOnedphoto', () => OnehOnedphoto);
