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
import Config from 'react-native-config'




export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      usernameText:'enricod',
      emailText: '',
      codeText: '',
      codeFromApi: '',
      insertCode : false
    }

    this.onSendData = this.onSendData.bind(this);
    this.onSendCode = this.onSendCode.bind(this);
  }

 
  onSendData() {
      let url = `${Config.SERVER_BASE_URL}/users/register`;
      console.log(url);
      return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.usernameText,
                email: this.state.emailText,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            var _newUserKey = responseJson[0].body.userKey;
            
            this.setState( {insertCode: true, codeFromApi: _newUserKey} );
            return responseJson[0].body;
        })
        .catch((error) => {
                console.error(error);
        });
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