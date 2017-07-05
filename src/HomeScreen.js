import React, { Component } from 'react';
import {
  View,
  Image,
  TextInput
} from 'react-native';
import {
  Text,
  Button,
  Grid,
  Card,
  CardItem,
  H1
} from 'native-base';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Config from 'react-native-config'

import LoginScreen from './LoginScreen.js';
import EventCard from './EventCard.js';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = { events: [] }

    this.getEventList = this.getEventList.bind(this);
  }

  componentDidMount() {
    this.getEventList();
  }

  getEventList() {
    let url = `${Config.SERVER_BASE_URL}/events?withimages=true`;
    console.log(url);

    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        response.json()
      })
      .then((responseJson) => {
        this.setState({ events: responseJson[0].body.events });
        return responseJson[0].body;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const isAnon = this.props.user.isAnon;
    let eventsCard = [];

    if (isAnon) {
      return (<LoginScreen saveUser={this.props.saveUser} />);
    } else {
      this.state.events.forEach(function (event, i) {
        eventsCard.push(<EventCard key={i} event={event} />);
      });
      return (
        <View>
          <CurrentEventCard />
          <View>
            {eventsCard}
          </View>
        </View>
      )
    }
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
  user: PropTypes.object,
  saveUser: PropTypes.func
}