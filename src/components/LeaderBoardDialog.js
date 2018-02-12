import React, {Component} from "react";
import {addSnackText, addUserToState, closeDialog, closeSnackText, setFetchUsersData, showDialog} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getUsersForLeaderBoard, parseInitializer} from "../init/Parse";
import {
    DatePicker, Dialog, FlatButton, List, ListItem, RadioButton, RadioButtonGroup, RaisedButton,
    TextField
} from "material-ui";
import PlayerLeaderBoard from "./PlayerLeaderBoard";
import {FIRST_NAME, LAST_NAME, SCORE} from "../constansts/DBColumn";
import {LEADER_BOARD_DIALOG} from "../constansts/AppDetail";
import {buttonThemeColorStyle} from "../constansts/Styles";
import AvatarImage from "./AvatarImage";

let Parse = parseInitializer();
const User = Parse.Object.extend("User");


class LeaderBoardDialog extends Component {
    constructor() {
        super();
        this.state = {
            users: null
        };
        this.setData = this.setData.bind(this);
    }

    setData(users) {
        this.setState({users: users})
    }


    render() {
        if (this.props.fetchUsersData) {
            getUsersForLeaderBoard(this.setData, this.props.addSnackText);
            this.props.setFetchUsersData(false);
        }
        if (this.state.users === undefined || this.state.users == null) {
            return null;
        }
        return (
            <Dialog
                contentStyle={{textAlign: "center", width: "350px"}}
                title="Leader Board"
                autoScrollBodyContent={true}
                modal={false}
                open={this.props.dialog === LEADER_BOARD_DIALOG}
                onRequestClose={() => {
                    this.props.closeDialog()
                }}
            >
                <List>
                    {this.state.users.map((item) => {
                        if (item.avatar != null) {
                            return <ListItem
                                leftAvatar={<AvatarImage user={item}/>}
                                primaryText={item.firstName + " " + item.lastName}
                                secondaryText={item.score}
                            />
                        }
                    })}
                </List>
            </Dialog>

        );
    }

}

const mapStateToProps = function (state) {
    return {
        dialog: state.pageStatus.dialog,
        user: state.user,
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
        setFetchUsersData: setFetchUsersData
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoardDialog);