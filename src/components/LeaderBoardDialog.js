import React, {Component} from "react";
import {addSnackText, addUserToState, closeDialog, closeSnackText, showDialog} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getUsersForLeaderBoard, parseInitializer} from "../init/ParseInit";
import {DatePicker, Dialog, FlatButton, RadioButton, RadioButtonGroup, RaisedButton, TextField} from "material-ui";
import PlayerLeaderBoard from "./PlayerLeaderBoard";
import {SCORE} from "../constansts/DBColumn";

let Parse = parseInitializer();
const User = Parse.Object.extend("User");

function fetchData() {
    let query = new Parse.Query(User);
    query.descending(SCORE);
    query.find({
        success: (object) => {
            console.log("[[[[[[[", object)
            this.setState({data: object});
        }
        ,
        error: function (error) {
            addSnackText("Error: " + error.code + " " + error.message)
        }
    });
}

class LeaderBoardDialog extends Component {
    constructor() {
        super();
        this.state = {
            data: null
        };

    }

    render() {
        return (
            <Dialog
                contentStyle={{textAlign: "center", width: "350px"}}
                title="Leader Board"
                autoScrollBodyContent={true}
                actions={
                    <div>
                        <RaisedButton
                            label="Cancel"
                            primary={true}
                            onClick={() => {
                                this.props.closeDialog()
                            }}
                        />
                    </div>
                }
                modal={false}
                open={this.props.dialog === "leaderBoard"}
                onRequestClose={() => {
                    this.props.closeDialog()
                }}
            >
                <PlayerLeaderBoard users={this.state.data}/>
            </Dialog>

        );
    }

}

const mapStateToProps = function (state) {
    return {
        dialog: state.pageStatus.dialog,
        user: state.user,
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        addSnackText: addSnackText,
        closeSnackText: closeSnackText,
        showDialog: showDialog,
        closeDialog: closeDialog,
        addUserToState: addUserToState,
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoardDialog);