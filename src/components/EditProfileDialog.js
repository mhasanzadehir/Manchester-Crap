import React, {Component} from "react";
import {addSnackText, addUserToState, closeDialog, closeSnackText, showDialog} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getUser, setUserInfo} from "../init/Parse";
import {DatePicker, Dialog, FlatButton, RadioButton, RadioButtonGroup, RaisedButton, TextField} from "material-ui";
import {EDIT_PROFILE_DIALOG} from "../constansts/AppDetail";
import {buttonThemeColorStyle} from "../constansts/Styles";
import {parseInitializer} from "../init/Parse";
import $ from "jquery";

let Parse = parseInitializer();

class EditProfileDialog extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            flagState: true,
            firstName: "",
            lastName: "",
            city: "",
            birthDate: new Date(),
            gender: true,
            pictures: {},
        };
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.submit = this.submit.bind(this);
        this.onChangeAvatar = this.onChangeAvatar.bind(this);
    }

    componentDidMount() {
        this.getUserState();
    }

    getUserState() {
        this.setState({
            id: this.props.user.id,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            city: this.props.user.city,
            birthDate: this.props.user.birthDate,
            gender: this.props.user.gender,
        });
    }

    onChangeText(event) {
        const state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    onChangeDate(event, date) {
        this.setState({
            birthDate: date,
        });
    };

    onChangeGender(event, value) {
        this.setState({
            gender: (value === "true"),
        });
    };

    submit() {
        setUserInfo(this.state, this.props.addSnackText);
        this.props.addUserToState(getUser(this.props.user.id, this.props.addSnackText));
        console.log("LALALALAL",this.props.user);
        this.props.addSnackText("Changes were successful");
        this.props.closeDialog();
    }

    onChangeAvatar() {
        let fileUploadControl = $("#profilePhotoFileUpload")[0];
        if (fileUploadControl.files.length > 0) {
            let file = fileUploadControl.files[0];
            let name = "photo.jpg";
            let parseFile = new Parse.File(name, file);
            this.setState({pictures : parseFile});
        }
    }

    render() {
        console.log(this.props.user);
        if (this.state.id !== this.props.user.id) {
            this.getUserState();
        }
        return (
            <Dialog
                contentStyle={{textAlign: "center", width: "350px"}}
                title="Edit Profile"
                autoScrollBodyContent={true}
                actions={
                    <div>
                        <FlatButton
                            label="Cancel"
                            primary={true}
                            onClick={() => {
                                this.props.closeDialog()
                            }}
                        />
                        <RaisedButton
                            style={Object.assign({}, buttonThemeColorStyle)}
                            label="Submit"
                            primary={true}
                            onClick={() => {
                                this.submit()
                            }}
                        />
                    </div>
                }
                modal={false}
                open={this.props.dialog === EDIT_PROFILE_DIALOG}
                onRequestClose={() => {
                    this.props.closeDialog()
                }}
            >

                {/*<input type="file" id="profilePhotoFileUpload" onChange={this.onChange}/>*/}
                <FlatButton primary={true} label="Choose an Image">
                    <input  type="file" id="profilePhotoFileUpload" onChange={this.onChangeAvatar}/>
                </FlatButton>
                <TextField
                    name="firstName"
                    hintText="First Name"
                    floatingLabelText="First Name"
                    onChange={this.onChangeText}
                    type="text"
                    value={this.state.firstName}
                />
                <TextField
                    name="lastName"
                    hintText="Last Name"
                    floatingLabelText="Last Name"
                    onChange={this.onChangeText}
                    type="text"
                    value={this.state.lastName}
                />
                <TextField
                    name="city"
                    hintText="City"
                    floatingLabelText="City"
                    onChange={this.onChangeText}
                    type="text"
                    value={this.state.city}
                />
                Gender
                <RadioButtonGroup
                    onChange={this.onChangeGender}
                    name="gender"
                    defaultSelected={this.state.gender === undefined ? null : this.state.gender.toString()}
                    style={{width: "80%", textAline: "center", marginLeft: "20%"}}>
                    <RadioButton
                        value="true"
                        label="Male"
                    />
                    <RadioButton
                        value="false"
                        label="Female"
                    />
                </RadioButtonGroup>
                <DatePicker
                    name="birthDate"
                    onChange={this.onChangeDate}
                    defaultDate={new Date(this.state.birthDate)}
                    floatingLabelText="Birth Date"
                    autoOk={false}
                    disableYearSelection={false}
                />

            </Dialog>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        dialog: state.pageStatus.dialog,
        user: state.user,
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        addSnackText: addSnackText,
        closeSnackText: closeSnackText,
        showDialog: showDialog,
        closeDialog: closeDialog,
        addUserToState: addUserToState,
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileDialog);