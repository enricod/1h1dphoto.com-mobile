import React, { Component } from 'react';
import {
  Image,
  TouchableHighlight
} from 'react-native';
import {
  Text,
  Button,
  Grid,
  Col,
  Row,
  Card,
  CardItem
} from 'native-base';

import PropTypes from 'prop-types';
import _ from 'lodash';

export default class EventCard extends Component {
  constructor(props) {
    super(props);
    this.openEventViewer = this.openEventViewer.bind(this);
  }

  openEventViewer() {
    this.props.openEventViewer(this.props.event);
  }

  render() {
    let imgInRow = 3;
    let imgs = (this.props.event.Submissions.length < imgInRow) ? this.props.event.Submissions.length : imgInRow;
    let rows = Math.ceil(this.props.event.Submissions.length / imgInRow);
    let chunks = _.chunk(this.props.event.Submissions, imgInRow);
    let cardRows = [];

    for (var i = 0; i < rows; i++) {
      cardRows.push(<EventCardRow key={'eventCardRow' + i} photos={chunks[i]} />);
    };

    return (
      <TouchableHighlight onPress={this.openEventViewer} underlayColor="white">
        <Card>
          <CardItem header>
            <Text>{this.props.event.Name}</Text>
          </CardItem>
          <CardItem cardBody>
            <Grid>
              {cardRows}
            </Grid>
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
      rowImages.push(<EventCardRowImage key={'eventCardRowImage' + i} uri={photo.ImageName} />);
    });

    return (
      <Row>
        {rowImages}
      </Row>
    )
  }
}

class EventCardRowImage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.uri);
    return (
      <Col>
        <Image source={{ uri: this.props.uri }} style={{ height: 100, flex: 1 }} />
      </Col>
    )
  }
}