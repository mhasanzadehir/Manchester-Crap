import React, {Component} from "react";
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import {
    addSnackText, addUserToState, closeSnackText, setFetchUsersData, setLeftDrawer, showDialog,
    signOut
} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {FlatButton} from "material-ui";
import {
    APP_NAME, EDIT_PROFILE_DIALOG, LEADER_BOARD_DIALOG, SIGN_IN_DIALOG,
    SIGN_UP_DIALOG
} from "../constansts/AppDetail";
import {flatButtonDivStyle, flatButtonLabelStyle} from "../constansts/Styles";

class AppBarSign extends Component {
    constructor() {
        super();
        this.state = {};
        this.signOut = this.signOut.bind(this);

    }

    signOut() {
        localStorage.removeItem(APP_NAME);
        this.props.signOut();
        window.location.reload();
    }

    render() {
        if (!this.props.signed) {
            return (
                <div style={flatButtonDivStyle} >
                    <FlatButton labelStyle={flatButtonLabelStyle} onClick={() => {
                        this.props.showDialog(SIGN_UP_DIALOG)
                    }} label="Sign Up"/>
                    <FlatButton labelStyle={flatButtonLabelStyle} onClick={() => {
                        this.props.showDialog(SIGN_IN_DIALOG)
                    }} label="Sign In"/>
                </div>
            )
        }


        return (
            <div>
                <FlatButton labelStyle={flatButtonLabelStyle} onClick={() => {
                    this.props.setFetchUsersData(true);
                    this.props.showDialog(LEADER_BOARD_DIALOG)
                }} label="Leader Board"/>
                <IconMenu
                    iconButtonElement={
                        <IconButton tooltip={this.props.username}>
                            <AccountCircle color="white"/>
                        </IconButton>
                    }
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <MenuItem
                        onClick={() => {this.props.showDialog(EDIT_PROFILE_DIALOG)}}
                        primaryText="Edit profile"/>
                    <MenuItem
                        onClick={() => {this.signOut()}}
                        primaryText="Sign out"/>
                </IconMenu>
                {/*<IconMenu*/}
                {/*iconButtonElement={<IconButton tooltip="Notifications"><NotificationsIcon color="white" /></IconButton>}*/}
                {/*anchorOrigin={{horizontal: 'right', vertical: 'top'}}*/}
                {/*targetOrigin={{horizontal: 'right', vertical: 'top'}}*/}
                {/*>*/}
                {/*<MenuItem primaryText="Refresh" />*/}
                {/*<MenuItem primaryText="Help" />*/}
                {/*<MenuItem primaryText="Sign out" />*/}
                {/*</IconMenu>*/}
                <IconButton tooltip="Notifications"><NotificationsIcon color="white"/></IconButton>
            </div>
        );
    }

}


const mapStateToProps = function (state) {
    return {
        username: state.user.username,
        signed: state.pageStatus.signed,
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        addSnackText: addSnackText,
        showDialog: showDialog,
        signOut: signOut,
        setFetchUsersData: setFetchUsersData
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(AppBarSign);