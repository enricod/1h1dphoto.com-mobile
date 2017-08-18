/**
 * OnehOnedphoto
 */
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container } from 'native-base';

import Config from 'react-native-config'

import MainHeader from './headers/MainHeader';
import MainFooter from './components/MainFooter';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import CameraScreen from './screens/CameraScreen';
import LoginScreen from './screens/LoginScreen';

/**
 * contiene stato globale applicazione - per ora informazioni 
 * su utente, se loggato o meno, e se loggato, l'UID da passare
 * al server
 */
export default class AppContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      needRegistration: false,
      isSignedIn: false,
      user: {}
    };

    // this.storage = new Storage();
    this.changeScreen = this.changeScreen.bind(this);
    this.saveLoginInfo = this.saveLoginInfo.bind(this);
    this.openPhotoViewer = this.openPhotoViewer.bind(this)
  }

  static navigationOptions = ({ navigation }) => {
    function getNavigationParams() {
      if (navigation.state.params && navigation.state.params.currentScreen) {
        return navigation.state.params.currentScreen
      } else {
        return null;
      }
    };
    return {
      title: navigation.state.currentScreen,
      header: (
        <MainHeader screen={getNavigationParams()} />
      )
    };
  };

  saveLoginInfo(user, token) {
    AsyncStorage.setItem('user', JSON.stringify(user));
    AsyncStorage.setItem('token', JSON.stringify(token));
    // Share token globallu
    global.token = token;
    this.setState({ user: user, token: token, needRegistration: false, isSignedIn: true, currentScreen: 'homeScreen' })
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
            this.props.navigation.setParams({
              currentScreen: 'homeScreen'
            });  
          })
        } else {
          this.setState({ needRegistration: true, currentScreen: 'loginScreen' })
          this.props.navigation.setParams({
            currentScreen: 'loginScreen'
          });
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
    let elements = [];
    if (this.state.needRegistration) {
      return <LoginScreen user={this.state.user} saveLoginInfo={this.saveLoginInfo} />
    } else if (this.state.isSignedIn) {
      if (this.state.currentScreen === 'homeScreen') {
        elements.push(<HomeScreen key={'homeScreen'} user={this.state.user} openPhotoViewer={this.openPhotoViewer} />);
      } else if (this.state.currentScreen === 'cameraScreen') {
        elements.push(<CameraScreen key={'cameraScreen'} user={this.state.user} />);
      } else if (this.state.currentScreen === 'profileScreen') {
        elements.push( <ProfileScreen key={'profileScreen'} user={this.state.user} />);
      }
      elements.push(<MainFooter key={'footer'} onChangeScreen={this.changeScreen} />);
      return elements;
    }
  }

  changeScreen(screenName) {
    this.setState({ currentScreen: screenName });
    // Setta header in base allo screen
    this.props.navigation.setParams({
      currentScreen: screenName
    });
  }

  openPhotoViewer(eventId) {
    this.props.navigation.navigate('EventPhotoViewer');
  }

  render() {
    return (
      <Container padder>
        {this.getCurrentScreen()}
      </Container>
    );
  }
}