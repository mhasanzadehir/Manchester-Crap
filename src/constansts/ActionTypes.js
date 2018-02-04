export const ADD_USER = 'ADD_USER';
export const ADD_GAME_ID = 'ADD_GAME_ID';
export const ADD_IS_HOME = 'ADD_IS_HOME';
export const INIT_PAGE = 'INIT_PAGE';
export const RESET_STATE = 'RESET_STATE';

export function addUserToStateUnsafe(user) {
    return{
        type: ADD_USER,
        user
    };
}

export function addGameIdToStateUnsafe(gameId) {
    return{
        type: ADD_GAME_ID,
        gameId
    };
}

export function addIsHomeToStateUnsafe(isHome) {
    return{
        type: ADD_IS_HOME,
        isHome
    };
}

export function initializePage() {
    return{
        type: INIT_PAGE
    };
}

export function resetState(state) {
    return{
        type: RESET_STATE,
        state
    }
}