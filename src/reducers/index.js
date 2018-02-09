import { combineReducers } from 'redux'
import user from './user'
import game from './game'
import player from './player'
import pageStatus from './pageStatus'

let combineReducer = combineReducers({
    user, game, player, pageStatus
});
export default combineReducer