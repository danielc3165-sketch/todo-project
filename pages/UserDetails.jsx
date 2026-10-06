
import { userService } from "../services/user.service.js"

const { useState,useEffect } = React
const { useSelector } = ReactRedux

export function UserDetails() {
    
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const [activities,setActivities] = useState([])
    
     const [userDetails, setUserDetails] = useState({
        name: '',
        color: '',
        bgColor: ''
    })

    useEffect(()=>{
        
        getActivities()
    
    },[loggedInUser])


    function onSaveUserDetails(ev) {
        ev.preventDefault()
        userService.getById(loggedInUser._id)
        .then(user => {
            if (userDetails.name !== '') user.fullName = userDetails.name
            user.color = userDetails.color
            user.bgColor = userDetails.bgColor
            userService.update(user)
        })
    }

    function handleChange({ target }) {
        const { name, value } = target
        setUserDetails(prevUserDetails => ({ ...prevUserDetails, [name]: value }))
    }
    
    function getActivities(){
        return userService.getById(loggedInUser._id)
        .then (user=>{
            setActivities(user.activities)
        })
    }
    
    if (!loggedInUser) return <div>Loading...</div>

    return <section>
    <h1>User Details</h1>
    <form className="user-details" onSubmit={onSaveUserDetails}>
        <div>
            <p>Full Name:</p>  <input type="text" name="name" value={loggedInUser.fullName} placeholder="Name" onChange={handleChange} />
        </div>
        <div>
            <p>Todos Color:</p> <input type="color" name="color" value={loggedInUser.color} placeholder="TodosColor" onChange={handleChange} />
        </div>
        <div>
            <p>BgColor:</p> <input type="color" name="bgColor" value={loggedInUser.bgColor} placeholder="BgColor" onChange={handleChange} />
        </div>
        <button>Save</button>
    </form>
         <div>
            <p>Activities:</p>
            <ul>
                {activities.map(act=> <li  key={act.todoId}>
                   <p>Activity: {act.txt}</p>
                   <p>Date: {act.createdAt}</p>
                   <p>Todo ID: {act.todoId}</p>
                 </li>   
                )}
            </ul>
         </div>
    </section>
}
