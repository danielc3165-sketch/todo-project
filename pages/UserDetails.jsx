
import { userService } from "../services/user.service.js"

const { useState } = React
const { useSelector } = ReactRedux

export function UserDetails() {
    
    const loggedInUser = useSelector(storeState => storeState.loggedInUser)
    const [userDetails, setUserDetails] = useState({
        name: '',
        color: '',
        bgColor: ''
    })

    function onSaveUserDetails(ev) {
        console.log('its working') 
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
    
    return <section>
    <h1>User Details</h1>
    <form className="user-details" onSubmit={onSaveUserDetails}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="color" name="color" placeholder="TodosColor" onChange={handleChange} />
        <input type="color" name="bgColor" placeholder="BgColor" onChange={handleChange} />
        <button>Save</button>
    </form>
    </section>
}
