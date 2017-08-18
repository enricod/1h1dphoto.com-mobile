/**
 * OnehOnedphoto
 */
import React, { Component } from 'react';

import { AppRegistry } from 'react-native';

import {
  Root,
  StyleProvider
} from 'native-base';

import { StackNavigator } from "react-navigation";

// 1h1dphoto components
import EventPhotoViewer from './src/components/EventPhotoViewer';
import AppContainer from './src/AppContainer';

// Theme
import getTheme from './native-base-theme/components';
import onehonedayphotoColor from './native-base-theme/variables/onehonedayphotoColor';

/**
 * Main component
 */
class OnehOnedphoto extends React.Component {
  render() {
    return (
      <StyleProvider style={getTheme(onehonedayphotoColor)}>
        <Root>
          <AppNavigator />
        </Root>
      </StyleProvider>
    );
  }
}

/**
 * Navigator
 */
export const AppNavigator = StackNavigator(
  {
    AppContainer: { screen: AppContainer },
    EventPhotoViewer: { screen: EventPhotoViewer }
  },
  {
    initialRouteName: "AppContainer"
  }
);

AppRegistry.registerComponent('OnehOnedphoto', () => OnehOnedphoto);