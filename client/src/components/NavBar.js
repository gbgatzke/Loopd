import { NavLink } from 'react-router-dom'

function NavBar({ user, handleLogout }) {

    if(!user) {
        return(
            <div>
                <NavLink to="/login">
                    <button>Login</button>
                </NavLink>
                <NavLink to="/signup">
                    <button>Sign Up</button>
                </NavLink>
            </div>
        )
    }

    return(
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default NavBar