import * as type from '../constansts/ActionTypes'

export default function (state = null , action) {
    switch (action.type){
        case type.ADD_USER:
            return{
                user: action.user
            };
        default:
            return state;
    }
}