import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
// import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers'
// import {APP_NAME} from "./constansts/AppDetail";
// import {INIT_PAGE, resetState} from "./constansts/ActionTypes";
// import localStorageDump from "./reducers/localStorageDump";
// import * as promise from "promise";
// import logger from 'redux-logger';

// export const history = createHistory();

// const enhancers = [];
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

// enhancers.push(window.devToolsExtension());
//
// const composedEnhancers = compose(
//     applyMiddleware(thunk),
//     ...enhancers
// );
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
// function localStorageLoad(store){
//     return next => action => {
//         // localStorage.removeItem(APP_NAME);
//         if (action.type === INIT_PAGE) {
//             try {
//                 const storedState = JSON.parse(
//                     localStorage.getItem(APP_NAME)
//                 );
//                 console.log(storedState);
//                 if (storedState) {
//                     store.dispatch(resetState(storedState));
//                 }
//                 return;
//             } catch (e) {
//             }
//         }
//         next(action);
//     }
// }
//
//
// function localStorageDump(store) {
//     return next => action => {
//         const state = store.getState();
//         localStorage.setItem(APP_NAME, JSON.stringify(state));
//         next(action);
//         console.log("local Storage Dump", localStorage.getItem(APP_NAME))
//     }
// }

export default createStore(rootReducer, applyMiddleware(thunk));
