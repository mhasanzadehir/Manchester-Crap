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

export function parseSignIn(username , password , success ,addSnackText) {
    Parse.User.logIn(username, password, {
        success: (user) => {
            addSnackText("You sign in successfully");
            success(user);
        },
        error: (user, error) => {
            addSnackText(error.message);
        }
    });
}