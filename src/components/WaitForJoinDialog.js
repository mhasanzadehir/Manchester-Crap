import React, {Component} from "react";
import {addSnackText, addUserToState, closeDialog, closeSnackText, setFetchUsersData, showDialog} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getUsersForLeaderBoard, parseInitializer} from "../init/Parse";
import {
    CircularProgress, DatePicker, Dialog, FlatButton, RadioButton, RadioButtonGroup, RaisedButton,
    TextField
} from "material-ui";
import PlayerLeaderBoard from "./PlayerLeaderBoard";
import {SCORE} from "../constansts/DBColumn";
import {WAIT_FOR_JOIN_DIALOG} from "../constansts/AppDetail";


class LeaderBoardDialog extends Component {
    constructor() {
        super();
        this.state = {
        };

    }

    render() {
        return (
            <Dialog
                contentStyle={{textAlign: "center", width: "350px"}}
                title="Waiting for one player to join"
                autoScrollBodyContent={true}
                // actions={
                //     <div>
                //         <RaisedButton
                //             label="Cancel"
                //             primary={true}
                //             onClick={() => {
                //                 this.props.closeDialog()
                //             }}
                //         />
                //     </div>
                // }
                modal={false}
                open={this.props.dialog === WAIT_FOR_JOIN_DIALOG}
                // onRequestClose={() => {
                //     this.props.closeDialog()
                // }}
            >
                <CircularProgress size={80} thickness={5} />
                <br/>
                <h1>{this.props.remindTime}</h1>
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