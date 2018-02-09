export const ADD_USER = 'ADD_USER';
export const ADD_PLAYER = 'ADD_PLAYER';
export const ADD_GAME_ID = 'ADD_GAME_ID';
export const ADD_IS_HOME = 'ADD_IS_HOME';
export const ADD_SNACK_TEXT = 'ADD_SNACK_TEXT';
export const CLOSE_SNACK_TEXT = 'CLOSE_SNACK_TEXT';

export function addUserToStateUnsafe(user) {
    return {
        type: ADD_USER,
        user
    };
}

export function addPlayerToStateUnsafe(player) {
    return {
        type: ADD_PLAYER,
        player
    };
}

export function addGameIdToStateUnsafe(gameId) {
    return {
        type: ADD_GAME_ID,
        gameId
    };
}

export function addIsHomeToStateUnsafe(isHome) {
    return {
        type: ADD_IS_HOME,
        isHome
    };
}

export function addSnackTextUnsafe(text) {
    return {
        type: ADD_SNACK_TEXT,
        text
    }
}

export function closeSnackTextUnsafe() {
    return {
        type: CLOSE_SNACK_TEXT
    }
}

export function defaultState() {
    return {
        user: null,
        game: null,
        player: null,
        pageStatus: {
            snackText: "",
            snackIsOpen: false,
        }
    }
}

