import { userService } from "../services/user.service.js"

export const SET_LOGGEDIN_USER = 'SET_LOGGEDIN_USER'
export const INCREASE_USER_BALANCE = 'INCREASE_USER_BALANCE'

const initialState = {
    loggedInUser: userService.getLoggedinUser() || null
}

export function userReducer(state = initialState, cmd = {}) {
    
    switch (cmd.type) {
        case SET_LOGGEDIN_USER:
            return { ...state, loggedInUser: cmd.user }
        
        case INCREASE_USER_BALANCE:
            return { ...state, loggedInUser: { ...state.loggedInUser, balance: state.loggedInUser.balance + 10 }}
        default:
            return state
        }
        
    }

