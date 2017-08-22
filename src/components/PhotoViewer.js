import React, { Component } from 'react';

import {
    Container,
    Content,
    Text,
    Button,
    Image
} from 'native-base';

export default class PhotoViewer extends Component {

    constructor(props) {
        super(props);
        this.event = navigation.state.params.event;
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: this.event.Name,
        };
    };
    render() {
        return (
            <Container>
                <Content padder>
                    <Text>{this.event.Name}</Text>
                    <Text>{this.event.Start}</Text>
                </Content>
            </Container>
        );
    }
}