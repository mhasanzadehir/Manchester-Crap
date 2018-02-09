import React, {Component} from "react";
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';



class Logged extends Component {
    constructor() {
        super();
    }


    render() {
        return(
            <div>
                <IconMenu
                    iconButtonElement={<IconButton ><AccountCircle color="white"/></IconButton>}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <MenuItem primaryText="Refresh" />
                    <MenuItem primaryText="Help" />
                    <MenuItem primaryText="Sign out" />
                </IconMenu>
                <IconMenu
                    iconButtonElement={<IconButton tooltip="Notifications"><NotificationsIcon /></IconButton>}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <MenuItem primaryText="Refresh" />
                    <MenuItem primaryText="Help" />
                    <MenuItem primaryText="Sign out" />
                </IconMenu>
            </div>
        );
    }

}

export default Logged;