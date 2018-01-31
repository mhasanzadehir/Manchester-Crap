export function parseInitializer() {
    var Parse = require('../../../../../../../Users/User/AppData/Roaming/npm/node_modules/parse/lib/browser/Parse');
    Parse.initialize("myAppId123456", '1xoWtDkxw8oZvX3bzhdTuHU7KZB8SGZD9jWQ2V9p');
    Parse.serverURL = 'http://localhost:8030/wp';

//query.equalTo('strength', 200);
//     var subscription = query.subscribe();
//     subscription.on('open', () => {
//         console.log('opened')
//     });
//
//     subscription.on('create', (object) => {
//         console.log('message added!');
//     });
//     subscription.on('update', (object) => {
//         console.log('message updated!');
//     });
//     subscription.on('enter', (object) => {
//         console.log('message deleted!');
//     });
    return Parse;
}