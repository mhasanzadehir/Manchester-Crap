import React, {Component} from 'react';
import {addUserToState} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {parseInitializer} from "../init/ParseInit";
import {
    IS_GUEST_PLAYED, IS_HOME_PLAYED, POSITION_GUEST, POSITION_HOME, USER_GUEST,
    USER_HOME
} from "../constansts/DBColumn";
import {NotificationManager} from 'react-notifications';

let Parse = parseInitializer();
const Game = Parse.Object.extend("Game");
let query = new Parse.Query(Game);
let subscription;

class GamePage extends Component {
    constructor(){
        super();
        if(!this.props.user){
            window.open("/" , "_self");
        }
        this.state = {
            PositionHome: 0,
            PositionGuest: 0,
            IsPlayed: false,
            UserHome: '',
            UserGuest: ''
        };
        this.throwTas = this.throwTas.bind(this);

        query.equalTo("objectId", this.props.gameId);
        subscription = query.subscribe();
        subscription.on('update', (object) => {
            this.setState({
                PositionHome: object.get(POSITION_HOME),
                PositionGuest: object.get(POSITION_GUEST),
                IsPlayed: ((this.props.isHome) ? object.get(IS_HOME_PLAYED) : object.get(IS_GUEST_PLAYED)),
                UserHome: object.get(USER_HOME).get("username"),
                UserGuest: object.get(USER_GUEST).get("username")
            })
        });

    }


    throwTas(){
        query.first({
            success: (object) => {
                let rand = Math.floor((Math.random() * 6) + 1);
                if (this.props.isHome) {
                    object.set(POSITION_HOME , +object.get(POSITION_HOME) + rand);
                    object.set(IS_HOME_PLAYED, true);
                    object.set(IS_GUEST_PLAYED, false);
                } else {
                    object.set(POSITION_GUEST , +object.get(POSITION_GUEST) + rand);
                    object.set(IS_GUEST_PLAYED, true);
                    object.set(IS_HOME_PLAYED, false);
                }
                object.save();
            },
            error: function(error) {
                NotificationManager.error("Error: " + error.code + " " + error.message);
            }
        });
    }

    render() {
        return (
            <div>
                <h1 id={"home"}>{this.state.UserHome}  {this.state.PositionHome}</h1><br/>
                <h1 id={"guest"}>{this.state.UserGuest} {this.state.PositionGuest}</h1><br/>
                <button disabled={this.state.IsPlayed} onClick={this.throwTas}>Tas Bendaz</button>
            </div>
        );
    }

}


const mapStateToProps = function (state) {
    console.log(state);
    return {
        user: state.user,
        gameId: state.gameId,
        isHome: state.isHome
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        addUserToState
    } , dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
