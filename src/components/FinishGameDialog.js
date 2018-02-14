import React, {Component} from "react";
import {
    addHelpingUserToState, addSnackText, addUserToState, closeDialog, closeSnackText, setFetchUsersData,
    showDialog
} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addScoreToUser, getUsersForLeaderBoard, parseInitializer, parseSignIn} from "../init/Parse";
import {
    Avatar,
    DatePicker, Dialog, FlatButton, List, ListItem, RadioButton, RadioButtonGroup, RaisedButton,
    TextField
} from "material-ui";
import PlayerLeaderBoard from "./PlayerLeaderBoard";
import {FIRST_NAME, LAST_NAME, SCORE} from "../constansts/DBColumn";
import {FINISH_GAME_DIALOG, LEADER_BOARD_DIALOG, SHOW_PROFILE_DIALOG} from "../constansts/AppDetail";
import {buttonThemeColorStyle} from "../constansts/Styles";
import AvatarImage from "./AvatarImage";


class FinishGameDialog extends Component {
    constructor() {
        super();
        this.state = {isWon: false , flag: false};
        this.finishGameHandle = this.finishGameHandle.bind(this);

    }

    finishGameHandle() {
        if (this.state.isWon){
            addScoreToUser(this.props.user.id , 150, this.props.addSnackText);
        }else {
            addScoreToUser(this.props.user.id , 50 , this.props.addSnackText);
        }
        this.props.closeDialog();
        // window.open("/UserPage", "_self");
    }

    render() {
        console.log(this.props.helpingUser , this.props.user);
        if (!this.state.flag && this.props.helpingUser !== undefined && this.props.helpingUser !== null){
            this.setState({
                isWon: this.props.helpingUser.id === this.props.user.id,
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