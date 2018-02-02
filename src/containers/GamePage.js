import React, {Component} from 'react';
import Register from "../components/Register";
import Login from "../components/Login";
import {addUserToState} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {parseInitializer} from "../init/parsInit";

let Parse = parseInitializer();
const Game = Parse.Object.extend("Game");
let query = new Parse.Query(Game);
let subscription;

class GamePage extends Component {
    constructor(props){
        super(props);
        if(!this.props.user){
            window.open("/" , "_self");
        }
        this.state = {
            PositionHome: 0,
            PositionGuest: 0,
        };
        this.throwTas = this.throwTas.bind(this);
        //todo game id should be in redux state
        query.equalTo("objectId", "VNFGRFATyP");
        subscription = query.subscribe();
        subscription.on('update', (object) => {
            this.setState({
                PositionHome: object.get('PositionHome'),
                PositionGuest: object.get('PositionGuest'),
            })
        });
    }




    throwTas(){
        let user = this.props.user;
        let userId = user.id;
        let rand = Math.floor((Math.random() * 6) + 1);
        query.first({
            success: function(object) {
                let currentPosition = object.get('PositionHome');
                // noinspection JSAnnotator
                object.set("PositionHome" , +currentPosition + rand);
                object.save();
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });

    }

    render() {
        return (
            <div>
                <h1 id={"home"}>{this.state.PositionHome}</h1><br/>
                <h1 id={"guest"}>{this.state.PositionGuest}</h1><br/>
                <button onClick={this.throwTas}>Tas Bendaz</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
