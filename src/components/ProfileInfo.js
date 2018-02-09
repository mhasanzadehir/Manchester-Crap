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
import TextFields from "./TextFields";


let Parse = parseInitializer();
const Player = Parse.Object.extend("Player");
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

        this.onChange = this.onChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
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
        let user = this.props.player.get(USER);
        let pQuery = new Parse.Query(Player);
        pQuery.equalTo(USER, user);
        pQuery.first({
            success: (object) => {
                object.set(FIRST_NAME, this.state.firstName);
                object.set(LAST_NAME, this.state.lastName);
                object.set(CITY, this.state.city);
                object.set(BIRTHDATE, this.state.birthDate);
                object.set(GENDER, this.state.gender);
                object.save();
            }
            ,
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
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
                    <TextFields fieldList={["const_userName", "firstName","lastName","city"]} onChange={this.onChange}  state={this.state}/>
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