export const ADD_USER = 'ADD_USER';

export function addUserToStateUnsafe(user) {
    return({
        type: ADD_USER,
        user
    });
}