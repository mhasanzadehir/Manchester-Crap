import * as type from '../constansts/ActionTypes'

export default function (state = null , action) {
    switch (action.type){
        case type.ADD_HELPING_USER:
            return action.user;
        default:
            return state;
    }
}