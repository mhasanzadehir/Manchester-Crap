import * as type from '../constansts/ActionTypes'

export default function (state = null , action) {
    switch (action.type){
        case type.ADD_SNACK_TEXT:
            return {
                snackText: action.text,
                snackIsOpen: true,
            };
        case type.CLOSE_SNACK_TEXT:
            return{
                snackText: "",
                snackIsOpen: false,
            };
        default:
            return state;
    }
}