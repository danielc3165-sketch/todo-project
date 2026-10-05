const { createStore } = Redux
import { userService } from "../services/user.service.js"

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const EDIT_TODO = 'EDIT_TODO'

export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_LOGGEDIN_USER = 'SET_LOGGEDIN_USER'
export const INCREASE_USER_BALANCE = 'INCREASE_USER_BALANCE'

const initialState = {
    todos: [],
    isLoading : false,
    currFilterBy : {},
    loggedInUser: userService.getLoggedinUser() || null
}



export function appReducer(state = initialState, cmd = {}) {
    
    
    switch (cmd.type) {
        case SET_TODOS:
            return { ...state, todos: cmd.todos }

        case REMOVE_TODO:
            return { ...state, todos: state.todos.filter(todo => todo._id !== cmd.todoId) }
        
        case ADD_TODO:
            return { ...state, todos: [...state.todos, cmd.todo] }

        case EDIT_TODO:
            return { ...state, todos: state.todos.map(todo => todo._id === cmd.todo._id ? cmd.todo : todo) }

        case SET_IS_LOADING:
            return { ...state, isLoading: cmd.isLoading }
        
            case SET_FILTER_BY:
            return { ...state, currFilterBy: cmd.filterBy }

        case SET_LOGGEDIN_USER:
            return { ...state, loggedInUser: cmd.user }
        
        case INCREASE_USER_BALANCE:
            return { ...state, loggedInUser: { ...state.loggedInUser, balance: state.loggedInUser.balance + 10 }}
        default:
            return state
        }
        
    }

export const store = createStore(appReducer)
window.gStore = store
