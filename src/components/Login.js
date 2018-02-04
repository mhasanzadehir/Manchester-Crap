import React, {Component} from "react";
import {parseInitializer} from "../init/parsInit";
import {connect} from 'react-redux'
import {addUserToState} from "../actions";
import {bindActionCreators} from 'redux'
import {Redirect} from 'react-router';
import {NotificationManager} from 'react-notifications';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


let Parse = parseInitializer();

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: false
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
        Parse.User.logIn(this.state.username, this.state.password, {
            success: (user) => {
                NotificationManager.success("salam", "salam");
                this.props.addUserToState(user);
                this.setState({redirect: true});
            },
            error: (user, error) => {
                NotificationManager.error(error.message);
            }
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/MainPage"/>;
        }
        return (
            <div>
                <h1>Log in</h1>
                <form onSubmit={this.onSubmit}>
                    <TextField
                        name="username"
                        hintText="Username"
                        floatingLabelText="Username"
                        onChange={this.onChange}
                    />
                    <br/>
                    <TextField
                        name="password"
                        hintText="Password"
                        floatingLabelText="Password"
                        type="password"
                        onChange={this.onChange}
                    />
                    <br/>
                    <RaisedButton
                        label="Log In"
                        type="submit"
                        primary={true}/>
                </form>
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
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);