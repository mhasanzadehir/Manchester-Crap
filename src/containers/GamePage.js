import React, {Component} from 'react';
import {addHelpingUserToState, addSnackText, addUserToState, showDialog} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {parseInitializer} from "../init/Parse";
import {
    IS_END, OBJECT_ID, USER_IDS,
    USER_PLAY_STATES,
    USER_POSITIONS, WINNER
} from "../constansts/DBColumn";
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'
import {APP_PRIMARY_COLOR, FINISH_GAME_DIALOG, SHOW_PROFILE_DIALOG} from "../constansts/AppDetail";
import {Avatar, List, ListItem} from "material-ui";
import {getUser} from "../init/Parse";
import {
    diceDiv, divGamePage, divMainPageBlurBackground, gameDetailDiv,
    gameMapDiv
} from "../constansts/Styles";
import AvatarImage from "../components/AvatarImage";
import {mapDetail} from "../constansts/MapDetail";
import FinishGameDialog from "../components/FinishGameDialog";

let Parse = parseInitializer();
const Game = Parse.Object.extend("Game");
let query = new Parse.Query(Game);
let subscription;
let gameMap = mapDetail.gameMap;
let snakeMap = mapDetail.snakeMap;
let ladderMap = mapDetail.ladderMap;

class GamePage extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            userIds: [],
            userPositions: [],
            userPlayStates: [],
            diceFlag: false,
            diceColor: APP_PRIMARY_COLOR,
            isEnd: false,
            winner: null,
        };
        this.throwTas = this.throwTas.bind(this);
        this.findTurnIndex = this.findTurnIndex.bind(this);
        GamePage.checkGamePlayer = GamePage.checkGamePlayer.bind(this);
    }

    componentDidMount() {
        query.equalTo(OBJECT_ID, this.props.gameId);
        query.first({
            success: (game) => {
                let users = [];
                let userIds = game.get(USER_IDS);
                for (let id of userIds) {
                    users.push(getUser(id));
                }
                this.setState({
                    userIds: userIds,
                    users: users,
                    userPositions: game.get(USER_POSITIONS),
                    userPlayStates: game.get(USER_PLAY_STATES),
                    isEnd: game.get(IS_END),
                })
            }
            ,
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
        subscription = query.subscribe();
        subscription.on('update', (object) => {
            // console.log(object.get(USER_PLAY_STATES));
            this.setState({
                userPositions: object.get(USER_POSITIONS),
                userPlayStates: object.get(USER_PLAY_STATES),
                isEnd: object.get(IS_END),
            })
        });
    }

    static checkGamePlayer(positions, index) {
        let newPositions = [];
        for (let i = 0; i < positions.length; i++) {
            if (positions[i] === positions[index] && i !== index) {
                if (this.state.users[index] !== undefined
                    && this.state.users[index].username !== "Bot") {
                    if (this.props.index === i)
                        this.props.addSnackText("Ops go first of map you kicked by " + this.state.users[index].username);
                    else {
                        this.props.addSnackText("You kicked " + this.state.users[i].username)
                    }
                }
                newPositions.push(0);
            } else {
                newPositions.push(positions[i]);
            }
        }
        // console.log(positions);
        // console.log(newPositions);
        return newPositions;
    }

    throwTas(rand, index = this.props.index) {
        if (!this.state.diceFlag) {
            this.setState({diceFlag: true});
            return;
        }
        // console.log("DICE IS ROLLING");
        query.first({
            success: (game) => {
                let positions = game.get(USER_POSITIONS);
                let playStates = game.get(USER_PLAY_STATES);
                // console.log(positions, positions[index], rand);
                if (positions[index] + rand <= 51) {
                    positions[index] += rand;
                    if (positions[index] === 51) {
                        this.setState({winner: this.state.user[index]});
                        game.set(WINNER, this.state.users[index].id);
                        game.set(IS_END, true);
                    }
                    positions = GamePage.checkGamePlayer(positions, index);
                }
                game.set(USER_POSITIONS, positions);
                if (snakeMap.get(positions[index]) !== undefined) {
                    positions[index] = snakeMap.get(positions[index])
                }
                if (ladderMap.get(positions[index]) !== undefined) {
                    positions[index] = ladderMap.get(positions[index])
                }
                if (rand !== 6) {
                    playStates[index] = true;
                    playStates[(index + 1) % playStates.length] = false;
                }
                else if (this.state.users[index] !== undefined
                    && this.state.users[index].username !== "Bot") {
                    this.props.addSnackText("You are good please toss again")
                }
                game.set(USER_PLAY_STATES, playStates);
                game.save();
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }

    findTurnIndex() {
        for (let i = 0; i < this.state.userPlayStates.length; i++) {
            if (this.state.userPlayStates[i] === false)
                return i;
        }
        return -1;
    }

    render() {
        if (this.state.isEnd) {
            this.props.showDialog(FINISH_GAME_DIALOG);
        }
        let playerUser = this.state.users[this.findTurnIndex()];
        if (this.props.index === 0 && playerUser !== undefined && playerUser.username === "Bot") {
            setTimeout(() => {
                this.throwTas(Math.floor(Math.random() * 6 + 1), this.findTurnIndex());
            }, 2000);
        }
        return (
            <div style={Object.assign({}, divGamePage)}>
                <div style={Object.assign({}, divMainPageBlurBackground(40))}/>
                <div style={Object.assign({}, gameMapDiv)}>
                    {this.state.users.map((item, i) => {
                        let userPosition = gameMap.get(this.state.userPositions[i]);
                        let posX, posY = 0;
                        if (userPosition !== undefined) {
                            posX = userPosition['x'] / 12.75;
                            posY = userPosition['y'] / 8.43;
                        }
                        let avatarStyle = {
                            position: 'absolute',
                            left: posX + '%',
                            top: posY + '%'
                        };
                        return (<div style={avatarStyle}><AvatarImage size={50} user={item}/></div>)
                    })}
                </div>
                <div style={Object.assign({}, gameDetailDiv)}>
                    <List>
                        {this.state.users.map((item, i) => {
                            if (item.avatar != null) {
                                return <ListItem onClick={() => {
                                    this.props.addHelpingUserToState(item);
                                    this.props.showDialog(SHOW_PROFILE_DIALOG)
                                }}
                                                 leftAvatar={<Avatar size={50} src={item.avatar._url}/>}
                                                 primaryText={item.firstName + " " + item.lastName}
                                                 secondaryText={item.score}
                                />
                            }
                        })}
                    </List>
                </div>
                <div style={Object.assign({}, diceDiv)}>
                    <ReactDice
                        numDice={1}
                        rollDone={this.throwTas}
                        faceColor={!this.state.userPlayStates[this.props.index] ?
                            APP_PRIMARY_COLOR :
                            "#eea865"}
                        dotColor={'white'}
                        disableIndividual={this.state.userPlayStates[this.props.index]}
                    />
                </div>
                <FinishGameDialog/>
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
        addUserToState,
        addHelpingUserToState,
        showDialog,
        addSnackText,
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
