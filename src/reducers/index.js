import { combineReducers } from 'redux'
import user from './user'
import game from './game'
import pageStatus from './pageStatus'
import helpingUser from "./helpingUser";

export default combineReducers({
    user, game, pageStatus, helpingUser
});