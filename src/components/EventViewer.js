import React, { Component } from 'react';
import {
    Image,
    TouchableOpacity,
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

import Config from 'react-native-config'
import ImageViewer from 'react-native-image-zoom-viewer';

import PhotoViewer from './PhotoViewer';
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
                <EventViewerContainer photos={this.state.photos} openPhotoViewer={this.openPhotoViewer} />
            </Content>
        }

        return (
            <Container>
                {componentsToDisplay}
            </Container>
        );
    }
}

class EventViewerContainer extends Component {
    constructor(props) {
        super(props);

        this.openPhotoViewer = this.props.openPhotoViewer.bind(this);
        this.imgSize = (Dimensions.get('window').width / 3);
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
                renderItem={({ item, index }) => (<EventViewerImage photo={item} onPressItem={() => this._onPressItem(index)} size={this.imgSize} />)}
                numColumns={3}
                initialNumToRender={9}
                getItemLayout={(data, index) => (
                    { length: this.imgSize, offset: this.imgSize * index, index }
                )}
            />
        )
    }
}

/**
 * Single image component
 * Extend "React.PureComponent" instead of "Component" for performance issue with Component
 */
class EventViewerImage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let imgStyle = {
            alignSelf: 'stretch',
            height: this.props.size,
            width: this.props.size,
            flex: 1
        };

        return (
            <View>
                <TouchableOpacity key={'eventImageTouchable' + this.props.photo.ID} onPress={this.props.onPressItem} underlayColor="white">
                    <Image source={{ uri: Config.SERVER_BASE_URL + this.props.photo.ThumbUrl }} style={imgStyle} resizeMode="contain" />
                </TouchableOpacity>
            </View>
        )
    }
}