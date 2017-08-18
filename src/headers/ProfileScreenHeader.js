import React, { Component } from 'react';
import {
  Header,
  Body,
  Title,
  Right,
  Button,
  Icon
} from 'native-base';

export default class ProfileScreenHeader extends React.Component {
  render() {
    return (
      <Header>
        <Body>
          <Title>ProfileScreen</Title>
        </Body>
        <Right>
        <Button transparent>
          <Icon name='md-options' />
        </Button>
      </Right>
      </Header>
    );
  }
}