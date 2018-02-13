import React, {Component} from "react";
import {addSnackText, addUserToState, closeDialog, closeSnackText, showDialog, signIn} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getUser, parseSignIn} from "../init/Parse";
import {Avatar, Dialog, FlatButton, List, ListItem, RaisedButton, TextField} from "material-ui";
import {SHOW_PROFILE_DIALOG, SIGN_IN_DIALOG} from "../constansts/AppDetail";
import {buttonThemeColorStyle} from "../constansts/Styles";
import {AVATAR, FIRST_NAME, LAST_NAME, SCORE} from "../constansts/DBColumn";


class ShowProfileDialog extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <Dialog
                contentStyle={{textAlign: "center", width: "350px"}}
                title="Profile"
                autoScrollBodyContent={true}
                modal={false}
                open={this.props.dialog === SHOW_PROFILE_DIALOG}
                onRequestClose={() => {
                    this.props.closeDialog()
                }}
            >
                <List>
                    {this.props.user.avatar ?
                        <Avatar src={this.props.user.avatar._url} size={100}/>
                        : null}
                    <ListItem primaryText={this.props.user.firstName + " " + this.props.user.lastName}/>
                    <ListItem primaryText={"City:" + this.props.user.city}/>
                    <ListItem
                        primaryText={"Age: " + ((new Date()).getFullYear() - (new Date(this.props.user.birthDate)).getFullYear())}/>
                    <ListItem primaryText={"Gender:" + this.props.user.gender ? "Male" : "Female"}/>
                    <ListItem primaryText={"Score:" + this.props.user.score}/>
                </List>
            </Dialog>

        );
    }

}

const mapStateToProps = function (state) {
    return {
        user: state.helpingUser,
        dialog: state.pageStatus.dialog,
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        addSnackText: addSnackText,
        closeDialog: closeDialog,
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ShowProfileDialog);