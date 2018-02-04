import {parseInitializer} from "../init/parsInit";
import React , {Component} from "react";
import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {
    FIRST_NAME,
    IS_GUEST_PLAYED, IS_HOME_PLAYED, IS_PEND, PLAYER, POSITION_GUEST, POSITION_HOME, USER,
    USER_HOME
} from "../constansts/DBColumn";


let Parse = parseInitializer();
const Player = Parse.Object.extend("Player");
// let query = new Parse.Query(Player);


class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            error: '',
            code: '',
            // codeNumberDisplay:'none'
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }


    onSubmit(e) {
        e.preventDefault();
        let user = new Parse.User();
        user.set("username", this.state.username);
        user.set("email", this.state.email);
        user.set("password", this.state.password);
        user.signUp(null, {
            success: (user) => {
                NotificationManager.success(user.get('username'), "register complete please log in");
                Register.insertPlayer(user);
            },
            error: (user, error) => {
                NotificationManager.error(error.message);
            }
        });


    }

    static insertPlayer(user) {
        let player = new Player();
        player.set(USER, user);
        player.save();
        user.set(PLAYER, player);
        user.save();
    }

    render() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.onSubmit}>
                    <table>
                        <tbody>
                        <tr>
                            <td>username</td>
                            <td>
                                <input required="true" type="text" name="username" value={this.state.username}
                                       onChange={this.onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>email</td>
                            <td>
                                <input type="email" name="email" value={this.state.email} onChange={this.onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>password</td>
                            <td>
                                <input type="password" name="password" value={this.state.password}
                                       onChange={this.onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit">Register</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
                <p>{this.state.error}</p>
            </div>
        );
    }

}

export default Register;