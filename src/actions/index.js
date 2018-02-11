import {
    addSnackTextUnsafe, addGameIdToStateUnsafe, addIsHomeToStateUnsafe,
    addUserToStateUnsafe, closeSnackTextUnsafe, showDialogUnsafe,
    closeDialogUnsafe, signInUnsafe, signOutUnsafe, setLeftDrawerUnsafe, setLoadingUnsafe
} from "../constansts/ActionTypes";

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

export function addSnackText(text) {
    return function (dispatch) {
        dispatch(addSnackTextUnsafe(text));
    }
}

export function closeSnackText() {
    return function (dispatch) {
        dispatch(closeSnackTextUnsafe());
    }
}

export function showDialog(dialog) {
    return function (dispatch) {
        dispatch(showDialogUnsafe(dialog))
    }
}

export function closeDialog() {
    return function (dispatch) {
        dispatch(closeDialogUnsafe())
    }
}

export function setLeftDrawer(state) {
    return function (dispatch) {
        dispatch(setLeftDrawerUnsafe(state))
    }
}

export function setLoading(state) {
    return function (dispatch) {
        dispatch(setLoadingUnsafe(state))
    }
}

export function signIn() {
    return function (dispatch) {
        dispatch(signInUnsafe())
    }
}

export function signOut() {
    return function (dispatch) {
        dispatch(signOutUnsafe())
    }
}