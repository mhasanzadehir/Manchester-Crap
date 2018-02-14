import React, {Component} from 'react';
import {addHelpingUserToState, addUserToState, showDialog} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {parseInitializer} from "../init/Parse";
import {
    AVATAR, BIRTH_DATE, CITY, EMAIL, FIRST_NAME, GENDER, LAST_NAME, OBJECT_ID, SCORE, USER_IDS, USER_NAME,
    USER_PLAY_STATES,
    USER_POSITIONS
} from "../constansts/DBColumn";
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'
import {APP_PRIMARY_COLOR, SHOW_PROFILE_DIALOG} from "../constansts/AppDetail";
import {Avatar, List, ListItem} from "material-ui";
import {getUser} from "../init/Parse";
import Background from "../images/map1.jpg"
import {
    diceDiv, divGamePage, divMainPage, divMainPageBlurBackground, gameDetailDiv,
    gameMapDiv
} from "../constansts/Styles";
import AvatarImage from "../components/AvatarImage";

let Parse = parseInitializer();
const Game = Parse.Object.extend("Game");
let query = new Parse.Query(Game);
let subscription;
let gameMap = new Map();
let snakeMap = new Map();
let ladderMap = new Map();

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
        };
        this.throwTas = this.throwTas.bind(this);
        this.findTurnIndex = this.findTurnIndex.bind(this);
        const posStart = {x : 570, y : 698};
        const pos1 = {x : 430, y : 736};
        const pos2 = {x : 350, y : 755};
        const pos3 = {x : 268, y : 751};
        const pos4 = {x : 159, y : 707};
        const pos5 = {x : 176, y : 625};
        const pos6 = {x : 253, y : 581};
        const pos7 = {x : 350, y : 568};
        const pos8 = {x : 438, y : 568};
        const pos9 = {x : 528, y : 579};
        const pos10 = {x : 621, y : 595};
        const pos11 = {x : 705, y : 608};
        const pos12 = {x : 797, y : 612};
        const pos13 = {x : 887, y : 623};
        const pos14 = {x : 961, y : 623};
        const pos15 = {x : 1047, y : 608};
        const pos16 = {x : 1141, y : 577};
        const pos17 = {x : 1177, y : 501};
        const pos18 = {x : 1145, y : 430};
        const pos19 = {x : 1076, y : 392};
        const pos20 = {x : 998, y : 367};
        const pos21 = {x : 896, y : 360};
        const pos22 = {x : 809, y : 352};
        const pos23 = {x : 719, y : 365};
        const pos24 = {x : 642, y : 373};
        const pos25 = {x : 558, y : 369};
        const pos26 = {x : 486, y : 333};
        const pos27 = {x : 398, y : 300};
        const pos28 = {x : 312, y : 323};
        const pos29 = {x : 247, y : 279};
        const pos30 = {x : 300, y : 211};
        const pos31 = {x : 394, y : 209};
        const pos32 = {x : 495, y : 207};
        const pos33 = {x : 579, y : 222};
        const pos34 = {x : 654, y : 237};
        const pos35 = {x : 744, y : 253};
        const pos36 = {x : 826, y : 262};
        const pos37 = {x : 912, y : 270};
        const pos38 = {x : 990, y : 264};
        const pos39 = {x : 1053, y : 239};
        const pos40 = {x : 1095, y : 174};
        const pos41 = {x : 1082, y : 111};
        const pos42 = {x : 1034, y : 60};
        const pos43 = {x : 952, y : 35};
        const pos44 = {x : 849, y : 35};
        const pos45 = {x : 751, y : 35};
        const pos46 = {x : 625, y : 48};
        const pos47 = {x : 532, y : 56};
        const pos48 = {x : 436, y : 56};
        const pos49 = {x : 344, y : 62};
        const pos50 = {x : 256, y : 83};
        const posFinish = {x : 138, y : 90};
        const mapPositions = [
             posStart,
            pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8, pos9, pos10,
            pos11, pos12, pos13, pos14, pos15, pos16, pos17, pos18, pos19, pos20,
            pos21, pos22, pos23, pos24, pos25, pos26, pos27, pos28, pos29, pos30,
            pos31, pos32, pos33, pos34, pos35, pos36, pos37, pos38, pos39, pos40,
            pos41, pos42, pos43, pos44, pos45, pos46, pos47, pos48, pos49, pos50,
             posFinish
        ];

        snakeMap.set(29, 5);
        snakeMap.set(21, 13);
        snakeMap.set(41, 11);
        snakeMap.set(47, 34);

        ladderMap.set(10,24);
        ladderMap.set(19,39);
        ladderMap.set(35,45);

        for(let i = 0; i < mapPositions.length; i++) {
            gameMap.set(i, mapPositions[i]);
        }
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
                    userPlayStates: game.get(USER_PLAY_STATES)
                })
            }
            ,
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
        subscription = query.subscribe();
        subscription.on('update', (object) => {
            console.log(object.get(USER_PLAY_STATES));
            this.setState({
                userPositions: object.get(USER_POSITIONS),
                userPlayStates: object.get(USER_PLAY_STATES)
            })
        });
    }

    throwTas(rand , index = this.props.index) {
        if (!this.state.diceFlag) {
            this.setState({diceFlag: true});
            return;
        }
        console.log("DICE IS ROLLING");
        query.first({
            success: (game) => {
                let positions = game.get(USER_POSITIONS);
                let playStates = game.get(USER_PLAY_STATES);
                positions[index] += rand;
                if (snakeMap.get(positions[index]) !== undefined) {
                    positions[index] = snakeMap.get(positions[index])
                }
                if (ladderMap.get(positions[index]) !== undefined) {
                    positions[index] = ladderMap.get(positions[index])
                }
                playStates[index] = true;
                playStates[(index + 1) % playStates.length] = false;
                game.set(USER_POSITIONS, positions);
                game.set(USER_PLAY_STATES, playStates);
                game.save();
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }

    findTurnIndex() {
        for (let i = 0; i < this.state.userPlayStates.length ; i++){
            if (this.state.userPlayStates[i] === false)
                return i;
        }
        return -1;
    }

    render() {
        let playerUser = this.state.users[this.findTurnIndex()];
        if (this.props.index === 0 && playerUser !== undefined && playerUser.username === "Bot") {
            console.log("salam");
            setTimeout(() => {
                this.throwTas(Math.floor(Math.random()*6 + 1) , this.findTurnIndex());
                },2000);
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
                                    // secondaryText={item.score}
                                                 secondaryText={this.state.userPositions[i]}
                                />
                            }
                        })}
                    </List>
                </div>
                <div style={Object.assign({}, diceDiv)}>
                    <ReactDice
                        numDice={1}
                        rollDone={this.throwTas}
                        faceColor={!this.state.userPlayStates[this.props.index]?
                            APP_PRIMARY_COLOR:
                            "#eea865"}
                        dotColor={'white'}
                        disableIndividual={this.state.userPlayStates[this.props.index]}
                    />
                </div>
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
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
