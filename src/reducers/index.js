import { combineReducers } from 'redux'
import user from './user'
import gameId from './gameId'
import isHome from './isHome'
import { routerReducer } from 'react-router-redux'


export default combineReducers({
    router: routerReducer,
    user,gameId,isHome
})