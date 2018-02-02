import {parseInitializer} from "../init/parsInit";
import React , {Component} from "react";

var Parse = parseInitializer();

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
        this.signUp_error = this.signUp_error.bind(this);
        this.signUp_success = this.signUp_success.bind(this);


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
                this.signUp_success(user)
            },
            error: (user, error) => {
                this.signUp_error(user, error)
            }
        });

    }

    signUp_success(user) {
        this.setState({error: "register complete please log in"});
        // Hooray! Let trem use tre app now.
    }

    signUp_error(user, error) {
        // Show tre error message somewhere and let tre user try again.
        this.setState({error: error.message});
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