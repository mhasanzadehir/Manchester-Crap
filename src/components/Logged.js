import React, {Component} from "react";
import {IconButton, IconMenu, MenuItem} from "material-ui";



class Logged extends Component {
    constructor() {
        super();
    }


    render() {
        return(
            <IconMenu
                {...this.props}
                iconButtonElement={
                    <IconButton/>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" />
            </IconMenu>
        );
    }

}

export default Logged;