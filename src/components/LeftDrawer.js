import React, {Component} from "react";
import {setLeftDrawer} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Drawer, MenuItem} from "material-ui";

class LeftDrawer extends Component {
    render() {
        return(
            <Drawer
                docked={false}
                width={250}
                open={this.props.leftDrawer}
                onRequestChange={(state) => {this.props.setLeftDrawer(state)}}
            >
                <MenuItem onClick={() => {this.props.setLeftDrawer(false)}}>About</MenuItem>
                <MenuItem onClick={() => {this.props.setLeftDrawer(false)}}>How to play</MenuItem>
            </Drawer>
        )
    }

}

const mapStateToProps = function (state) {
    return {
        leftDrawer: state.pageStatus.leftDrawer,
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        setLeftDrawer: setLeftDrawer,
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(LeftDrawer);