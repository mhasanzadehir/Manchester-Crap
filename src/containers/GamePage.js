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
let map = new Map();

class GamePage extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            userIds: [],
            userPositions: [],
            userPlayStates: [],
        };
        this.throwTas = this.throwTas.bind(this);

        const pos0 = {x : 595, y : 713};
        const pos1 = {x : 465, y : 755};
        const pos2 = {x : 384, y : 774};
        const pos3 = {x : 279, y : 778};
        const pos4 = {x : 197, y : 730};
        const pos5 = {x : 195, y : 654};
        const pos6 = {x : 293, y : 604};
        const pos7 = {x : 384, y : 604};
        const pos8 = {x : 472, y : 604};
        const pos9 = {x : 562, y : 610};
        const pos10 = {x : 644, y : 629};
        const pos11 = {x : 732, y : 635};
        const pos12 = {x : 824, y : 646};
        const pos13 = {x : 908, y : 646};
        const pos14 = {x : 992, y : 650};
        const pos15 = {x : 1082, y : 631};
        const pos16 = {x : 1181, y : 598};
        const pos17 = {x : 1231, y : 537};
        const pos18 = {x : 1181, y : 453};
        const pos19 = {x : 1107, y : 423};
        const pos20 = {x : 1017, y : 402};
        const mapPositions = {pos0, pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8, pos9, pos10,
            pos11, pos12, pos13, pos14, pos15, pos16, pos17, pos18, pos19, pos20};
        for(let i = 0; i <= mapPositions.size; i++){
            map.set(i, mapPositions[i]);
        }
    }

    componentDidMount() {
        console.log(this.props.gameId);
        query.equalTo(OBJECT_ID, this.props.gameId);
        query.first({
            success: (game) => {
                let users = [];
                let userIds = game.get(USER_IDS);
                for (let id of userIds) {
                    users.push(getUser(id));
                }
                this.setState({userIds: userIds, users: users, userPositions: game.get(USER_POSITIONS)})
            }
            ,
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
        subscription = query.subscribe();
        subscription.on('update', (object) => {
            this.setState({
                userPositions: object.get(USER_POSITIONS),
                userPlayStates: object.get(USER_PLAY_STATES)
            })
        });
    }

    throwTas(rand) {
        query.first({
            success: (game) => {
                let positions = game.get(USER_POSITIONS);
                let playStates = game.get(USER_PLAY_STATES);
                let index = this.props.index;
                positions[index] += rand;
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

    render() {
        return (
            <div style={Object.assign({}, divGamePage)}>
                <div style={Object.assign({}, divMainPageBlurBackground(40))}/>
                <div style={Object.assign({}, gameMapDiv)}>
                    {this.state.users.map((item, i) => {
                        console.log("Render Called!!! " + i);
                        let userPosition = map.get(this.state.userPositions[i]);
                        let posX, posY = 0;
                        if (userPosition !== undefined) {
                             posX = +userPosition['x'] / 12.75;
                             posY = +userPosition['y'] / 84.3;
                        }
                        let avatarStyle = {
                            position: 'absolute',
                            left: posX + '%',
                            top: posY + '%'
                        };
                        return (<div style={avatarStyle}><AvatarImage size={40} user={item}/></div>)
                    })}
                </div>
                <div style={Object.assign({}, gameDetailDiv)}>
                    <List>
                        {this.state.users.map((item , i) => {
                            if (item.avatar != null) {
                                return <ListItem onClick={() => {
                                    this.props.addHelpingUserToState(item);
                                    this.props.showDialog(SHOW_PROFILE_DIALOG)
                                }}
                                                 leftAvatar={<Avatar size={40} src={item.avatar._url}/>}
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
                        faceColor={APP_PRIMARY_COLOR}
                        dotColor={'white'}
                        ref={dice => this.reactDice = dice}
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
