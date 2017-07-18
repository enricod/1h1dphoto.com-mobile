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
      user: {
        username: 'anon',
        isAnon: true
      }
    };

    // this.storage = new Storage();
    this.changeScreen = this.changeScreen.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.saveToken = this.saveToken.bind(this);
  }

  saveUser(user) {
    console.log(user);
    AsyncStorage.setItem('user', JSON.stringify(user));
    this.setState({ user: user });

  }

  saveToken(token) {
    console.log(token);
    AsyncStorage.setItem('token', JSON.stringify(token));
    this.setState({ token: token });

  }

  componentDidMount() {
    AsyncStorage.getItem('user')
      .then((value) => {
        if (value) {
          var user = JSON.parse(value);
          this.setState({ user: user })
        }
      })
  }

  getCurrentScreen() {
    if (this.state.isAnon) {
      return <LoginScreen user={this.state.user} saveUser={this.saveUser} saveToken={this.saveToken} />
    } else {
      if (this.state.currentScreen === 'homeScreen') {
        return <HomeScreen user={this.state.user} saveToken={this.saveToken} />
      } else if (this.state.currentScreen === 'cameraScreen') {
        return <CameraScreen user={this.state.user} />
      } else if (this.state.currentScreen === 'profileScreen') {
        return <ProfileScreen user={this.state.user} />
      }
    }
    return <HomeScreen user={this.state.user} />
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
