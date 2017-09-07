import React, { Component } from 'react';
import { Text } from 'native-base';
import { View } from 'react-native';

import CameraScreenHeader from './CameraScreenHeader';
import HomeScreenHeader from './HomeScreenHeader';
import LoginScreenHeader from './LoginScreenHeader';
import ProfileScreenHeader from './ProfileScreenHeader';

export default class MainHeader extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let headerByScreen;
    // navigation in props is needed by profileScreen to open settingsPage in the navigation
    if (this.props.screen === 'loginScreen') {
      headerByScreen = <LoginScreenHeader navigation={this.props.navigation}/>;
    } else if (this.props.screen === 'cameraScreen') {
      headerByScreen = <CameraScreenHeader navigation={this.props.navigation}/>;
    } else if (this.props.screen === 'homeScreen') {
      headerByScreen = <HomeScreenHeader navigation={this.props.navigation}/>;
    } else if (this.props.screen === 'profileScreen') {
      headerByScreen = <ProfileScreenHeader navigation={this.props.navigation}/>;
    } else {
      headerByScreen = null;
    }

    return (
      <View>
      {headerByScreen}
      </View>
    );
  }
}