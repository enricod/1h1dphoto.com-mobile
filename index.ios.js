/**
 * OnehOnedphoto
 */
import React, { Component } from 'react';

import {
  AppRegistry,
  AsyncStorage
} from 'react-native';

import {
  Root,
  Container,
  Header,
  Text,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Drawer
} from 'native-base';

import MainHeader from './src/MainHeader';
import MainFooter from './src/MainFooter';

import HomeScreen from './src/HomeScreen';
import ProfileScreen from './src/ProfileScreen';
import CameraScreen from './src/CameraScreen';
import LoginScreen from './src/LoginScreen';
import Sidebar from './src/SideBar';

import Config from 'react-native-config'

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

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<Sidebar />}
        onClose={() => this.closeDrawer()} >

        <Container padder>
          <MainHeader openDrawer={this.openDrawer.bind(this)} />

          {this.getCurrentScreen()}

          <MainFooter onChangeScreen={this.changeScreen} />
        </Container>
      </Drawer>
    );
  }
}

class OnehOnedphoto extends React.Component {
  render() {
    return (
      <Root>
        <AppContainer />
      </Root>
    );
  }
}

AppRegistry.registerComponent('OnehOnedphoto', () => OnehOnedphoto);