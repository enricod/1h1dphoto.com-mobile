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
    if (this.props.screen === 'loginScreen') {
      headerByScreen = <LoginScreenHeader />;
    } else if (this.props.screen === 'cameraScreen') {
      headerByScreen = <CameraScreenHeader />;
    } else if (this.props.screen === 'homeScreen') {
      headerByScreen = <HomeScreenHeader />;
    } else if (this.props.screen === 'profileScreen') {
      headerByScreen = <ProfileScreenHeader />;
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