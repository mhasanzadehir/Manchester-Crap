import React, {Component} from "react";
import {addSnackText, addUserToState, closeDialog, closeSnackText, setFetchUsersData, showDialog} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getUsersForLeaderBoard, parseInitializer} from "../init/Parse";
import {DatePicker, Dialog, FlatButton, RadioButton, RadioButtonGroup, RaisedButton, TextField} from "material-ui";
import PlayerLeaderBoard from "./PlayerLeaderBoard";
import {SCORE} from "../constansts/DBColumn";
import {LEADER_BOARD_DIALOG} from "../constansts/AppDetail";
import {buttonThemeColorStyle} from "../constansts/Styles";

let Parse = parseInitializer();
const User = Parse.Object.extend("User");


class LeaderBoardDialog extends Component {
    constructor() {
        super();
        this.state = {
            data: null
        };

    }

    fetchData(){
        let query = new Parse.Query(User);
        query.descending(SCORE);
        query.find({
            success: (object) => {
                this.setState({data: object});
            }
            ,
            error: function (error) {
                addSnackText("Error: " + error.code + " " + error.message)
            }
        });
    }


    render() {
        if (this.props.fetchUsersData){
            this.fetchData();
            this.props.setFetchUsersData(false);
        }
        if (this.state.data === undefined || this.state.data == null){
            return null;
        }
        return (
            <Dialog
                contentStyle={{textAlign: "center", width: "350px"}}
                title="Leader Board"
                autoScrollBodyContent={true}
                actions={
                    <div>
                        <RaisedButton
                            style={Object.assign({} , buttonThemeColorStyle)}
                            label="Cancel"
                            primary={true}
                            onClick={() => {
                                this.props.closeDialog()
                            }}
                        />
                    </div>
                }
                modal={false}
                open={this.props.dialog === LEADER_BOARD_DIALOG}
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