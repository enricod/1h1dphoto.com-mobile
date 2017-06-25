import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native';
import PropTypes from 'prop-types';

class LoginScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      usernameText:'',
      emailText: ''
    }
  }

  onSendData() {

  }

  render() {
    return (
      <View>
        <Text>Please login</Text>
        <Text >Username </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 0}}
          onChangeText={(text) => this.setState({usernameText: text})}
          value={this.state.usernameText}
        />
        <Text >Email: </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 0}}
          onChangeText={(text) => this.setState({emailText: text})}
          value={this.state.emailText}
        />
        <Button onPress={this.onSendData} 
            title="Send" 
            accessibilityLabel="" />
      </View>
    );
  }
}
export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    const anon = this.props.user.isAnon;
    if (anon) {
      return (
        <LoginScreen />
      );
    } else {
      return (
        <Text>Welcome {this.props.user.username}</Text>
      );
    }
  }
}

HomeScreen.PropTypes = {
  user: PropTypes.object
}