import React, { Component } from 'react';
import {
  Image
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
  }

  render() {
    let imgInRow = 3;
    let rows = Math.trunc(this.props.event.images.length / imgInRow);
    let chunks = _.chunk(this.props.event.images, imgInRow);
    let cardRows = [];

    for (var i = 0; i < rows; i++) {
      cardRows.push(<EventCardRow key={'eventCardRow' + i} images={chunks[i]} />);
    };

    return (
      <Card>
        <CardItem header>
          <Text>{this.props.event.name}</Text>
        </CardItem>
        <CardItem cardBody>
          <Grid>
            {cardRows}
          </Grid>
        </CardItem>
      </Card>
    )
  }
}

class EventCardRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let rowImages = [];
    this.props.images.forEach(function (image, i) {
      rowImages.push(<EventCardRowImage key={'eventCardRowImage' + i} uri={image.uri} />);
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
    return (
      <Col>
        <Image source={{uri:this.props.uri}} style={{ height: 100, width: null, flex: 1 }} />
      </Col>
    )
  }
}