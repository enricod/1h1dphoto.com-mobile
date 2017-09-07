import React, { Component } from 'react';
import {
    Container,
    Content,
    Text,
    Button
} from 'native-base';
import { AsyncStorage } from 'react-native';

export default class SettingsPage extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Settings'
    };

    logout() {
        const navigation = this.props.navigation;
        AsyncStorage.removeItem('userInstance', () => {
            navigation.navigate('AppContainer');
        });
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Button onPress={this.logout.bind(this)}>
                        <Text>Logout</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}