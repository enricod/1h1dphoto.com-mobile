import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container } from 'native-base';

import Config from 'react-native-config'

import MainHeader from './headers/MainHeader';
import MainFooter from './footers/MainFooter';

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
            userInstance: {}
        };

        // this.storage = new Storage();
        this.changeScreen = this.changeScreen.bind(this);
        this.saveLoginInfo = this.saveLoginInfo.bind(this);
        this.openEventViewer = this.openEventViewer.bind(this);
        this.getSummaryEventList = this.getSummaryEventList.bind(this);
        this.getEventById = this.getEventById.bind(this);
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
                <MainHeader navigation={navigation} screen={getNavigationParams()} />
            )
        };
    };

    /**
     * Save userInstance
     * @param {*} user 
     * @param {*} appToken 
     */
    saveLoginInfo(user, appToken) {
        var userInstance = {
            user: user,
            appToken: appToken
        }
        AsyncStorage.setItem('userInstance', JSON.stringify(userInstance));
        this.setState({ userInstance: userInstance, needRegistration: false, currentScreen: 'homeScreen' })
    }

    componentDidMount() {
        // Get logged user instance (model+appToken), if not present LoginComponent is displayed
        AsyncStorage.getItem('userInstance')
            .then((userInstance) => {
                if (userInstance) {
                    this.setState({ userInstance: JSON.parse(userInstance), needRegistration: false, currentScreen: 'homeScreen' })
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
            return <LoginScreen saveLoginInfo={this.saveLoginInfo} />
        } else {

            if (this.state.currentScreen) {
                let screenWithFooter = [];

                if (this.state.currentScreen === 'homeScreen') {
                    screenWithFooter.push(<HomeScreen key={'homeScreen'} userInstance={this.state.userInstance}
                        openEventViewer={this.openEventViewer} getSummaryEventList={this.getSummaryEventList} getEventById={this.getEventById} />);
                } else if (this.state.currentScreen === 'cameraScreen') {
                    screenWithFooter.push(<CameraScreen navigation={this.props.navigation} key={'cameraScreen'} userInstance={this.state.userInstance} />);
                } else if (this.state.currentScreen === 'profileScreen') {
                    screenWithFooter.push(<ProfileScreen key={'profileScreen'} userInstance={this.state.userInstance} />);
                }
                screenWithFooter.push(<MainFooter key={'footer'} onChangeScreen={this.changeScreen} />);
                return screenWithFooter;
            } else {
                return null;
            }
        }
    }

    changeScreen(screenName) {
        this.setState({ currentScreen: screenName });
        // Setta header in base allo screen
        this.props.navigation.setParams({
            currentScreen: screenName
        });
    }

    getSummaryEventList(callback) {
        let url = `${Config.SERVER_BASE_URL}/api/events/summary/list`;
        console.debug(url);

        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.state.userInstance.appToken
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    return callback(response.body.futureEvents, response.body.closedEvents);
                } else {
                    return callback([], []);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getEventById(id, callback) {
        let url = `${Config.SERVER_BASE_URL}/api/events/${id}`;
        console.debug(url);

        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.state.userInstance.appToken
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    return callback(response.body);
                } else {
                    return;
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    openEventViewer(eventId) {
        this.getEventById(eventId, event => {
            this.props.navigation.navigate('EventViewer', { event: event });
        });
    }

    render() {
        return (
            <Container padder>
                {this.getCurrentScreen()}
            </Container>
        );
    }
}