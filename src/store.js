import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
// import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers'
import {defaultState} from "./constansts/ActionTypes";
import {APP_NAME} from "./constansts/AppDetail";
// import {APP_NAME} from "./constansts/AppDetail";
// import {INIT_PAGE, resetState} from "./constansts/ActionTypes";
// import localStorageDump from "./reducers/localStorageDump";
// import * as promise from "promise";
// import logger from 'redux-logger';
// export const history = createHistory();

// export default store => next => action => {
//     const { type } = action;
//     if (type === 'INIT') {
//         try {
//             const storedState = JSON.parse(
//                 localStorage.getItem('YOUR_APP_NAME')
//             );
//             if (storedState) {
//                 store.dispatch({
//                     type: 'RESET_STATE',
//                     payload: storedState
//                 });
//             }
//             return;
//         } catch (e) {
//             // Unable to load or parse stored state, proceed as usual
//         }
//     }
//
//     next(action);
// }
//
// export default store => next => action => {
//     const state = store.getState();
//     localStorage.setItem('YOUR_APP_NAME', JSON.stringify(state));
//     next(action);
// }

//

// const composedEnhancers = compose(
//
// );

// export default createStore(
//     rootReducer,
//     applyMiddleware(thunk , promise , localStorageDump, logger)
// )
//
// function logger(store) {
//     return next => action => {
//         console.log('will dispatch', action);
//         console.log('state after dispatch', store.getState());
//         return next(action);
//     }
// }
//

// localStorage.removeItem(APP_NAME);

let storedState;
let serializedState = localStorage.getItem(APP_NAME);
if (serializedState != null) {
    storedState = JSON.parse(serializedState);
} else {
    storedState = defaultState();
}
console.log(storedState);

const composedEnhancers = compose(
    applyMiddleware(thunk),
    window.devToolsExtension(),
);
export default createStore(rootReducer, storedState, composedEnhancers);
// export default createStore(rootReducer, applyMiddleware(thunk));
