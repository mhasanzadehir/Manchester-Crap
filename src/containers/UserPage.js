import React, {Component} from 'react';
import {addBotToGame, parseInitializer, startNormalGame, waitForJoinLiveQuery} from "../init/Parse";
import {connect} from 'react-redux'
import {addGameIdToState, addGameIndexToState, addSnackText, addUserToState, closeDialog, showDialog} from "../actions";
import {bindActionCreators} from 'redux'
import {FlatButton} from "material-ui";
import {WAIT_FOR_JOIN_DIALOG} from "../constansts/AppDetail";
import {
    buttonThemeColorStyle, divMainPageBackground, mainPageButton,
    openGameFlatButtonLabelStyle
} from "../constansts/Styles";
import WaitForJoinDialog from "../components/WaitForJoinDialog";


let Parse = parseInitializer();
const Game = Parse.Object.extend("Game");


class UserPage extends Component {
    constructor() {
        super();

        this.state = {
            isPend: true,
            user: null,
            gameId: null,
            remindTime: 5,
        };
        this.joinNormalGame = this.joinNormalGame.bind(this);
        this.hostNormalGame = this.hostNormalGame.bind(this);
        this.setIsPend = this.setIsPend.bind(this);
        this.countCheckingState = this.countCheckingState.bind(this);
        this.openGamePage = this.openGamePage.bind(this);
    }

    componentDidMount() {
        this.props.closeDialog();
    }

    setIsPend(isPend) {
        this.setState({
            isPend: isPend
        })
    }

    joinNormalGame(game) {
        this.props.addGameIdToState(game.id);
        this.props.addGameIndexToState(game.index);
        this.props.addSnackText("You joined successfully");
        this.openGamePage();
    }

    hostNormalGame(game) {
        this.props.addGameIdToState(game.id);
        this.props.addGameIndexToState(game.index);
        this.props.addSnackText("You hosted successfully");
        this.props.showDialog(WAIT_FOR_JOIN_DIALOG);
        waitForJoinLiveQuery(game.id, this.setIsPend);
        setInterval(this.countCheckingState, 1000)
    }

    countCheckingState() {
        this.setState({remindTime: this.state.remindTime - 1});
        if (!this.state.isPend) {
            this.openGamePage();
        }
        else if (this.state.remindTime === 0) {
            this.props.addSnackText("No player found you play with Bot");
            addBotToGame(this.props.gameId, this.openGamePage, this.props.addSnackText)
        }
    }

    openGamePage() {
        this.props.closeDialog();
        window.open("/GamePage", "_self");
    }

    render() {
        return (
            <div style={Object.assign({} , divMainPageBackground)}>
                <FlatButton
                    onClick={() => {
                        startNormalGame(this.hostNormalGame, this.joinNormalGame, this.props.user.id, this.props.addSnackText)
                    }}
                    style={Object.assign({},mainPageButton, buttonThemeColorStyle)}
                    labelStyle={openGameFlatButtonLabelStyle}
                    label="Start Game"/>
                <WaitForJoinDialog remindTime={this.state.remindTime}/>
            </div>
        )
    }
}

Parse.LiveQuery.on('open', () => {
    console.log('socket connection established');
});

Parse.LiveQuery.on('close', () => {
    console.log('socket connection closed');
});

Parse.LiveQuery.on('error', (error) => {
    console.log(error);
});

const mapStateToProps = function (state) {
    return {
        gameId: state.game.gameId,
        user: state.user
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        addUserToState,
        addGameIdToState,
        addGameIndexToState,
        addSnackText,
        showDialog,
        closeDialog,
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);



