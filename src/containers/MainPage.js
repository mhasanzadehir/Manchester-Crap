import React, {Component} from 'react';
import {parseInitializer} from "../init/parsInit";
import {connect} from 'react-redux'
import {addUserToState} from "../actions";
import {bindActionCreators} from 'redux'
import {Redirect} from "react-router";


let Parse = parseInitializer();

class MainPage extends Component {
    constructor(props) {
        super(props);
        if(!this.props.user){
            window.open("/" , "_self");
        }
        this.state = {
            redirect: false
        };
        this.startGame = this.startGame.bind(this);
    }
    startGame(){
        this.setState({redirect: true});
    }

    render() {
        console.log(this.props.user);
        if (this.state.redirect) {
            return <Redirect push to="/GamePage" />;
        }
        return (
            <div>
                <p>Hi {this.props.user.get("username")}</p>
                <button onClick={this.startGame}>Play Mench</button>
            </div>
        )
    }
}


const Game = Parse.Object.extend("Game");
let query = new Parse.Query(Game);
let subscription = query.subscribe();

subscription.on('open', () => {
    console.log('subscription opened');
});

subscription.on('create', (object) => {
    console.log('object created');
    let query = new Parse.Query(Game);
    query.count({
        success: function (count) {
            // The count request succeeded. Show the count
            // alert(count + " Users now.");
        },
        error: function (error) {
            // alert(error)
            // The request failed
        }
    });
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

const mapStateToProps = function (state) {
    return {
        user: state.user
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        addUserToState
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);



