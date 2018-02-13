import React, {Component} from 'react';
import {addUserToState} from "../actions";
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
import {APP_PRIMARY_COLOR} from "../constansts/AppDetail";
import {Avatar} from "material-ui";
import {getUser} from "../init/Parse";
import Background from "../images/map1.jpg"
import {divMainPage, gameMapDiv} from "../constansts/Styles";
import AvatarImage from "../components/AvatarImage";

let Parse = parseInitializer();
const Game = Parse.Object.extend("Game");
let query = new Parse.Query(Game);
let subscription;
let map = new Map();

let sectionStyle = {
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    height: "80%"
};
class GamePage extends Component {
    constructor(){
        super();
        this.state = {
            users: [],
            userIds: [],
            userPositions: [],
            userPlayStates: [],
        };
        this.throwTas = this.throwTas.bind(this);
        // map.set(0, {x: 35, y: 10});
        // map.set(1, {x: 35, y: 10});
        // map.set(2, {x: 35, y: 10});
        // map.set(3, {x: 35, y: 10});
        // map.set(4, {x: 35, y: 10});
        // map.set(5, {x: 35, y: 10});
        // map.set(6, {x: 35, y: 10});
        // map.set(7, {x: 35, y: 10});
        // map.set(8, {x: 35, y: 10});
        // map.set(9, {x: 35, y: 10});
        // map.set(10, {x: 35, y: 10});
        // map.set(11, {x: 35, y: 10});
        // map.set(12, {x: 50, y: 10});
        // map.set(13, {x: 35, y: 10});
        // map.set(14, {x: 35, y: 10});
        // map.set(15, {x: 35, y: 10});
        // map.set(16, {x: 35, y: 10});
        // map.set(17, {x: 35, y: 10});
        // map.set(18, {x: 60, y: 10});
        // map.set(19, {x: 35, y: 10});
        // map.set(20, {x: 35, y: 10});
        // map.set(21, {x: 35, y: 10});
        // map.set(22, {x: 35, y: 10});
        // map.set(23, {x: 35, y: 10});
        // map.set(24, {x: 35, y: 10});
        // map.set(25, {x: 35, y: 10});
        // map.set(26, {x: 35, y: 10});
        // map.set(27, {x: 35, y: 10});
        // map.set(28, {x: 35, y: 10});
        // map.set(29, {x: 35, y: 10});
        // map.set(30, {x: 35, y: 10});
        // map.set(31, {x: 35, y: 10});
        // map.set(32, {x: 35, y: 10});
        // map.set(33, {x: 35, y: 10});
        // map.set(34, {x: 35, y: 10});
        // map.set(35, {x: 35, y: 10});
        // map.set(36, {x: 35, y: 10});
        // map.set(37, {x: 35, y: 10});
        // map.set(38, {x: 35, y: 10});
        // map.set(39, {x: 35, y: 10});
        // map.set(40, {x: 35, y: 10});
        // map.set(41, {x: 35, y: 10});
        // map.set(42, {x: 35, y: 10});
    }

    componentDidMount(){
        console.log(this.props.gameId);
        query.equalTo(OBJECT_ID, this.props.gameId);
        query.first({
            success: (game) => {
                let users = [];
                let userIds = game.get(USER_IDS);
                for (let id of userIds) {
                    users.push(getUser(id));
                }
                this.setState({userIds : userIds, users : users, userPositions: game.get(USER_POSITIONS)})
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

    throwTas(rand){
        query.first({
            success: (game) => {
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
            <div style={Object.assign({}, divMainPage)}>
                <div style={Object.assign({} , gameMapDiv)}>
                    {this.state.users.map((item, i) => {
                        let userPosition = map.get(this.state.userPositions[i]);
                        let posX, posY = 0;
                        if (userPosition !== undefined) {
                             posX = userPosition['x'];
                             posY = userPosition['y'];
                        }
                        let avatarStyle = {
                            position: 'absolute',
                            left: posX + '%',
                            top: posY + '%'
                        };
                        return (<div style={avatarStyle}><AvatarImage user={item} /></div>)
                    })}
                </div>
                <div>
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
        addUserToState
    } , dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
