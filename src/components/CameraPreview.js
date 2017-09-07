import React, { Component } from 'react';
import {
    Container,
    Content,
    Text,
    Button
} from 'native-base';
import {
    Image,
    View,
    Dimensions
} from 'react-native';

import Config from 'react-native-config'

export default class CameraPreview extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'ImagePreview'
    };

    uploadFile(data) {
        let url = `${Config.SERVER_BASE_URL}/api/images/upload`;

        // Image uri and userInstance are passed as navigator params
        const imgUri = this.props.navigation.state.params.imageUri;
        const userInstance = this.props.navigation.state.params.userInstance.appToken;

        const file = {
            uri: imgUri,
            name: imgUri,
            type: 'image/jpg'
        }

        const body = new FormData()
        body.append('image', file)

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': userInstance
            },
            body
        }).then(response => response.json())
            .then(response => {
                if (response) {
                    // Return to previous screen
                    this.props.navigation.goBack();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const imgStyle = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
        }

        return (
            <Container>
                <Content>
                    <Button onPress={this.uploadFile.bind(this)}><Text>upload</Text></Button>
                    <Image source={{ uri: this.props.navigation.state.params.imageUri }} style={imgStyle} resizeMode="contain" />
                </Content>
            </Container>
        );
    }
}