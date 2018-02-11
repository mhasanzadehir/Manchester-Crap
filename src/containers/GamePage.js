import React, {Component} from 'react';
import {addUserToState} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {parseInitializer} from "../init/Parse";
import {NotificationManager} from 'react-notifications';
import {
    AVATAR, FIRST_NAME, LAST_NAME, OBJECT_ID, SCORE, USER_PLAY_STATES,
    USER_POSITIONS
} from "../constansts/DBColumn";

let Parse = parseInitializer();
const Game = Parse.Object.extend("Game");
let query = new Parse.Query(Game);
let subscription;

class GamePage extends Component {
    constructor(){
        super();
        this.state = {
            // users: [],
            // userIds: [],
            userPositions: [],
            userPlayStates: [],
        };
        this.throwTas = this.throwTas.bind(this);
    }

    componentDidMount(){
        console.log(this.props.gameId);
        query.equalTo(OBJECT_ID, this.props.gameId);
        subscription = query.subscribe();
        // query.unsubscribe()
        subscription.on('update', (object) => {
            this.setState({
                userPositions: object.get(USER_POSITIONS),
                userPlayStates: object.get(USER_PLAY_STATES)
            })
        });
    }


    throwTas(){
        query.first({
            success: (game) => {
                let rand = Math.floor((Math.random() * 6) + 1);
                let positions = game.get(USER_POSITIONS);
                let playStates = game.get(USER_PLAY_STATES);
                let index = this.props.index;
                positions[index] += rand;
                playStates[index] = true;
                playStates[(index+1) % playStates.length] = false;
                game.set(USER_POSITIONS , positions);
                game.set(USER_PLAY_STATES , playStates);
                game.save();
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }

    render() {
        return (
            <div>
                {this.state.userPositions.map(function(item, i){
                    return <h1 key={i}>{item}</h1>

                })}
                <button disabled={this.state.userPlayStates[this.props.index]} onClick={this.throwTas}>Tas Bendaz</button>
            </div>
        );
    }

}


const mapStateToProps = function (state) {
    return {
        user: state.user,
        gameId: state.game.gameId,
        index: state.game.index
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        addUserToState
    } , dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
