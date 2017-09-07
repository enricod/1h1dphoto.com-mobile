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
  constructor(props) {
    super(props);
  }

  openSettingsPage() {
    this.props.navigation.navigate('SettingsPage');
  }

  render() {
    return (
      <Header>
        <Body>
          <Title>ProfileScreen</Title>
        </Body>
        <Right>
        <Button transparent onPress={this.openSettingsPage.bind(this)}>
          <Icon name='md-options' />
        </Button>
      </Right>
      </Header>
    );
  }
}