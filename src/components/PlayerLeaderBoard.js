import React, {Component} from "react";
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import {parseInitializer} from "../init/ParseInit";
import {AVATAR, FIRST_NAME, LAST_NAME, SCORE} from "../constansts/DBColumn";

class PlayerLeaderBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data : this.props.players
        };
    }

    render() {
        return (
            <div>
                <List>
                    <Subheader>Leader Board</Subheader>
                    {this.state.data.map(function(item, i){
                        if (item.get(FIRST_NAME)) {
                            console.log(item.get(AVATAR));
                            return <ListItem
                                key={i}
                                primaryText={item.get(FIRST_NAME) + " " + item.get(LAST_NAME)}
                                leftAvatar={<Avatar src={item.get(AVATAR)} />}
                                secondaryText={item.get(SCORE)}
                                />
                        }
                    })}
                    </List>
            </div>);

    }

}

export default PlayerLeaderBoard;
