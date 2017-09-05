import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Modal
} from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';

export default class PhotoViewer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal visible={true} transparent={true}>
                <ImageViewer imageUrls={this.props.photos}
                    onClick={this.props.closeModal}
                    onCancel={this.props.closeModal}
                    onRequestClose={this.props.closeModal}
                    index={this.props.imageArrayIndex} />
            </Modal>
        );
    }
}