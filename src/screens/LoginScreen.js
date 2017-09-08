import React, { Component } from 'react';
import {
    View,
    Image,
    TextInput
} from 'react-native';
import {
    Content,
    Text,
    Button,
    Form,
    Input,
    Item,
    Label
} from 'native-base';
import PropTypes from 'prop-types';
import Config from 'react-native-config'

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            validationCode: '',
            insertCode: false,
            codeVerification: true
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
            body: JSON.stringify({ username: this.state.username, email: this.state.email })
        })
            .then(response => response.json())
            .then(response => {
                if (!!response) {
                    console.log(response.code);
                    this.setState({ insertCode: true, appToken: response.body.appToken });
                }
                return;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    onVerifyCode() {

        let url = `${Config.SERVER_BASE_URL}/users/codeValidation`;
        console.log(url);

        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ validationCode: this.state.validationCode, appToken: this.state.appToken })
        })
            .then(response => response.json())
            .then(response => {
                if (!!response && response.success) {
                    console.log(response.code);
                    // Save user and login token
                    this.props.saveLoginInfo({
                        username: this.state.username,
                        email: this.state.email,
                        code: this.state.validationCode
                    },
                        this.state.appToken
                    );
                } else {
                    this.setState({ codeVerification: false });
                }
            }).catch((error) => {
                console.error(error);
            });
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
                <Content padder>
                    <Form>
                        <Item stackedLabel>
                            <Label>Code</Label>
                            <Input
                                onChangeText={(v) => this.setState({ validationCode: v })}
                            />
                        </Item>
                    </Form>
                    {errorMsg}
                    <Button full onPress={this.onVerifyCode}
                        accessibilityLabel="" ><Text>VERIFICA</Text>
                    </Button>
                </Content>
            )
        } else {
            return (
                <Content padder>
                    <Form>
                        <Item stackedLabel>
                            <Label>Username</Label>
                            <Input value={this.state.username}
                                onChangeText={(v) => this.setState(
                                    { username: v })} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Email</Label>
                            <Input value={this.state.email}
                                onChangeText={(v) => this.setState(
                                    { email: v } )}  />
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
    saveLoginInfo: PropTypes.func
}