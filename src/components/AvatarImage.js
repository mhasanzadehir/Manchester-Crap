import React, {Component} from "react";
import {
    addHelpingUserToState,
    addSnackText, setFetchUsersData, showDialog,
    signOut
} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Avatar, IconButton} from "material-ui";
import AccountCircle from 'material-ui-icons/AccountCircle';
import {SHOW_PROFILE_DIALOG} from "../constansts/AppDetail";

class AppBarSign extends Component {
    constructor() {
        super();
        this.state = {};
        this.avatarOnClick = this.avatarOnClick.bind(this);
    }

    componentDidUpdate() {
        console.log("slam");
    }

    avatarOnClick() {
        this.props.addHelpingUserToState(this.props.user);
        this.props.showDialog(SHOW_PROFILE_DIALOG)
    }

    render() {
        console.log("lalal", this.props.user);
        if (!this.props.user) {
            return null;
        }
        return (
            <IconButton onClick={this.avatarOnClick}
                        tooltip={this.props.user.username}>
                {this.props.user.avatar == null ?
                    <AccountCircle color="white"/> :
                    <Avatar size={23} src={this.props.user.avatar._url}/>}
            </IconButton>
        );
    }

}


const mapStateToProps = function (state) {
    return {
        helpingUser: state.helpingUser,
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        addSnackText: addSnackText,
        showDialog: showDialog,
        signOut: signOut,
        setFetchUsersData: setFetchUsersData,
        addHelpingUserToState: addHelpingUserToState
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(AppBarSign);