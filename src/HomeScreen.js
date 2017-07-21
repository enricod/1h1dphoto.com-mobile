import React, { Component } from 'react';
import {
  View,
  Image,
  TextInput,
  AsyncStorage
} from 'react-native';
import {
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

import EventCard from './EventCard.js';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = { events: [] }

    this.getEventList = this.getEventList.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.signin((token) => {
      this.props.saveToken({
        token: token
      });
      this.setState({ token: token })
      return this.getEventList();
    })
  }

  getEventList() {
    let url = `${Config.SERVER_BASE_URL}/api/Events?filter[include]=photo&filter[include]=user`;
    console.log(url);

    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.state.token.id
      }
    })
      .then(response => response.json())
      .then(response => {
        if (!!response) {
          this.setState({ events: response });
        }
        return;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  signin(cb) {
    let url = `${Config.SERVER_BASE_URL}/api/AppUsers/signin`;
    console.log(url);

    this.getUser((user) => {

      return fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: user.username, email: user.email })
      })
        .then((response) => response.json())
        .then(response => {
          if (!!response) {
            return cb(response.token);
          }
          return;
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  getUser(cb) {
    AsyncStorage.getItem('user', (err, result) => {
      return cb(JSON.parse(result));
    });
  }

  render() {
    let eventsCard = [];

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