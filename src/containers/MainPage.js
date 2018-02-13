import React, {Component} from 'react';
import {FlatButton} from "material-ui";
import {
    addSnackText, addUserToState, closeSnackText, setBlurBackground, setLeftDrawer, showDialog, signOut
} from "../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    buttonThemeColorStyle,
    divMainPage, divMainPageBlurBackground, mainPageButton,
    openGameFlatButtonLabelStyle
} from "../constansts/Styles";

class MainPage extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div style={Object.assign({}, divMainPage)}>
                <div id="BlurBackground" style={Object.assign({} , divMainPageBlurBackground(this.props.blurBackground))}/>
                {this.props.signed ?
                    <FlatButton
                        onClick={() => {
                            window.open('/UserPage', '_self');
                        }}
                        style={Object.assign({} , mainPageButton,buttonThemeColorStyle)}
                        labelStyle={openGameFlatButtonLabelStyle}
                        label="Open Game"/> :
                    null
                }

            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        snackText: state.pageStatus.snack.text,
        snackIsOpen: state.pageStatus.snack.isOpen,
        signed: state.pageStatus.signed,
        blurBackground: state.pageStatus.blurBackground,
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
        setBlurBackground: setBlurBackground
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);