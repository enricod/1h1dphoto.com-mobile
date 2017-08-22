import React, { Component } from 'react';
import {
    Image
} from 'react-native';
import {
    Container,
    Content,
    Text,
    Button,
    Grid,
    Row
} from 'native-base';

export default class EventViewer extends Component {

    constructor(props) {
        super(props);
        this.event = this.props.navigation.state.params.event;
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.event.Name,
        };
    };
    render() {
        let photos = [];

        for (let i = 0; i < this.event.Submissions.length; i++) {
            photos.push(<Row><Image key={'eventImage' + i} source={{ uri: this.event.Submissions[i].ImageName }} style={{ height: 100, flex: 1 }}></Image></Row>);
        }
        return (
            <Container>
                <Content padder>
                    <Text>{this.event.Start}</Text>
                    <Text>{this.event.End}</Text>
                    <Grid>
                        {photos}
                    </Grid>
                </Content>
            </Container>
        );
    }
}