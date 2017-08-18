import React, { Component } from 'react';

import {
    Container,
    Content,
    Text,
    Button
} from 'native-base';

export default class EventPhotoViewer extends Component {
    static navigationOptions = {
        title: 'Evento XXX',
    };
    render() {
        return (
            <Container>
                <Content padder>
                    <Text>fotiiiii!!!!!</Text>
                </Content>
            </Container>
        );
    }
}