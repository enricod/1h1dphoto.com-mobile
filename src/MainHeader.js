import React, { Component } from 'react';
import {
  Header,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Title
} from 'native-base';

export default class MainHeader extends React.Component {
  render() {
    return (
      <Header>
        <Left>
          <Button transparent onPress={() => this.props.openDrawer()} >
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>OnehOnedphoto</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}