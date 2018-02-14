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
import AvatarImage from "./AvatarImage";
import EditProfileDialog from "./EditProfileDialog";
import LeaderBoardDialog from "./LeaderBoardDialog";
import SignInDialog from "./SignInDialog";
import SignUpDialog from "./SignUpDialog";
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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
                <div style={flatButtonDivStyle}>
                    <FlatButton labelStyle={flatButtonLabelStyle} onClick={() => {
                        this.props.showDialog(SIGN_UP_DIALOG)
                    }} label="Sign Up"/>
                    <FlatButton labelStyle={flatButtonLabelStyle} onClick={() => {
                        this.props.showDialog(SIGN_IN_DIALOG)
                    }} label="Sign In"/>
                    <SignInDialog/>
                    <SignUpDialog/>
                </div>
            )
        }

        // console.log("ASKAKD", this.props.user);
        return (
            <div>
                <FlatButton labelStyle={flatButtonLabelStyle} onClick={() => {
                    this.props.setFetchUsersData(true);
                    this.props.showDialog(LEADER_BOARD_DIALOG)
                }} label="Leader Board"/>
                <AvatarImage size={23} user={this.props.user}/>
                {/*<IconMenu*/}
                {/*iconButtonElement={<IconButton tooltip="Notifications"><NotificationsIcon color="white" /></IconButton>}*/}
                {/*anchorOrigin={{horizontal: 'right', vertical: 'top'}}*/}
                {/*targetOrigin={{horizontal: 'right', vertical: 'top'}}*/}
                {/*>*/}
                {/*<MenuItem primaryText="Refresh" />*/}
                {/*<MenuItem primaryText="Help" />*/}
                {/*<MenuItem primaryText="Sign out" />*/}
                {/*</IconMenu>*/}
                {/*<IconButton tooltip="Notifications"><NotificationsIcon color="white"/></IconButton>*/}
                <IconMenu
                    iconButtonElement={
                        <IconButton tooltip="More option"><MoreVertIcon color="white"/></IconButton>
                    }
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <MenuItem
                        onClick={() => {
                            this.props.showDialog(EDIT_PROFILE_DIALOG)
                        }}
                        primaryText="Edit profile"/>
                    <MenuItem
                        onClick={() => {
                            this.signOut()
                        }}
                        primaryText="Sign out"/>
                </IconMenu>
                <EditProfileDialog/>
                <LeaderBoardDialog/>
            </div>
        );
    }

}


const mapStateToProps = function (state) {
    return {
        user: state.user,
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