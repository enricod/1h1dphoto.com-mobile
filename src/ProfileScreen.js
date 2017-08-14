import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';
import {
  Content,
  Text
} from 'native-base';
import PropTypes from 'prop-types';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <Content padder>
        <Text>Ciao ezio</Text>
      </Content>
    );
  }
}