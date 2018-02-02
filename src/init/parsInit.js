const APP_ID = "myAppId123456";
const JAVASCRIPT_KEY = '1xoWtDkxw8oZvX3bzhdTuHU7KZB8SGZD9jWQ2V9p';
const SERVER_URL = 'http://localhost:8030/wp';

export function parseInitializer() {
    // var Parse = require('../../../../../../../Users/User/AppData/Roaming/npm/node_modules/parse/lib/browser/Parse');
    var Parse = require('parse');
    Parse.initialize(APP_ID, JAVASCRIPT_KEY);
    Parse.serverURL = SERVER_URL;
    return Parse;
}