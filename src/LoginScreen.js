import React, { Component } from 'react';
import {
  View,
  Image,
  TextInput
} from 'react-native';
import { 
  Text,
  Button,
  Form,
  Input,
  Item,
  Label,
  Content
} from 'native-base';
import PropTypes from 'prop-types';





export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      usernameText:'enricod',
      emailText: '',
      codeText: '12345',
      insertCode : false
    }

    this.onSendData = this.onSendData.bind(this);
    this.onSendCode = this.onSendCode.bind(this);
  }

 

  onSendData() {
    this.setState( {insertCode: true} )
  }

  onSendCode() {
    this.setState( {insertCode: false} )
  }

  render() {
    if (this.state.insertCode) {
        return (
            <Content>
                <Form>
                    <Item inlineLabel>
                        <Label>Code</Label>
                        <Input value={this.state.codeText} 
                            onChangeText={ (v) => this.setState({ codeText: v })}
                        />
                    </Item>
                </Form>
                <Button full onPress={this.onSendCode} 
                    accessibilityLabel="" ><Text>SEND</Text></Button>
          
            </Content>
        )
    } else {
        return (
            <Content>
                <Form>
                    <Item inlineLabel>
                        <Label>Username</Label>
                        <Input  value={this.state.usernameText} 
                                onChangeText={ (v) => this.setState({ usernameText: v }) }
                                />
                    </Item>
                    <Item inlineLabel last>
                        <Label>Email</Label>
                        <Input value={this.state.emailText} 
                             onChangeText={ (v) => this.setState({ emailText: v }) }
                        />
                    </Item>
                </Form>
                <Button full onPress={this.onSendData} 
                            accessibilityLabel="" ><Text>SEND</Text></Button>
            </Content>
        );
    }
  }
}