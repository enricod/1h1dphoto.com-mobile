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
        
        username:'',
        email:'',
       
      
        codeText: '',
        codeFromApi: '',
        insertCode : false
    }

    this.onSendData = this.onSendData.bind(this);
    this.onVerifyCode = this.onVerifyCode.bind(this);
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
            body: JSON.stringify({ username: this.state.username, email: this.state.email})
        })
        .then((response) => response.json())
        .then((responseJson) => {
            var _newUserKey = responseJson[0].body.userKey;
            console.log( _newUserKey);
            this.setState( {insertCode: true, codeFromApi: _newUserKey} );
            return responseJson[0].body;
        })
        .catch((error) => {
                console.error(error);
        });
  }



  onVerifyCode() {
    let res = this.state.codeText === this.state.codeFromApi;
    if (res) {
        this.props.saveUser( { username: this.state.username, 
            email: this.state.email,
            userkey: this.state.codeFromApi,
            isAnon: false});
    } else {
        setState( {codeVerification: false});
    }
  }

  render() {
      const codeVerification = this.state.codeVerification;
      let errorMsg = null;
      if (codeVerification) {
          errorMsg = <Label />
      } else {
        errorMsg = <Label>Codice errato</Label>
      }
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
                {errorMsg}
                <Button full onPress={this.onVerifyCode} 
                    accessibilityLabel="" ><Text>VERIFICA</Text></Button>
          
            </Content>
        )
    } else {
        return (
            <Content>
                <Form>
                    <Item inlineLabel>
                        <Label>Username</Label>
                        <Input  value={this.state.username} 
                                onChangeText={ (v) => this.setState(
                                    {username: v} ) }
                                />
                    </Item>
                    <Item inlineLabel last>
                        <Label>Email</Label>
                        <Input value={this.state.email} 
                            onChangeText={ (v) => this.setState(
                                 {   email: v }
                                 
                            )}
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


LoginScreen.propTypes = {
    saveUser: PropTypes.func
}