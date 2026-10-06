import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"

import { todoService } from "../services/todo.service.js"
import { userService } from "../services/user.service.js"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import { SET_IS_LOADING, SET_FILTER_BY } from "../store/todo-reducer.js"

import { loadTodos,removeTodo,saveTodo } from "../store/actions/todo.js"

const {  useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux
const { useState } = React



export function TodoIndex() {

    const todos= useSelector(storeState => storeState.todoModule.todos)
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const [colors, setColors] = useState()
    
    //console.log('logged in user:',loggedInUser)
    
    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()
    const defaultFilter = todoService.getFilterFromSearchParams(searchParams)
    const filterBy= useSelector(storeState => storeState.todoModule.currFilterBy)
    
    const dispatch = useDispatch()


     useEffect(() => {
        dispatch({ type: SET_FILTER_BY, defaultFilter }) 
    }, [])

    useEffect(() => {if (loggedInUser) getUserColor()}, [loggedInUser])

    useEffect(() => {
        dispatch({ type: SET_FILTER_BY, filterBy })
        setSearchParams(filterBy)
        console.log('F',filterBy)
        loadTodos(filterBy)
    }, [filterBy])

    function onRemoveTodo(todoId) {
      removeTodo(todoId)
     .then(() => showSuccessMsg('todo removed'))
     .catch(err => {
                console.log('Cannot remove todo', err)
                showErrorMsg('Cannot remove todo')
            })
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        saveTodo(todoToSave)
            .then((savedTodo) => {
                showSuccessMsg(`Todo is ${(savedTodo.isDone)? 'done' : 'back on your list'}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo ' + todo._id)
            })
    }

    function getUserColor(){
        if (!loggedInUser) return 
        return userService.getById(loggedInUser._id)
        .then(user => {
            //console.log('user', user)
            setColors({bgColor: user.bgColor,color: user.color})
        })
    }

    
    
   
    
    if (!todos){ {dispatch({ type: SET_IS_LOADING, isLoading: true })} return <div>Loading...</div> }
    else dispatch({ type: SET_IS_LOADING, isLoading: false })
    return (
        <section style={colors ? { backgroundColor: colors.bgColor } : {}} className="todo-index">
            <TodoFilter loadTodos={loadTodos} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} colors={colors} />
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo}  />
            </div>
        </section>
    )
}