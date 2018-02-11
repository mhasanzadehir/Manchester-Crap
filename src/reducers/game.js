import * as type from '../constansts/ActionTypes'

export default function (state = null , action) {
    switch (action.type){
        case type.ADD_GAME_ID:
            return {
                ...state,
                gameId: action.gameId
            };
        case type.ADD_GAME_INDEX:
            return {
                ...state,
                index: action.index,
            };
        default:
            return state;
    }
}