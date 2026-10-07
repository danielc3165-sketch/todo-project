import { store } from "../store.js"
import { SET_TODOS, REMOVE_TODO, ADD_TODO, EDIT_TODO, SET_IS_LOADING } from "../todo-reducer.js"

import { todoService } from "../../services/todo.service.js"
import { userService } from "../../services/user.service.js"

export function loadTodos(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return todoService.query(filterBy)
        .then(todos => {
            //console.log('loadTodos', todos)
            store.dispatch({ type: SET_TODOS, todos })
            return todos
        })
        .finally(()=>store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}

export function removeTodo(todoId) {
    if(!confirm('Are you sure?')) return
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    
    const loggedInUser = userService.getLoggedinUser()
    userService.getById(loggedInUser._id)
    .then(user => {
        userService.addActivities(user, 'Deleted a todo', todoId)
    })

    return todoService.remove(todoId)
        .then(() => store.dispatch({ type: REMOVE_TODO, todoId }))
        .finally(()=>store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}

export function saveTodo(todo) {
    //console.log('todo to save',todo)
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const typeCmd = todo._id ? EDIT_TODO : ADD_TODO
    const act = todo._id ? 'Update a todo' : 'Add a todo'

    const loggedInUser = userService.getLoggedinUser()
    userService.getById(loggedInUser._id)
    .then(user => {
        console.log('user for act',user)
        userService.addActivities(user, act, todo._id)
    })

    return todoService.save(todo)
        .then(savedTodo => {
            store.dispatch({ type: typeCmd, todo: savedTodo })
            return savedTodo
        })
        .finally(()=>store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}