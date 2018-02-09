import * as type from '../constansts/ActionTypes'

export default function (state = null , action) {
    switch (action.type){
        case type.ADD_GAME_ID:
            return {
                ...state,
                id: action.gameId
            };
        case type.ADD_IS_HOME:
            return {
                ...state,
                isHome: action.isHome,
            };
        default:
            return state;
    }
}