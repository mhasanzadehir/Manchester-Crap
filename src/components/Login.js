import React, {Component} from "react";
import {parseInitializer} from "../init/parsInit";
import {connect} from 'react-redux'
import {addUserToState} from "../actions";
import {bindActionCreators} from 'redux'
import { Redirect } from 'react-router';


let Parse = parseInitializer();

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            redirect: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.logIn_success = this.logIn_success.bind(this);
        this.logIn_error = this.logIn_error.bind(this);
    }

    onChange(e) {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit(e) {
        e.preventDefault();
        Parse.User.logIn(this.state.username, this.state.password, {
            success: (user) => this.logIn_success(user),
            error: (user, error) => this.logIn_error(user, error)
        });
    }

    logIn_success(user) {
        this.props.addUserToState(user);
        console.log(this.props.user);
        // window.open("/MainPage" , "_self")
        this.setState({redirect: true});
    }

    logIn_error(user, error) {
        this.setState({error: error.message});
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/MainPage" />;
        }
        return (
            <div>

                <h1>Log in</h1>
                <form onSubmit={this.onSubmit}>
                    <table>
                        <tbody>
                        <tr>
                            <td>username</td>
                            <td>
                                <input type="text" name="username" value={this.state.username}
                                       onChange={this.onChange}/>
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
                                <button type="submit">Log In</button>
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

const mapStateToProps = function (state) {
    return {
        user: state.user
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        addUserToState
    } , dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);