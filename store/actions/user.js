import { userService } from "../../services/user.service.js"
import { store } from "../store.js"
import { SET_LOGGEDIN_USER } from "../user-reduser.js"

 export function logout() {
    return userService.logout()
    .then(() => store.dispatch({ type: SET_LOGGEDIN_USER, user: null }))

}