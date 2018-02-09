import {
    BIRTH_DATE, CITY, EMAIL, FIRST_NAME, GENDER, LAST_NAME, OBJECT_ID, PASSWORD, PLAYER, SCORE, USER,
    USER_NAME
} from "../constansts/DBColumn";

const APP_ID = "myAppId123456";
const JAVASCRIPT_KEY = '1xoWtDkxw8oZvX3bzhdTuHU7KZB8SGZD9jWQ2V9p';
const SERVER_URL = 'http://localhost:8030/wp';

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
    user.signUp(null, {
        success: (user) => {
            addSnackText("You sign up successfully");
            insertPlayer(user);
            success(user);
        },
        error: (user, error) => {
            addSnackText(error.message)
        }
    });
}

function insertPlayer(user) {
    let player = new Player();
    player.set(USER, user);
    player.set(USER_NAME, user.get(USER_NAME));
    player.save();
    user.set(PLAYER, player);
    user.save();
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
        }
        ,
        error: function (error) {
            addSnackText("Error: " + error.code + " " + error.message);
        }
    });
    return user;
}

export function getPlayer(playerId, addSnackText) {
    let player = {};
    let query = new Parse.Query(Player);
    query.equalTo(OBJECT_ID, playerId);
    query.first({
        success: (object) => {
            player.id = object.id;
            player.firstName = object.get(FIRST_NAME);
            player.username = object.get(USER_NAME);
            player.lastName = object.get(LAST_NAME);
            player.city = object.get(CITY);
            player.birthDate = object.get(BIRTH_DATE);
            player.gender = object.get(GENDER);
            player.score = object.get(SCORE);
        }
        ,
        error: function (error) {
            addSnackText("Error: " + error.code + " " + error.message);
        }
    });
    return player;

}