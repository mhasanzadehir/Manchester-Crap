import React, {Component} from 'react';
import {parseInitializer} from "../init/parsInit";
import {connect} from 'react-redux'
import {addGameIdToState, addIsHomeToState, addUserToState} from "../actions";
import {bindActionCreators} from 'redux'
import {Redirect} from "react-router";
import {BIRTHDATE, CITY, FIRST_NAME, GENDER, LAST_NAME, PLAYER, USER, USER_HOME} from "../constansts/DBColumn";
import {USER_GUEST} from "../constansts/DBColumn";
import {IS_PEND} from "../constansts/DBColumn";
import {POSITION_HOME} from "../constansts/DBColumn";
import {POSITION_GUEST} from "../constansts/DBColumn";
import {IS_HOME_PLAYED} from "../constansts/DBColumn";
import {IS_GUEST_PLAYED} from "../constansts/DBColumn";
import ProfileInfo from "../components/ProfileInfo";
import "../App.css"


let Parse = parseInitializer();
const Game = Parse.Object.extend("Game");
const Player = Parse.Object.extend("Player");
let query = new Parse.Query(Game);

class MainPage extends Component {
    constructor(props) {
        super(props);
        if (!this.props.user) {
            window.open("/", "_self");
        }
        this.state = {
            redirect: false,
            showPopup: false,
        };
        this.startGame = this.startGame.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.joinGameSuccess = this.joinGameSuccess.bind(this);
        this.hostGame = this.hostGame.bind(this);
        this.hostGameSuccess = this.hostGameSuccess.bind(this);

    }

    startGame() {
        query.equalTo(IS_PEND, true);
        query.first({
            success: (object) => {
                if (object) {
                    this.joinGameSuccess(object)
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

    editProfile(){
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    joinGameSuccess(object) {
        object.set(IS_PEND, false);
        object.set(USER_GUEST, this.props.user);
        object.save();
        this.props.addGameIdToState(object.id);
        this.props.addIsHomeToState(false);
        alert("You joined");
        this.setState({redirect: true});
    }

    saveProfileInfo(state) {
        let user = this.props.user;
        let pQuery = new Parse.Query(Player);
        pQuery.equalTo(USER, user);
        pQuery.first({
            success: (object) => {
                object.set(FIRST_NAME, state.firstName);
                object.set(LAST_NAME, state.lastName);
                object.set(CITY, state.city);
                object.set(BIRTHDATE, state.birthDate);
                object.set(GENDER, state.gender);
                object.save();
            }
            ,
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });

        // object.set(IS_PEND, false);
        // object.set(USER_GUEST, this.props.user);
        // object.save();
        // this.props.addGameIdToState(object.id);
        // this.props.addIsHomeToState(false);
        // alert("You joined");
        // this.setState({redirect: true});
    }

    hostGame() {
        let game = new Game();
        game.set(USER_HOME, this.props.user);
        game.set(IS_PEND, true);
        game.set(POSITION_HOME, 0);
        game.set(POSITION_GUEST, 0);
        game.set(IS_HOME_PLAYED, false);
        game.set(IS_GUEST_PLAYED, true);

        game.save(null, {
            success:(game) => this.hostGameSuccess(game),
            error: function (gameScore, error) {
                alert('Failed to create new object, with error code: ' + error.message);
            }
        });
    }

    hostGameSuccess(game) {
        this.props.addGameIdToState(game.id);
        this.props.addIsHomeToState(true);
        alert("You hosted");
        this.setState({redirect: true});
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/GamePage"/>;
        }
        return (
            <div>
                <p>Hi {this.props.user.get("username")}</p>
                <button onClick={this.startGame}>Play Mench</button>
                <button onClick={this.editProfile}>Edit Your Profile</button>
                {this.state.showPopup ?
                    <Popup
                        text='Close Me'
                        closePopup={this.editProfile.bind(this)}>

                        <ProfileInfo player={this.props.user.get(PLAYER)} onSubmit={this.saveProfileInfo}/>

                    </Popup> : null}
            </div>
        )
    }
}

class Popup extends React.Component {
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    {this.props.children}
                    <button onClick={this.props.closePopup}>close me</button>
                </div>
            </div>
        );
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
        addIsHomeToState
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);



