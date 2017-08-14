import React, { Component } from 'react';
import {
    Footer,
    FooterTab,
    Button,
    Icon,
    Text
} from 'native-base';

export default class MainFooter extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }
    onChange(screen) {
        this.props.onChangeScreen(screen);
    }
    render() {
        return (
            <Footer>
                <FooterTab>
                    <FooterBtn onChange={this.onChange} title='Home' screen='homeScreen' icon='navigate' />
                    <FooterBtn onChange={this.onChange} title='Camera' screen='cameraScreen' icon='camera' />
                    <FooterBtn onChange={this.onChange} title='My photos' screen='profileScreen' icon='person' />
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
            <Button onPress={this.onChange} >
                <Icon name={this.props.icon} />
                <Text>{this.props.title}</Text>
            </Button>
        );
    }
}