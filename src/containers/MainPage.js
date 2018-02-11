import React, {Component} from 'react';
import {RaisedButton} from "material-ui";
import {
    addSnackText, addUserToState, closeSnackText, setLeftDrawer, showDialog, signOut
} from "../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class MainPage extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        snackText: state.pageStatus.snack.text,
        snackIsOpen: state.pageStatus.snack.isOpen,
        signed: state.pageStatus.signed,
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        addSnackText: addSnackText,
        closeSnackText: closeSnackText,
        addUserToState: addUserToState,
        showDialog: showDialog,
        setLeftDrawer: setLeftDrawer,
        signOut: signOut,
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);