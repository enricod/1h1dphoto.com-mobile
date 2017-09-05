import React, { Component } from 'react';
import {
  Header,
  Body,
  Title
} from 'native-base';

export default class LoginScreenHeader extends React.Component {
  render() {
    return (
      <Header>
        <Body>
          <Title>Login</Title>
        </Body>
      </Header>
    );
  }
}