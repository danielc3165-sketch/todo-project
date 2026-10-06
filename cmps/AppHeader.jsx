const { useState,useEffect } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useSelector, useDispatch } = ReactRedux

import { userService } from '../services/user.service.js'
import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'

import { SET_LOGGEDIN_USER } from '../store/user-reducer.js'

import { logout } from '../store/actions/user.js'

export function AppHeader() {
    const navigate = useNavigate()
    //const [user, setUser] = useState(userService.getLoggedinUser())
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: SET_LOGGEDIN_USER, user: userService.getLoggedinUser() })
    }, [])    



    function onLogout() {
            logout()
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    function onSetUser(user) {
        dispatch({ type: SET_LOGGEDIN_USER, user })
        navigate('/')
    }
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                {user ? (
                    < section >
                        <Link to="/user/details">Hello {user.fullname} (Balance: {user.balance})</Link>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup />
                    </section>
                )}
                <nav className="app-nav">
                    {user && <NavLink to="/user/details" >Profile</NavLink>}
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}
