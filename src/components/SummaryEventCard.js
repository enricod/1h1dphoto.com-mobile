import React, { Component } from 'react';
import {
  Image,
  TouchableHighlight,
  View,
  Dimensions
} from 'react-native';
import {
  Text,
  Button,
  Card,
  CardItem
} from 'native-base';

import PropTypes from 'prop-types';
import Config from 'react-native-config'
import _ from 'lodash';

import onehonedayphotoStyle from '../../native-base-theme/variables/onehonedayphotoStyle';

export default class SummaryEventCard extends Component {
  constructor(props) {
    super(props);
    this.openEventViewer = this.openEventViewer.bind(this);
  }

  openEventViewer() {
    this.props.openEventViewer(this.props.event.ID);
  }

  render() {

    // FIXME: delete this control and return submission = [] instead of null from the API
    if (this.props.event.Submissions === null) {
      return null;
    }

    let photos = this.props.event.Submissions;

    return (
      <TouchableHighlight onPress={this.openEventViewer} underlayColor="white">
        <Card>
          <CardItem header>
            <Text>{this.props.event.Name}</Text>
          </CardItem>
          <CardItem cardBody>
            <EventCardRow photos={photos} />
          </CardItem>
        </Card>
      </TouchableHighlight>
    )
  }
}

class EventCardRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let rowImages = [];
    this.props.photos.forEach(function (photo, i) {
      rowImages.push(<EventCardRowImage key={'eventCardRowImage' + i} uri={photo.ThumbUrl} />);
    });

    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {rowImages}
      </View>
    )
  }
}

class EventCardRowImage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let imgSquareSize = (Dimensions.get('window').width - onehonedayphotoStyle.contentPadding * 2) / 3;
    let imgStyle = {
      alignSelf: 'stretch',
      height: imgSquareSize,
      width: imgSquareSize,
      flex: 1
    };

    return (
      <View>
        <Image source={{ uri: Config.SERVER_BASE_URL + this.props.uri }} style={imgStyle} resizeMode="contain" />
      </View>
    )
  }
}