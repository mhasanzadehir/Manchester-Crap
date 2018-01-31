import React, { Component } from 'react';
import "../styles/Register.css"
class Input extends Component{
    render() {
        return (
            <div className="Input">
                <input autoComplete="false" required type={this.props.type} placeholder={this.props.placeholder} />
                <label>{this.props.name}</label>
            </div>
        );
    }
}



class Register extends Component {


    render() {
        return (
            <div className="Register">
                <header className="Register-header">
                    <h1 className="Register-title">Register Page</h1>
                </header>
                <div className="Modal">
                    <form onSubmit={this.props.onSubmit} className="ModalForm">
                        <Input name={"username"} id="name" type="text" placeholder="Jack-Edward Oliver" />
                        <Input name={"E-mail"} id="username" type="email" placeholder="mrjackolai@gmail.com" />
                        <Input name={"password"} id="password" type="password" placeholder="password" />
                        {/*<button>Log in <i className="fa fa-fw fa-chevron-right"></i></button>*/}
                        <button>Log in</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;
