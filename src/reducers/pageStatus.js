import * as type from '../constansts/ActionTypes'

export default function (state = null, action) {
    switch (action.type) {
        case type.ADD_SNACK_TEXT:
            return {
                ...state,
                snack: {
                    isOpen: true,
                    text: action.text,
                },
            };
        case type.CLOSE_SNACK_TEXT:
            return {
                ...state,
                snack: {
                    isOpen: false,
                    text: "",
                },
            };
        case type.SHOW_DIALOG:
            return {
                ...state,
                dialog: action.dialog,
            };
        case type.CLOSE_DIALOG:
            return {
                ...state,
                dialog: "",
            };
        case type.SIGN_IN:
            return {
                ...state,
                signed: true
            };
        case type.SIGN_OUT:
            return {
                ...state,
                signed: false
            };
        case type.SET_LEFT_DRAWER:
            return {
                ...state,
                leftDrawer: action.state
            };
        case type.SET_LOADING:
            return{
                ...state,
                loading: action.state
            };
        case type.SET_FETCH_USERS_DATA:
            return{
                ...state,
                fetchUsersData: action.state
            };
        default:
            return state;
    }
}