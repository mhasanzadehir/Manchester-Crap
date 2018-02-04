import React, {Component} from 'react';
import Register from "../components/Register";
import Login from "../components/Login";
import ReactLoading from 'react-loading';

class RegisterPage extends Component {
    render() {
        return (
            <div>
                <ReactLoading type="spinningBubbles" color="black"/>
                <Register/>
                <br/>
                <Login/>
            </div>
        );
    }

}


export default RegisterPage;