import {parseInitializer} from "../init/parsInit";
import React, {Component} from "react";
import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {
    BIRTHDATE,
    CITY,
    FIRST_NAME, GENDER,
    IS_GUEST_PLAYED, IS_HOME_PLAYED, IS_PEND, LAST_NAME, PLAYER, POSITION_GUEST, POSITION_HOME, USER,
    USER_HOME, USER_NAME
} from "../constansts/DBColumn";
import TextField from 'material-ui/TextField';
import {RaisedButton, Toggle} from "material-ui";
import DatePicker from 'material-ui/DatePicker';


let Parse = parseInitializer();
// const Player = Parse.Object.extend("Player");

// let query = new Parse.Query(Player);


class ProfileInfo extends Component {
    constructor(props) {
        super(props);
        let player = this.props.player;
        this.state = {
            userName: player.get(USER).get(USER_NAME),
            firstName: player.get(FIRST_NAME),
            lastName: player.get(LAST_NAME),
            city: player.get(CITY),
            gender: player.get(GENDER),
            birthDate: player.get(BIRTHDATE)
        };
    }

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };


    onChange(e) {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }


    onSubmit(e) {
        e.preventDefault();
        this.props.onSumbit(this.state);
    }

    handleChangeDate = (event, date) => {
        this.setState({
            birthDate: date,
        });
    };
    render() {
        return(
            <div>
                <h1>Edit Profile</h1>
                <form onSubmit={this.onSubmit}>
                    <TextField
                        name="userName"
                        value={this.state.userName}
                        floatingLabelText="Username"
                        onChange={this.onChange}
                        disabled={true}
                    />
                    <br/>
                    <TextField
                        name="firstName"
                        value={this.state.firstName}
                        floatingLabelText="FirstName"
                        onChange={this.onChange}
                    />
                    <br/>
                    <TextField
                        name="lastName"
                        value={this.state.lastName}
                        floatingLabelText="LastName"
                        onChange={this.onChange}
                    />
                    <br/>
                    <TextField
                        name="city"
                        value={this.state.city}
                        floatingLabelText="City"
                        onChange={this.onChange}
                    />
                    <br/>
                    <Toggle
                        name="gender"
                        value="autoOk"
                        label="Auto Ok"
                        toggled={this.state.gender}
                        onToggle={this.handleToggle}
                    />
                    <br/>
                    <DatePicker
                        name="birthDate"
                        onChange={this.handleChangeDate}
                        value={this.state.birthDate}
                        floatingLabelText="BirthDate"
                        autoOk={false}
                        disableYearSelection={false}
                    />

                    <RaisedButton
                        label="Save Changes"
                        type="submit"
                        primary={true}/>
                </form>
            </div>
        );
    }

}

export default ProfileInfo;