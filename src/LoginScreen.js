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
            codeText: '',
            codeFromApi: '',
            insertCode: false,
            codeVerification: true
        }

        this.onSendData = this.onSendData.bind(this);
        this.onVerifyCode = this.onVerifyCode.bind(this);
    }

    onSendData() {
        let url = `${Config.SERVER_BASE_URL}/api/AppUsers/register`;
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
                    this.setState({ insertCode: true, codeFromApi: response.code, token: response.token });
                }
                return;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    onVerifyCode() {
        let res = this.state.codeText === this.state.codeFromApi;
        if (res) {

            // Save user and login token
            this.props.saveLoginInfo({
                username: this.state.username,
                email: this.state.email,
                code: this.state.codeFromApi,
                isAnon: false
            },
                this.state.token
            );
        } else {
            this.setState({ codeVerification: false });
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
                <Content padder>
                    <Form>
                        <Item inlineLabel>
                            <Label>Code</Label>
                            <Input value={this.state.codeText}
                                onChangeText={(v) => this.setState({ codeText: v })}
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
                        <Item inlineLabel>
                            <Label>Username</Label>
                            <Input value={this.state.username}
                                onChangeText={(v) => this.setState(
                                    { username: v })}
                            />
                        </Item>
                        <Item inlineLabel last>
                            <Label>Email</Label>
                            <Input value={this.state.email}
                                onChangeText={(v) => this.setState(
                                    { email: v }

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
    saveLoginInfo: PropTypes.func
}