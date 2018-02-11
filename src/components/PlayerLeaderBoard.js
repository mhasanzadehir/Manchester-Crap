import React, {Component} from "react";
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import {parseInitializer} from "../init/Parse";
import {AVATAR, FIRST_NAME, LAST_NAME, SCORE} from "../constansts/DBColumn";

let Parse = parseInitializer();

function getAvatarUrl(item) {

}

class PlayerLeaderBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data : this.props.users
        };
    }

    render() {
        return (
            <div>
                <List>
                    <Subheader>Leader Board</Subheader>
                    {this.state.data.map(function(item, i){
                        if (item.get(FIRST_NAME)) {
                            return <ListItem
                                key={i}
                                primaryText={item.get(FIRST_NAME) + " " + item.get(LAST_NAME)}
                                leftAvatar={<Avatar src={item.get(AVATAR)._url} />}
                                secondaryText={item.get(SCORE)}
                                />
                        }
                    })}
                    </List>
            </div>);

    }

}

export default PlayerLeaderBoard;
