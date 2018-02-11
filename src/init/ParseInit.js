import {
    BIRTH_DATE, CITY, EMAIL, FIRST_NAME, GENDER, LAST_NAME, OBJECT_ID, PASSWORD, PLAYER, SCORE, USER,
    USER_NAME
} from "../constansts/DBColumn";
import {addSnackText} from "../actions";

const APP_ID = "myAppId123456";
const JAVASCRIPT_KEY = '1xoWtDkxw8oZvX3bzhdTuHU7KZB8SGZD9jWQ2V9p';
const SERVER_URL = 'http://192.168.1.7:8030/wp';

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

export function getUser(userId , addSnackText) {
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

export function setUserInfo(state , addSnackText) {
    let user = {};
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
    return user;
}

export function getUsersForLeaderBoard(setState, addSnackText) {
    let query = new Parse.Query(User);
    query.descending(SCORE);
    query.find({
        success: (object) => {
            setState({data : object});
        }
        ,
        error: function (error) {
            addSnackText("Error: " + error.code + " " + error.message)
        }
    });
}