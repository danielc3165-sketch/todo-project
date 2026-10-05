import { SET_TODOS, REMOVE_TODO, ADD_TODO, EDIT_TODO ,store } from "../store.js"
import { todoService } from "../../services/todo.service.js"

export function loadTodos(filterBy) {
    return todoService.query(filterBy)
        .then(todos => {
            console.log('loadTodos', todos)
            store.dispatch({ type: SET_TODOS, todos })
            return todos
        })
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => store.dispatch({ type: REMOVE_TODO, todoId }))
}

export function saveTodo(todo) {
    const typeCmd = todo._id ? EDIT_TODO : ADD_TODO

    return todoService.save(todo)
        .then(savedTodo => {
            store.dispatch({ type: typeCmd, todo: savedTodo })
            return savedTodo
        })
}