import React, { Component } from 'react';
import {
  View,
  Image,
  TextInput
} from 'react-native';
import { Container,
  Header,
  Text,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Drawer,
  Grid,
  Col,
  Row,
  Card,
  CardItem,
  H1,
  H3
} from 'native-base';
import PropTypes from 'prop-types';
import _ from 'lodash';

import LoginScreen from './LoginScreen.js';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.events = [
        {
          'name': 'yesterday',
          'images': [
            {'uri': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT49_65zIuh_Ab-MBKyCYDcpn303Vvtpyd4acNvaZmeUFrkLtfmWw'},
            {'uri': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiIKCLeMCELmwVFMR9BruFAx09w5EJYtLIR6_dY_QTPZpPmF35'},
            {'uri': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfCBUQPslEo4gE-ubkbyb_BtdlgZmESU4rJH-Uet0Ey5GckP7V'},
            {'uri': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT49_65zIuh_Ab-MBKyCYDcpn303Vvtpyd4acNvaZmeUFrkLtfmWw'},
            {'uri': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiIKCLeMCELmwVFMR9BruFAx09w5EJYtLIR6_dY_QTPZpPmF35'},
            {'uri': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfCBUQPslEo4gE-ubkbyb_BtdlgZmESU4rJH-Uet0Ey5GckP7V'}
          ]
        },
        {
          'name': 'two days ago',
          'images': [
            {'uri': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT49_65zIuh_Ab-MBKyCYDcpn303Vvtpyd4acNvaZmeUFrkLtfmWw'},
            {'uri': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiIKCLeMCELmwVFMR9BruFAx09w5EJYtLIR6_dY_QTPZpPmF35'},
            {'uri': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfCBUQPslEo4gE-ubkbyb_BtdlgZmESU4rJH-Uet0Ey5GckP7V'},
            {'uri': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT49_65zIuh_Ab-MBKyCYDcpn303Vvtpyd4acNvaZmeUFrkLtfmWw'},
            {'uri': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiIKCLeMCELmwVFMR9BruFAx09w5EJYtLIR6_dY_QTPZpPmF35'},
            {'uri': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfCBUQPslEo4gE-ubkbyb_BtdlgZmESU4rJH-Uet0Ey5GckP7V'}
          ]
        }
      ]
    }

  render() {
    // FIXME: correggi login e reimplementa
    const isAnon = this.props.user.isAnon;
    let eventsCard = [];

    if (isAnon) {
      return (<LoginScreen saveUser={this.props.saveUser} />);
    } else {
      this.events.forEach(function(event, i) {
        eventsCard.push(<EventCard key = {i} event = {event} />);
      });
      return (
        <View>
          <HomeContestCard/>
          <View>
            {eventsCard}
          </View>
        </View>
      )
    }
  }
}

class EventCard extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    let imgInRow = 3;
    let rows =  Math.trunc(this.props.event.images.length / imgInRow);
    let chunks = _.chunk(this.props.event.images, imgInRow);
    let cardRows = [];

    for(var i=0; i<rows; i++) {
      console.log('row');
      cardRows.push(<EventCardRow key={'eventCardRow'+i} images={chunks[i]} />);
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

  render () {
    let rowImages = [];
    this.props.images.forEach(function(image, i) {
      console.log('colonnina img');
      rowImages.push(<EventCardRowImage key={'eventCardRowImage'+i} image={image} />);
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

  render () {
    return (
      <Col>
        <Image source={this.props.image} style={{height: 100, width: null, flex: 1}}/>
      </Col>
    )
  }
}

class HomeContestCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeContest: false,
      nextContest: 6900
    }
    this.selectContest = this.selectContest.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({nextContest: this.state.nextContest-1})
    },
    1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  selectContest() {
    //this.props.onContestSelected(screens.cameraScreen);
  }

  render() {
    let toDisplay = null;

    if (this.state.activeContest) {
      toDisplay = <Button onPress={this.selectContest}><Text>GO!!!</Text></Button>
    } else {
      toDisplay = <H1>Next contest: {this.state.nextContest.toString()}</H1>
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