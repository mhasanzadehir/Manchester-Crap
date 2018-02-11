import React, {Component} from 'react';
import {parseInitializer} from "../init/ParseInit";
import {connect} from 'react-redux'
import {addGameIdToState, addGameIndexToState, addUserToState} from "../actions";
import {bindActionCreators} from 'redux'
import {Redirect} from "react-router";
import {
    IS_PEND, USER_IDS, USER_PLAY_STATES, USER_POSITIONS
} from "../constansts/DBColumn";
import ProfileInfo from "../components/ProfileInfo";
import "../App.css"
import ReactLoading from 'react-loading';
import PlayerLeaderBoard from "../components/PlayerLeaderBoard";
import {FlatButton, Paper} from "material-ui";
import {APP_PRIMARY_COLOR} from "../constansts/AppDetail";
import {openGameFlatButtonLabelStyle} from "../constansts/Styles";


let Parse = parseInitializer();
const Game = Parse.Object.extend("Game");
const Player = Parse.Object.extend("Player");
let subscription;


class UserPage extends Component {
    constructor() {
        super();

        this.state = {
            user: null,
            gameId: null,
        };
        this.startGame = this.startGame.bind(this);
        this.hostGame = this.hostGame.bind(this);

        let query = new Parse.Query(Game);
        subscription = query.subscribe();
        subscription.on('update', (object) => {
            if (object.id === this.state.gameId) {
                this.setState({
                    // redirect: !object.get(IS_PEND),
                })
            }
        });

    }


    startGame() {
        let query = new Parse.Query(Game);
        query.equalTo(IS_PEND, true);
        query.first({
            success: (object) => {
                if (object) {
                    let ids = object.get(USER_IDS);
                    let positions = object.get(USER_POSITIONS);
                    let playStates = object.get(USER_PLAY_STATES);
                    ids.push(this.props.user.id);
                    positions.push(0);
                    playStates.push(true);
                    object.set(IS_PEND, false);
                    object.set(USER_IDS, ids);
                    object.set(USER_POSITIONS, positions);
                    object.set(USER_PLAY_STATES, playStates);
                    object.save();
                    this.props.addGameIdToState(object.id);
                    this.props.addGameIndexToState(ids.length-1);
                    alert("You joined");
                    window.open("/GamePage" , "_self");
                } else {
                    this.hostGame()
                }
            }
            ,
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }


    hostGame() {
        let game = new Game();
        game.set(USER_IDS, [this.props.user.id]);
        game.set(IS_PEND, true);
        game.set(USER_POSITIONS, [0]);
        game.set(USER_PLAY_STATES, [false]);
        game.save(null, {
            success: (game) => {
                this.props.addGameIdToState(game.id);
                this.props.addGameIndexToState(0);
                alert("You hosted");
                window.open("/GamePage", "_self");
            },
            error: function (gameScore, error) {
                alert('Failed to create new object, with error code: ' + error.message);
            }
        });
    }

    render() {
        return (
            <div style={{textAlign: "center", marginTop: "400px"}}>
                <FlatButton
                    onClick={() => {
                        this.startGame()
                    }}
                    style={{backgroundColor: APP_PRIMARY_COLOR}}
                    labelStyle={openGameFlatButtonLabelStyle}
                    label="Start Game"/>
            </div>
        )
    }
}

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
        addUserToState,
        addGameIdToState,
        addGameIndexToState
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);



