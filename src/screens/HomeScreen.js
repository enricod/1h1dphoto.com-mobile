import React, { Component } from 'react';
import {
  View,
  Image,
  TextInput,
  AsyncStorage
} from 'react-native';
import {
  Content,
  Text,
  Button,
  Grid,
  Card,
  CardItem,
  Body,
  H1
} from 'native-base';

import PropTypes from 'prop-types';
import _ from 'lodash';
import Config from 'react-native-config'

import EventCard from '../components/EventCard.js';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = { events: [] }

  }

  componentDidMount() {
    return this.props.getEventList((events) => {
      this.setState({ events: events });
    });
  }

  render() {
    let eventsCard = [];

    // Attendo caricamento elenco eventi
    for (let i = 0; i < this.state.events.length; i++) {
      eventsCard.push(<EventCard key={i} event={this.state.events[i]} openEventViewer={this.props.openEventViewer} />);
    }

    return (
      <Content padder>

        <CurrentEventCard />
        {eventsCard}
      </Content>
    )
  }
}

class CurrentEventCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeEvent: false,
      nextEvent: 6900
    }
    this.selectEvent = this.selectEvent.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ nextEvent: this.state.nextEvent - 1 })
    },
      1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  selectEvent() {
    //this.props.onEventSelected(screens.cameraScreen);
  }

  render() {
    let toDisplay = null;

    if (this.state.activeEvent) {
      toDisplay = <Button onPress={this.selectEvent}><Text>GO!!!</Text></Button>
    } else {
      toDisplay = <H1>Next event: {this.state.nextEvent.toString()}</H1>
    }
    return (
      <Card>
        <CardItem>
          <Body>
            {toDisplay}
          </Body>
        </CardItem>
      </Card>
    );
  }
}

HomeScreen.PropTypes = {
  openEventViewer: PropTypes.func
}