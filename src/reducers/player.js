import * as type from '../constansts/ActionTypes'

export default function (state = null , action) {
    switch (action.type){
        case type.ADD_PLAYER:
            return action.player;
        default:
            return state;
    }
}