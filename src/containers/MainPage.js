import React, {Component} from 'react';
import {FlatButton, RaisedButton} from "material-ui";
import {
    addSnackText, addUserToState, closeSnackText, setLeftDrawer, showDialog, signOut
} from "../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {flatButtonLabelStyle, openGameFlatButtonLabelStyle} from "../constansts/Styles";
import {APP_PRIMARY_COLOR} from "../constansts/AppDetail";

class MainPage extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        if (!this.props.signed){
            return null;
        }
        return (
            <div style={{textAlign: "center", marginTop:"400px"}}>
                <FlatButton
                    onClick={()=>{window.open('/UserPage', '_self')}}
                    style={{backgroundColor: APP_PRIMARY_COLOR}}
                    labelStyle={openGameFlatButtonLabelStyle}
                    label="Open Game"/>
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