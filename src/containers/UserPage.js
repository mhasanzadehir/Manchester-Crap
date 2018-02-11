import React, {Component} from 'react';
import {parseInitializer} from "../init/ParseInit";
import {connect} from 'react-redux'
import {addGameIdToState, addIsHomeToState, addUserToState} from "../actions";
import {bindActionCreators} from 'redux'
import {Redirect} from "react-router";
import {
    BIRTH_DATE, CITY, FIRST_NAME, GENDER, LAST_NAME, OBJECT_ID, PLAYER, SCORE, USER, USER_HOME,
    USER_NAME
} from "../constansts/DBColumn";
import {USER_GUEST} from "../constansts/DBColumn";
import {IS_PEND} from "../constansts/DBColumn";
import {POSITION_HOME} from "../constansts/DBColumn";
import {POSITION_GUEST} from "../constansts/DBColumn";
import {IS_HOME_PLAYED} from "../constansts/DBColumn";
import {IS_GUEST_PLAYED} from "../constansts/DBColumn";
import ProfileInfo from "../components/ProfileInfo";
import "../App.css"
import ReactLoading from 'react-loading';
import PlayerLeaderBoard from "../components/PlayerLeaderBoard";


let Parse = parseInitializer();
const Game = Parse.Object.extend("Game");
const Player = Parse.Object.extend("Player");
let subscription;



class MainPage extends Component {
    constructor() {
        super();
        // if (!this.props.user) {
        //     window.open("/", "_self");
        // }

        this.state = {
            player : null,
            redirect: false,
            showPopup: false,
            isLoading:false,
            gameId: null,
            leaderBoardPopUp : false,
            leaderBoardData : null
        };
        // this.setPlayerToState();
        this.startGame = this.startGame.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.hostGame = this.hostGame.bind(this);
        this.showLeaderBoard = this.showLeaderBoard.bind(this);

        let query = new Parse.Query(Game);
        subscription = query.subscribe();
        subscription.on('update', (object) => {
            if (object.id === this.state.gameId) {
                this.setState({
                    redirect: !object.get(IS_PEND),
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
                    object.set(IS_PEND, false);
                    object.set(USER_GUEST, this.props.user);
                    object.save();
                    this.props.addGameIdToState(object.id);
                    this.props.addIsHomeToState(false);
                    alert("You joined");


                    this.setState({redirect: true});
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

    showLeaderBoard() {
        let query = new Parse.Query(Player);
        query.descending(SCORE);
        query.find({
            success: (object) => {
                console.log(object);
                this.setState({ leaderBoardData: object, leaderBoardPopUp: !this.state.leaderBoardPopUp });
            }
            ,
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });

    }

    setPlayerToState() {
        let query = new Parse.Query(Player);
        query.equalTo(USER, this.props.user);
        query.first({
            success: (object) => {
                this.setState({
                    player: object
                });
            }
            ,
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
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
            success:(game) => {
                this.props.addGameIdToState(game.id);
                this.props.addIsHomeToState(true);
                this.setState({isLoading: true, gameId: game.id});
            },
            error: function (gameScore, error) {
                alert('Failed to create new object, with error code: ' + error.message);
            }
        });
    }


    render() {
        if (this.state.redirect) {
            return <Redirect push to="/GamePage"/>;
        }
        return (
            <div>
                <p>Hi {this.props.user.username}</p>
                <button onClick={this.startGame}>Play Mench</button>
                <button onClick={this.editProfile}>Edit Your Profile</button>
                <button onClick={this.showLeaderBoard}>Leader Board</button>
                {this.state.isLoading?<ReactLoading type="spinningBubbles" color="black"/>:null}
                {this.state.showPopup ?
                    <Popup
                        text='Close Me'
                        closePopup={this.editProfile.bind(this)}>
                        <ProfileInfo player={this.state.player} onSubmit={this.saveProfileInfo}/>

                    </Popup> : null}

                {this.state.leaderBoardPopUp ?
                    <Popup
                        text='Close Me'
                        closePopup={this.showLeaderBoard.bind(this)}>
                        <PlayerLeaderBoard players={this.state.leaderBoardData}/>
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



