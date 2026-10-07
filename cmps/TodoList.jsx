import { todoService } from "../services/todo.service.js"

import { SET_LOGGEDIN_USER } from "../store/user-reducer.js"

import { TodoPreview } from "./TodoPreview.jsx"


const { Link } = ReactRouterDOM
const { useState } = React

export function TodoList({ todos, onRemoveTodo, onToggleTodo, colors }) {

function handleColor({target},todoId){
     todoService.get(todoId) 
     .then(todo=>{
        console.log('todo',todo)
        todo.color=target.value
        
        todoService.save(todo)
    })
}


    return (
        <ul className="todo-list">
            {todos.map(todo =>
                <li style={colors?{backgroundColor:todo.color ? todo.color : colors.color}:{}} key={todo._id}>
                    <TodoPreview todo={todo} onToggleTodo={()=>onToggleTodo(todo)} />
                        <input type="color" onChange={(ev)=>handleColor(ev,todo._id)}/>
                    <section>
                        <button onClick={() => onRemoveTodo(todo._id)}>Remove</button>
                        <button><Link to={`/todo/${todo._id}`}>Details</Link></button>
                        <button><Link to={`/todo/edit/${todo._id}`}>Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}