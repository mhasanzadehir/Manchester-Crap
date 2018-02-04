import * as type from '../constansts/ActionTypes'
import {APP_NAME} from "../constansts/AppDetail";

export default function (state = null , action) {
    localStorage.setItem(APP_NAME, JSON.stringify(state));
    console.log("Hi")
}