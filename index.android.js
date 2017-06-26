/**
 * OnehOnedphoto
 */

'use strict';

<script src="http://localhost:8097"></script>

import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  View,
  Image
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
  CardItem,
  Card,
  H1,
  H3
} from 'native-base';
import Camera from 'react-native-camera';

class CameraScreen extends React.Component {
  render() {
    return (
      <CameraComponent />
    );
  }
}

class HomeScreen extends React.Component {
  render() {
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
    );
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
    this.props.onContestSelected(screens.cameraScreen);
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

class ProfileScreen extends React.Component {
  render() {
    return (   
      <View>
        <Card>
          <CardItem>
            <H3> Last contest </H3>
          </CardItem>
        </Card>
      </View>
    );
  }
}

class MainHeader extends React.Component {
  render () {
    return (
      <Header>
        <Left>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>OnehOnedphoto</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

class CameraComponent extends Component {
  render() {
    return (
      <View style={styles.container} >
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Button onPress={this.takePicture.bind(this)}>
            <Text>CAPTURE</Text>
          </Button>
        </Camera>

      </View>
    );
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

class OnehOnedphoto extends React.Component {
  constructor() {
    super();
    this.state = {currentScreen: screens.homeScreen};
    this.changeScreen = this.changeScreen.bind(this);
  }

  getCurrentScreen() {
    return this.state.currentScreen;
  }

  changeScreen(screen) {
    // console.log(e);
    this.setState({currentScreen: screen});
  }

  render () {
   return (
      <Container>
        <MainHeader />
        <Content>
          {this.getCurrentScreen()}
        </Content>
        <MainFooter onChangeScreen = {this.changeScreen}/>
      </Container>
    );
  }
}

class MainFooter extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }
  onChange(screen) 
  {
      this.props.onChangeScreen(screen);
  }
  render () {
    return (
        <Footer>
          <FooterTab>
            <FooterBtn onChange = {this.onChange} title='Home' screen={screens.homeScreen} icon='navigate' />
            <FooterBtn onChange = {this.onChange} title='Camera' screen={screens.cameraScreen} icon='camera' />
            <FooterBtn onChange = {this.onChange} title='My photos' screen={screens.profileScreen} icon='person' />
          </FooterTab>
        </Footer>
    );
  }
}

class FooterBtn extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
      this.props.onChange(this.props.screen);
  } 
  
  render() {
    return (
      <Button onPress = {this.onChange} >
        <Icon name={this.props.icon} />
        <Text>{this.props.title}</Text>
      </Button>
    );
  }
}

const screens = {
  homeScreen: <HomeScreen/>,
  cameraScreen: <CameraScreen/>,
  profileScreen: <ProfileScreen/>
}

const styles = StyleSheet.create({
  container: {
    height: 500
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});


AppRegistry.registerComponent('OnehOnedphoto', () => OnehOnedphoto);
