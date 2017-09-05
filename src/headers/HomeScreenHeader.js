import React, { Component } from 'react';
import {
  Header,
  Body,
  Title
} from 'native-base';

export default class HomeScreenHeader extends React.Component {
  render() {
    return (
      <Header>
        <Body>
          <Title>HomeScreen</Title>
        </Body>
      </Header>
    );
  }
}