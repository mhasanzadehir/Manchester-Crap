registration {Component} from 'react';
import "../styles/Register.css"


var Parse = require('parse');

Parse.initialize("myAppId123456", '1xoWtDkxw8oZvX3bzhdTuHU7KZB8SGZD9jWQ2V9p');
Parse.serverURL = 'http://localhost:8030/wp';

let query = new Parse.Query('Monster');
//query.equalTo('strength', 200);
var subscription = query.subscribe();
subscription.on('open', () => {
    console.log('opened')
});

subscription.on('create', (object) => {
    console.log('message added!');
});
subscription.on('update', (object) => {
    console.log('message updated!');
});
subscription.on('enter', (object) => {
    console.log('message deleted!');
});


class Register extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        };
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }


    onSubmit = (e) => {
        e.preventDefault();

        const {email, password} = this.state;
        var user = new Parse.User();
        user.set("username", "MAHDI");
        user.set("email", email);
        user.set("password", password);

        user.signUp(null, {
            success: function (user) {

                // Hooray! Let them use the app now.
            },
            error: function (user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
            }
        });

    }


    render() {
        const {email, password} = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text" name="email" value={email} onChange={this.onChange}/>
                <input type="text" name="password" value={password} onChange={this.onChange}/>
                <button type="submit">Submit</button>
            </form>
        );
    }

}


export default Register;
