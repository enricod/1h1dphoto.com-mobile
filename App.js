import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';

class Hello extends Component {
  render() {
    return (
      <div> ciao exio</div>
    )
  }
};


export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Header>
                    <Left>
                         <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Text>body</Text>
                    </Body>
                    <Right >
                        <Text>enrico</Text>
                      </Right>
                </Header>
        <Content>
        <Text>apri up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        </Content>
        <Footer>
                    <FooterTab>
                          <Button>
                              <Icon name="apps" />
                          </Button>
                          <Button>
                              <Icon name="camera" />
                          </Button>
                          <Button active>
                              <Icon active name="navigate" />
                          </Button>
                          <Button>
                              <Icon name="person" />
                          </Button>
                      </FooterTab>
                </Footer>
      </Container>
    );
  }
}

class Wrapper extends React.Component {
  state = { fontsAreLoaded: false };

  async componentWillMount() {
    await Exponent.Font.loadAsync({
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
    });
    this.setState({fontsAreLoaded: true});
  }

  render() {
    if (this.state.fontsAreLoaded)
      return <App/>;
    else
      return <Exponent.Components.AppLoading/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
