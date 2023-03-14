import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login({ setCurrentUser }) {

    const navigate = useNavigate()

    const [ formData, setFormData ] = useState({
        username: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({...formData, [name]: value})
    }

    const login = (e) => {
        e.preventDefault()
        fetch("/login",{
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(formData)
        }).then(r => {
            if(r.ok) {
                r.json().then(user => {
                    setCurrentUser(user)
                    navigate('/')
                })
            }
        })
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={login}>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    placeholder="username"
                />
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="password"
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login