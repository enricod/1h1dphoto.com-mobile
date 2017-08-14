import React, { Component } from 'react';
import {
  Text,
  Button,
  Container
} from 'native-base';

import { Content } from 'native-base';

export default class Sidebar extends Component {
  render() {
    return (
      <Container>
      <Content padder style={{ backgroundColor: '#FFFFFF' }}>
        <Button light><Text> Logout </Text></Button>
      </Content>
      </Container>
    );
  }
}

module.exports = Sidebar;
