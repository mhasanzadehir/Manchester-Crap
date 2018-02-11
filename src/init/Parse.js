import {
    BIRTH_DATE, BOT_ID, CITY, EMAIL, FIRST_NAME, GENDER, IS_PEND, LAST_NAME, OBJECT_ID, PASSWORD, PLAYER, SCORE,
    USER_IDS,
    USER_NAME, USER_PLAY_STATES, USER_POSITIONS
} from "../constansts/DBColumn";

const APP_ID = "myAppId123456";
const JAVASCRIPT_KEY = '1xoWtDkxw8oZvX3bzhdTuHU7KZB8SGZD9jWQ2V9p';
const SERVER_URL = 'http://localhost:8030/wp';

//TODO delete all addSnackText
export function parseInitializer() {
    let Parse = require('parse');
    Parse.initialize(APP_ID, JAVASCRIPT_KEY);
    Parse.serverURL = SERVER_URL;
    return Parse;
}


let Parse = require('parse');
Parse.initialize(APP_ID, JAVASCRIPT_KEY);
Parse.serverURL = SERVER_URL;

const Player = Parse.Object.extend("Player");
const User = Parse.Object.extend("User");
const Game = Parse.Object.extend("Game");


export function parseSignIn(state, success, addSnackText) {
    Parse.User.logIn(state.username, state.password, {
        success: (user) => {
            addSnackText("You sign in successfully");
            success(user);
        },
        error: (user, error) => {
            addSnackText(error.message);
        }
    });
}

export function parseSignUp(state, success, addSnackText) {
    let user = new Parse.User();
    user.set(USER_NAME, state.username);
    user.set(EMAIL, state.email);
    user.set(PASSWORD, state.password);
    user.set(FIRST_NAME, "");
    user.set(LAST_NAME, "");
    user.set(CITY, "");
    user.set(GENDER, true);
    user.set(BIRTH_DATE, new Date());
    user.set(SCORE, 0);
    user.signUp(null, {
        success: (user) => {
            addSnackText("You sign up successfully");
            success(user);
        },
        error: (user, error) => {
            addSnackText(error.message)
        }
    });
}

export function getUser(userId, addSnackText) {
    let user = {};
    let query = new Parse.Query(User);
    query.equalTo(OBJECT_ID, userId);
    query.first({
        success: (object) => {
            user.id = object.id;
            user.username = object.get(USER_NAME);
            user.email = object.get(EMAIL);
            user.firstName = object.get(FIRST_NAME);
            user.lastName = object.get(LAST_NAME);
            user.city = object.get(CITY);
            user.birthDate = object.get(BIRTH_DATE);
            user.gender = object.get(GENDER);
            // user.score = object.get(SCORE);
        }
        ,
        error: function (error) {
            addSnackText("Error: " + error.code + " " + error.message);
        }
    });
    return user;
}

export function setUserInfo(state, addSnackText) {
    let query = new Parse.Query(User);
    query.equalTo(OBJECT_ID, state.id);
    query.first({
        success: (object) => {
            object.set(FIRST_NAME, state.firstName);
            object.set(LAST_NAME, state.lastName);
            object.set(CITY, state.city);
            object.set(BIRTH_DATE, state.birthDate);
            object.set(GENDER, state.gender);
            object.save();
        }
        ,
        error: function (error) {
            addSnackText("Error: " + error.code + " " + error.message);
        }
    });
}

export function getUsersForLeaderBoard(setState, addSnackText) {
    let query = new Parse.Query(User);
    query.descending(SCORE);
    query.find({
        success: (object) => {
            setState({data: object});
        }
        ,
        error: function (error) {
            addSnackText("Error: " + error.code + " " + error.message)
        }
    });
}

export function startNormalGame(hostGame, joinGame, userId, addSnackText) {
    let query = new Parse.Query(Game);
    query.equalTo(IS_PEND, true);
    query.first({
        success: (object) => {
            if (object) {
                let ids = object.get(USER_IDS);
                let positions = object.get(USER_POSITIONS);
                let playStates = object.get(USER_PLAY_STATES);
                ids.push(userId);
                positions.push(0);
                playStates.push(true);
                object.set(IS_PEND, false);
                object.set(USER_IDS, ids);
                object.set(USER_POSITIONS, positions);
                object.set(USER_PLAY_STATES, playStates);
                object.save();
                let game = {
                    id: object.id,
                    index: (ids.length - 1),
                };
                joinGame(game)
            } else {
                let object = new Game();
                object.set(USER_IDS, [userId]);
                object.set(IS_PEND, true);
                object.set(USER_POSITIONS, [0]);
                object.set(USER_PLAY_STATES, [false]);
                object.save(null, {
                    success: (object) => {
                        let game = {
                            id: object.id,
                            index: 0,
                        };
                        hostGame(game);
                    },
                    error: function (gameScore, error) {
                        addSnackText('Failed to create new object, with error code: ' + error.message);
                    }
                });
            }
        }
        ,
        error: function (error) {
            addSnackText("Error: " + error.code + " " + error.message);
        }
    });
}

export function addBotToGame(gameId, openGamePage, addSnackText) {
    let query = new Parse.Query(Game);
    query.equalTo(OBJECT_ID, gameId);
    query.first({
        success: (object) => {
            let ids = object.get(USER_IDS);
            let positions = object.get(USER_POSITIONS);
            let playStates = object.get(USER_PLAY_STATES);
            ids.push(BOT_ID);
            positions.push(0);
            playStates.push(true);
            object.set(IS_PEND, false);
            object.set(USER_IDS, ids);
            object.set(USER_POSITIONS, positions);
            object.set(USER_PLAY_STATES, playStates);
            object.save();
            openGamePage();
        }
        ,
        error: function (error) {
            addSnackText("Error: " + error.code + " " + error.message);
        }
    });
}

export function waitForJoinLiveQuery(gameId, setIsPend) {
    let query = new Parse.Query(Game);
    query.equalTo(OBJECT_ID, gameId);
    let subscription = query.subscribe();
    subscription.on('update', (object) => {
        setIsPend(object.get(IS_PEND));
    });
}