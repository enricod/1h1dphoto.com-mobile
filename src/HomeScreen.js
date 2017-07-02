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
import LoginScreen from './LoginScreen.js'


export default class HomeScreen extends React.Component {

 
  constructor(props) {
    super(props);

  }

  
  render() {
    const isAnon = this.props.user.isAnon;


   
      if (isAnon) {
           return (<LoginScreen saveUser={this.props.saveUser} />);
      }else {
        return (
        <View>
          <HomeContestCard/>
          <Card>
            <CardItem header>
              <Text> Last contest </Text>
            </CardItem>
            <CardItem cardBody>
              <Grid>
                <Row>
                  <Col>
                    <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNVvne0sQMrFBfuP3RJN0tKfC76suNiaMZPnnlqYB61DU7OgON'}} style={{height: 100, width: null, flex: 1}}/>
                  </Col>
                  <Col>
                    <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa1wsJLR9x9xoE934SDrL91wSP6-Ijs-GYVBQbr5Zt3AEqrRVrBg'}} style={{height: 100, width: null, flex: 1}}/>
                  </Col>
                  <Col>
                    <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-5HnKZc0mpGLF6L69lEAsqiWzBNSuzx4zHwAEmnlsBBPdkSz1eA'}} style={{height: 100, width: null, flex: 1}}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT49_65zIuh_Ab-MBKyCYDcpn303Vvtpyd4acNvaZmeUFrkLtfmWw'}} style={{height: 100, width: null, flex: 1}}/>
                  </Col>
                  <Col>
                    <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiIKCLeMCELmwVFMR9BruFAx09w5EJYtLIR6_dY_QTPZpPmF35'}} style={{height: 100, width: null, flex: 1}}/>
                  </Col>
                  <Col>
                    <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfCBUQPslEo4gE-ubkbyb_BtdlgZmESU4rJH-Uet0Ey5GckP7V'}} style={{height: 100, width: null, flex: 1}}/>
                  </Col>
                </Row>
              </Grid>
            </CardItem>
          </Card>

          <Card>    
            <CardItem header>
              <Text> Yesterday </Text>
            </CardItem>
            <CardItem cardBody>
              <Grid>
                <Row>
                  <Col>
                    <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNVvne0sQMrFBfuP3RJN0tKfC76suNiaMZPnnlqYB61DU7OgON'}} style={{height: 100, width: null, flex: 1}}/>
                  </Col>
                  <Col>
                    <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa1wsJLR9x9xoE934SDrL91wSP6-Ijs-GYVBQbr5Zt3AEqrRVrBg'}} style={{height: 100, width: null, flex: 1}}/>
                  </Col>
                  <Col>
                    <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-5HnKZc0mpGLF6L69lEAsqiWzBNSuzx4zHwAEmnlsBBPdkSz1eA'}} style={{height: 100, width: null, flex: 1}}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT49_65zIuh_Ab-MBKyCYDcpn303Vvtpyd4acNvaZmeUFrkLtfmWw'}} style={{height: 100, width: null, flex: 1}}/>
                  </Col>
                  <Col>
                    <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiIKCLeMCELmwVFMR9BruFAx09w5EJYtLIR6_dY_QTPZpPmF35'}} style={{height: 100, width: null, flex: 1}}/>
                  </Col>
                  <Col>
                    <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfCBUQPslEo4gE-ubkbyb_BtdlgZmESU4rJH-Uet0Ey5GckP7V'}} style={{height: 100, width: null, flex: 1}}/>
                  </Col>
                </Row>
              </Grid>
            </CardItem>
          </Card>
          
          <Card>
            <CardItem header>
              <Text> Two days ago </Text>
            </CardItem>
            <CardItem cardBody>
              <Grid>
                <Row>
                  <Col>
                    <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNVvne0sQMrFBfuP3RJN0tKfC76suNiaMZPnnlqYB61DU7OgON'}} style={{height: 100, width: null, flex: 1}}/>
                  </Col>
                  <Col>
                    <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa1wsJLR9x9xoE934SDrL91wSP6-Ijs-GYVBQbr5Zt3AEqrRVrBg'}} style={{height: 100, width: null, flex: 1}}/>
                  </Col>
                  <Col>
                    <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-5HnKZc0mpGLF6L69lEAsqiWzBNSuzx4zHwAEmnlsBBPdkSz1eA'}} style={{height: 100, width: null, flex: 1}}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT49_65zIuh_Ab-MBKyCYDcpn303Vvtpyd4acNvaZmeUFrkLtfmWw'}} style={{height: 100, width: null, flex: 1}}/>
                  </Col>
                  <Col>
                    <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiIKCLeMCELmwVFMR9BruFAx09w5EJYtLIR6_dY_QTPZpPmF35'}} style={{height: 100, width: null, flex: 1}}/>
                  </Col>
                  <Col>
                    <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfCBUQPslEo4gE-ubkbyb_BtdlgZmESU4rJH-Uet0Ey5GckP7V'}} style={{height: 100, width: null, flex: 1}}/>
                  </Col>
                </Row>
              </Grid>
            </CardItem>
          </Card>

        </View>
        )
      }
    
  }
}

HomeScreen.propTypes = {
    saveUser: PropTypes.func
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
  user: PropTypes.object
}