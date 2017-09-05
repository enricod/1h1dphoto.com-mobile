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
import EventViewer from './src/components/EventViewer';
import AppContainer from './src/AppContainer';

// Theme
import getTheme from './native-base-theme/components';
import onehonedayphotoStyle from './native-base-theme/variables/onehonedayphotoStyle';

/**
 * Main component
 */
class OnehOnedphoto extends React.Component {
  render() {
    return (
      <StyleProvider style={getTheme(onehonedayphotoStyle)}>
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
    EventViewer: { screen: EventViewer }
  },
  {
    initialRouteName: "AppContainer"
  }
);

AppRegistry.registerComponent('OnehOnedphoto', () => OnehOnedphoto);