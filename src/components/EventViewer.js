import React, { Component } from 'react';
import {
    Image,
    TouchableHighlight,
    Modal
} from 'react-native';
import {
    Container,
    Content,
    Text,
    Button,
    Grid,
    Row
} from 'native-base';

import PhotoViewer from './PhotoViewer';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class EventViewer extends Component {

    constructor(props) {
        super(props);
        this.event = this.props.navigation.state.params.event;
        this.state = {
            showPhotos: false,
            event: this.event,
            photos: this.event.Submissions
        }
        this.openPhotoViewer = this.openPhotoViewer.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.event.Name,
        };
    };

    openPhotoViewer(index) {
        this.setState({ showPhotos: true, imageArrayIndex: index })
    }

    closeModal() {
        this.setState({ showPhotos: false })
    }

    render() {
        let componentsToDisplay = null;

        if (this.state.showPhotos) {
            let photosArray = [];
            for (let i = 0; i < this.state.photos.length; i++) {
                photosArray.push({ url: this.state.photos[i].ImageName });
            }
            componentsToDisplay = <PhotoViewer closeModal={this.closeModal} 
            photos={photosArray} 
            imageArrayIndex={this.state.imageArrayIndex}/>;
        } else {

            let photosComponents = [];
            for (let i = 0; i < this.state.photos.length; i++) {
                photosComponents.push(
                    <TouchableHighlight onPress={() => this.openPhotoViewer(i)} underlayColor="white">
                        <Image key={'eventImage' + i} source={{ uri: this.state.photos[i].ImageName }} style={{ height: 100, flex: 1 }} ></Image>
                    </TouchableHighlight>
                );
            }

            componentsToDisplay = <Content padder>
                <Text>Start: {this.state.event.Start}</Text>
                <Text>End: {this.state.event.End}</Text>
                {photosComponents}
            </Content>
        }

        return (
            <Container>
                {componentsToDisplay}
            </Container>
        );
    }
}