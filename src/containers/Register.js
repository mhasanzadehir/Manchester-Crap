import React, {Component} from 'react';
import Register from "../components/Register";
import Login from "../components/Login";

class RegisterPage extends Component {
    render() {
        return (
            <div>
                <Register/>
                <br/>
                <Login/>
            </div>
        );
    }

}


export default RegisterPage;