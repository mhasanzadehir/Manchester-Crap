import { combineReducers } from 'redux'
import user from './user'
import game from './game'
import pageStatus from './pageStatus'

export default combineReducers({
    user, game, pageStatus
});