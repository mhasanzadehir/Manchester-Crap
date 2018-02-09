import React, {Component} from "react";
import TextField from 'material-ui/TextField';


class TextFields extends Component {
    render() {
        return (
            <div>
                {this.props.fieldList.map((listValue) => {
                    let constFlag = false;
                    if(listValue.includes("const_")){
                        listValue = listValue.substring(6 , listValue.length);
                        constFlag = true;
                    }
                        return (
                            <div>
                                <TextField
                                    name={listValue}
                                    hintText={listValue.charAt(0).toUpperCase() + listValue.substring(1)}
                                    floatingLabelText={listValue.charAt(0).toUpperCase() + listValue.substring(1)}
                                    onChange={this.props.onChange}
                                    type={listValue === "password" ? "password" : "text"}
                                    disabled={constFlag}
                                    value={this.props.state[listValue]}
                                />
                                <br/>
                            </div>
                        )
                    }
                )}
            </div>
        )
    }
}

export default TextFields;