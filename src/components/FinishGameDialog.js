import React, {Component} from "react";
import {
    addHelpingUserToState, addSnackText, addUserToState, closeDialog, closeSnackText, setFetchUsersData,
    showDialog
} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addScoreToUser, getUser, getUsersForLeaderBoard, parseInitializer, parseSignIn} from "../init/Parse";
import {
    Avatar,
    DatePicker, Dialog, FlatButton, List, ListItem, RadioButton, RadioButtonGroup, RaisedButton,
    TextField
} from "material-ui";
import PlayerLeaderBoard from "./PlayerLeaderBoard";
import {
    FIRST_NAME, IS_END, LAST_NAME, OBJECT_ID, SCORE, USER_IDS, USER_PLAY_STATES,
    USER_POSITIONS, WINNER
} from "../constansts/DBColumn";
import {FINISH_GAME_DIALOG, LEADER_BOARD_DIALOG, SHOW_PROFILE_DIALOG} from "../constansts/AppDetail";
import {buttonThemeColorStyle} from "../constansts/Styles";
import AvatarImage from "./AvatarImage";

let Parse = parseInitializer();
const Game = Parse.Object.extend("Game");
let query = new Parse.Query(Game);
let subscription;
class FinishGameDialog extends Component {
    constructor() {
        super();
        this.state = {winner: null , flag: false , isWon: false};
        this.finishGameHandle = this.finishGameHandle.bind(this);

    }
    componentDidMount() {
        query.equalTo(OBJECT_ID, this.props.gameId);
        subscription = query.subscribe();
        subscription.on('update', (object) => {
            // console.log(object.get(USER_PLAY_STATES));
            this.setState({
                winner: object.get(WINNER),
            })
        });
    }

    finishGameHandle() {
        if (this.state.isWon){
            addScoreToUser(this.props.user.id , 150, this.props.addSnackText);
        }else {
            addScoreToUser(this.props.user.id , 50 , this.props.addSnackText);
        }
        this.props.closeDialog();
        window.open("/UserPage", "_self");
    }

    render() {
        console.log(this.props.helpingUser , this.props.user);
        if (this.state.winner !== null){
            this.setState({
                isWon: this.state.winner === this.props.user.id,
                flag: true,
            });
        }
        return (
            <Dialog
                contentStyle={{textAlign: "center", width: "350px"}}
                title="The End"
                autoScrollBodyContent={true}
                modal={false}
                actions={
                    <div>
                        <RaisedButton
                            style={Object.assign({}, buttonThemeColorStyle)}
                            label="OK"
                            primary={true}
                            onClick={() => {
                                this.finishGameHandle();
                            }}
                        />
                    </div>
                }
                open={this.props.dialog === FINISH_GAME_DIALOG}
            >
                {this.state.isWon
                    ? <h3 style={{color: "green"}}>You won added 150 score</h3>
                    : <h3 style={{color: "red"}}>You lose added 50 score</h3>}
            </Dialog>

        );
    }

}

const mapStateToProps = function (state) {
    return {
        dialog: state.pageStatus.dialog,
        user: state.user,
        helpingUser: state.helpingUser,
        fetchUsersData: state.pageStatus.fetchUsersData,
        gameId: state.game.gameId,
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        addSnackText: addSnackText,
        closeSnackText: closeSnackText,
        showDialog: showDialog,
        closeDialog: closeDialog,
        addUserToState: addUserToState,
        setFetchUsersData: setFetchUsersData,
        addHelpingUserToState: addHelpingUserToState,
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(FinishGameDialog);