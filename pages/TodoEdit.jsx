import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import { INCREASE_USER_BALANCE } from "../store/user-reduser.js"
import { userService } from "../services/user.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM
const { useSelector,useDispatch } = ReactRedux 

export function TodoEdit() {

    const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo())
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedinUser)

    userService.query()
    .then(users => console.log('users', users))
    
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        if (params.todoId) loadTodo()
    }, [])

    function loadTodo() {
        todoService.get(params.todoId)
            .then(setTodoToEdit)
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setTodoToEdit(prevTodoToEdit => ({ ...prevTodoToEdit, [field]: value }))
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        todoService.save(todoToEdit)
            .then((savedTodo) => {
                navigate('/todo')
                showSuccessMsg(`Todo Saved (id: ${savedTodo._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot save todo')
                console.log('err:', err)
            })
    }

    function onIsDone({ target }) {
        if (target.checked===true){
            dispatch({ type: INCREASE_USER_BALANCE})
            userService.getById(loggedInUser._id)
            .then(user => {
                userService.update(user)
            })
        } 
    }

    const { txt, importance, isDone } = todoToEdit

    return (
        <section className="todo-edit">
            <form onSubmit={onSaveTodo} >
                <label htmlFor="txt">Text:</label>
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />

                <label htmlFor="importance">Importance:</label>
                <input onChange={handleChange} value={importance} type="number" name="importance" id="importance" />

                <label htmlFor="isDone">isDone:</label>
                <input onChange={ev=>{handleChange(ev) ,onIsDone(ev)}} value={isDone} type="checkbox" name="isDone" id="isDone" />


                <button>Save</button>
            </form>
        </section>
    )
}