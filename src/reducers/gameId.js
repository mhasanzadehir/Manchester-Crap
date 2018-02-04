import * as type from '../constansts/ActionTypes'

export default function (state = null , action) {
    switch (action.type){
        case type.ADD_GAME_ID:
            return action.gameId;
        default:
            return state;
    }
}

