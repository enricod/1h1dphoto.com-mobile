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

import SummaryEventCard from '../components/SummaryEventCard.js';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { futureEvents: [], closedEvents: [] }
  }

  componentDidMount() {
    return this.props.getSummaryEventList((futureEvents, closedEvents) => {
      this.setState({ futureEvents: futureEvents, closedEvents: closedEvents });
    });
  }

  render() {
    let eventsCard = [];

    // Attendo caricamento elenco eventi
    for (let i = 0; i < this.state.closedEvents.length; i++) {
      eventsCard.push(<SummaryEventCard key={i} event={this.state.closedEvents[i]} openEventViewer={this.props.openEventViewer} />);
    }

    return (
      <Content padder>
        <CurrentEventCard futureEvents={this.state.futureEvents} />
        {eventsCard}
      </Content>
    )
  }
}

class CurrentEventCard extends Component {
  constructor(props) {
    super(props);

    
    this.state = {
      
      nextEvent: 6900
    }
    this.selectEvent = this.selectEvent.bind(this);
  }

  hasEventoAperto( futureEvents) {
    return !_.isUndefined(this.findEventoAperto(futureEvents));
  }
  findEventoAperto( futureEvents) {
    let now = new Date();
    return _.find( futureEvents, function(e ) {
        return new Date(e.Start) <= now && new Date(e.End) > now;
    });
  }
  componentDidMount() {
    //this.timer = setInterval(() => {
    //  this.setState({ nextEvent: this.state.nextEvent - 1 })
    //},
    //  1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  selectEvent() {
    //this.props.onEventSelected(screens.cameraScreen);
  }

  render() {
    let toDisplay = null;
    let futureEvent = this.findEventoAperto(this.props.futureEvents);
    if ( futureEvent ) {
      toDisplay = <Button onPress={this.selectEvent}><Text>{futureEvent.Name}</Text></Button>
    } else {
      toDisplay = <H1>Next event: boh</H1>
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