import React, {Component} from 'react';
import {parseInitializer} from "../init/parsInit";

var Parse = parseInitializer();

class MainPage extends Component {
    constructor() {
        super();
        this.state = {numOfOnlineUsers: 0}
    }

    render() {
        const {numOfOnlineUsers} = this.state;
        return (
            <div>
                <p>NumOfOnlineUser -> {numOfOnlineUsers}</p>
                <p onClick={this.onClick}>Click Me</p>
            </div>
        )
    }

    onClick(){

    }
}

var GameScore = Parse.Object.extend("Game");
let query = new Parse.Query(GameScore);
let subscription = query.subscribe();

subscription.on('open', () => {
    console.log('subscription opened');
});

subscription.on('create', (object) => {
    console.log('object created');
});

subscription.on('update', (object) => {
    console.log('object updated');
});

subscription.on('enter', (object) => {
    console.log('object entered');
});

subscription.on('leave', (object) => {
    console.log('object left');
});

subscription.on('close', () => {
    console.log('subscription closed');
});


subscription.on('delete', (object) => {
    console.log('object deleted');
});
Parse.LiveQuery.on('open', () => {
    console.log('socket connection established');
});

Parse.LiveQuery.on('close', () => {
    console.log('socket connection closed');
});

Parse.LiveQuery.on('error', (error) => {
    console.log(error);
});

export default MainPage;



