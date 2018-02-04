import * as type from '../constansts/ActionTypes'

export default function (state = null, action) {
    switch (action.type) {
        case type.ADD_IS_HOME:
            return action.isHome;
        default:
            return state;
    }
}

