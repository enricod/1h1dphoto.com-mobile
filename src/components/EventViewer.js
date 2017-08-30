import React, { Component } from 'react';
import {
    Image,
    TouchableHighlight,
    Modal,
    View,
    Dimensions,
    FlatList
} from 'react-native';
import {
    Container,
    Content,
    Text,
    Button
} from 'native-base';

import PhotoViewer from './PhotoViewer';
import Config from 'react-native-config'
import ImageViewer from 'react-native-image-zoom-viewer';

import onehonedayphotoStyle from '../../native-base-theme/variables/onehonedayphotoStyle';

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

        // if a photo is pressed
        if (this.state.showPhotos) {
            let photosArray = [];
            for (let i = 0; i < this.state.photos.length; i++) {
                photosArray.push({ url: Config.SERVER_BASE_URL + this.state.photos[i].ImageUrl });
            }
            componentsToDisplay = <PhotoViewer closeModal={this.closeModal}
                photos={photosArray}
                imageArrayIndex={this.state.imageArrayIndex} />;
        } else {
            // display photos grid
            componentsToDisplay = <Content padder>
                <Text>Start: {this.state.event.Start}</Text>
                <Text>End: {this.state.event.End}</Text>
                <EventViewerRowContainer photos={this.state.photos} openPhotoViewer={this.openPhotoViewer} />
            </Content>
        }

        return (
            <Container>
                {componentsToDisplay}
            </Container>
        );
    }
}

class EventViewerRowContainer extends Component {
    constructor(props) {
        super(props);
        this.openPhotoViewer = this.props.openPhotoViewer.bind(this);
    }

    _keyExtractor = (item, index) => index

    _onPressItem = (id) => {
        this.openPhotoViewer(id);
    };

    render() {
        return (
            <FlatList
                data={this.props.photos}
                keyExtractor={this._keyExtractor}
                renderItem={({ item, index }) => (<EventViewerImage photo={item} onPressItem={() => this._onPressItem(index)} />)}
                numColumns={3}
                
            />
        )
    }
}

class EventViewerImage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const imgSquareSize = (Dimensions.get('window').width / 3);
        let imgStyle = {
            alignSelf: 'stretch',
            height: imgSquareSize,
            width: imgSquareSize,
            flex: 1
        };

        return (
            <View>
                <TouchableHighlight key={'eventImageTouchable' + this.props.photo.ID} onPress={this.props.onPressItem} underlayColor="white">
                    <Image source={{ uri: Config.SERVER_BASE_URL + this.props.photo.ThumbUrl }} style={imgStyle} resizeMode="contain" />
                </TouchableHighlight>
            </View>
        )
    }
}