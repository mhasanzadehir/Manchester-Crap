import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
import {APP_NAME, APP_PRIMARY_COLOR} from "../constansts/AppDetail";
import AppBar from 'material-ui/AppBar';
import {Snackbar} from "material-ui";
import AppBarSign from "../components/AppBarSign";
import {
    addHelpingUserToState,
    addSnackText, addUserToState, closeDialog, closeSnackText, setLeftDrawer, setLoading, showDialog, signOut
} from "../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import MainPage from "./MainPage";
import GamePage from "./GamePage";
import SignInDialog from "../components/SignInDialog";
import SignUpDialog from "../components/SignUpDialog";
import LeftDrawer from "../components/LeftDrawer";
import EditProfileDialog from "../components/EditProfileDialog";
import UserPage from "./UserPage";
import LeaderBoardDialog from "../components/LeaderBoardDialog";
import ShowProfileDialog from "../components/ShowProfileDialog";
import {mainDiv} from "../constansts/Styles";
import {getUser} from "../init/Parse";
import {addHelpingUserToStateUnsafe} from "../constansts/ActionTypes";
import LoadingDialog from "../components/LoadingDialog";


class App extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.closeDialog();
        this.props.setLoading(false);
        if (!this.props.signed && window.location.pathname !== "/") {
            window.open("/", "_self");
        } else {
            this.props.addUserToState(getUser(this.props.user.id , this.props.addSnackText));
        }
    }
    render() {
        return (
            <div style={Object.assign({} , mainDiv)}>
                <AppBar
                    title={APP_NAME}
                    style={{backgroundColor : APP_PRIMARY_COLOR}}
                    onLeftIconButtonClick={() => {
                        this.props.setLeftDrawer(true)
                    }}
                    iconElementRight={<AppBarSign/>}
                />
                <LeftDrawer/>
                <ShowProfileDialog/>
                <LoadingDialog/>
                <Switch>
                    <Route exact path="/" component={MainPage}/>
                    <Route path="/GamePage" component={GamePage}/>
                    <Route path='/UserPage' component={UserPage}/>
                    {/*<Route render={() => <h1>Page not found</h1>}/>*/}
                </Switch>
                <Snackbar
                    open={this.props.snackIsOpen}
                    message={this.props.snackText}
                    autoHideDuration={5000}
                    onRequestClose={this.props.closeSnackText}
                />
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        snackText: state.pageStatus.snack.text,
        snackIsOpen: state.pageStatus.snack.isOpen,
        signed: state.pageStatus.signed,
        user: state.user,
        // loading: state.pageStatus.loading,
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        addSnackText: addSnackText,
        closeSnackText: closeSnackText,
        addUserToState: addUserToState,
        addHelpingUserToState: addHelpingUserToState,
        showDialog: showDialog,
        closeDialog: closeDialog,
        setLeftDrawer: setLeftDrawer,
        signOut: signOut,
        setLoading: setLoading,
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(App);