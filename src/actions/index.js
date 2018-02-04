import {addGameIdToStateUnsafe, addIsHomeToStateUnsafe, addUserToStateUnsafe} from "../constansts/ActionTypes";

export function addUserToState(user) {
    return function (dispatch) {
        dispatch(addUserToStateUnsafe(user));
    };
}

export function addGameIdToState(game) {
    return function (dispatch) {
        dispatch(addGameIdToStateUnsafe(game));
    };
}

export function addIsHomeToState(game) {
    return function (dispatch) {
        dispatch(addIsHomeToStateUnsafe(game));
    };
}