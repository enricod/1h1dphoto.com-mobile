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

    saveLoginInfo(user, appToken) {
        AsyncStorage.setItem('user', JSON.stringify(user));
        AsyncStorage.setItem('appToken', JSON.stringify(appToken));
        // Share token globallu
        global.appToken = appToken;
        this.setState({ user: user, appToken: appToken, needRegistration: false, currentScreen: 'homeScreen' })
    }

    componentDidMount() {
        // Get user, if not present LoginComponent is displayed
        AsyncStorage.getItem('user')
            .then((user) => {
                if (user) {
                    this.props.navigation.setParams({
                        currentScreen: 'homeScreen'
                    });

                } else {
                    this.setState({ needRegistration: true, currentScreen: 'loginScreen' })
                    this.props.navigation.setParams({
                        currentScreen: 'loginScreen'
                    });
                }
            })
    }

    getCurrentScreen() {
        if (this.state.needRegistration) {
            return <LoginScreen user={this.state.user} saveLoginInfo={this.saveLoginInfo} />
        } else {
            let screenWithFooter = [];

            if (this.state.currentScreen === 'homeScreen') {
                screenWithFooter.push(<HomeScreen key={'homeScreen'} user={this.state.user} openPhotoViewer={this.openPhotoViewer} />);
            } else if (this.state.currentScreen === 'cameraScreen') {
                screenWithFooter.push(<CameraScreen key={'cameraScreen'} user={this.state.user} />);
            } else if (this.state.currentScreen === 'profileScreen') {
                screenWithFooter.push(<ProfileScreen key={'profileScreen'} user={this.state.user} />);
            }
            screenWithFooter.push(<MainFooter key={'footer'} onChangeScreen={this.changeScreen} />);
            return screenWithFooter;
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