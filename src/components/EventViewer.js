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
        this.state = {
            showPhotos: false,
            event: this.props.navigation.state.params.event
        }
        this.openPhotoViewer = this.openPhotoViewer.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.event.Name,
        };
    };

    openPhotoViewer() {
        this.setState({ showPhotos: true })
    }

    closeModal() {
        this.setState({ showPhotos: false })
    }

    render() {
        let componentsToDisplay = null;

        if (this.state.showPhotos) {
            let photos = [];
            for (let i = 0; i < this.state.event.Submissions.length; i++) {
                photos.push({ url: this.state.event.Submissions[i].ImageName });
            }
            componentsToDisplay = <PhotoViewer closeModal={this.closeModal} photos={photos}/>;
        } else {

            let photos = [];
            for (let i = 0; i < this.state.event.Submissions.length; i++) {
                photos.push(<Row><Image key={'eventImage' + i} source={{ uri: this.state.event.Submissions[i].ImageName }} style={{ height: 100, flex: 1 }}></Image></Row>);
            }

            componentsToDisplay = <Content padder>
                <Text>{this.state.event.Start}</Text>
                <Text>{this.state.event.End}</Text>
                <TouchableHighlight onPress={this.openPhotoViewer}>
                    <Grid>
                        {photos}

                    </Grid>
                </TouchableHighlight>
            </Content>
        }

        return (
            <Container>
                {componentsToDisplay}
            </Container>
        );
    }
}