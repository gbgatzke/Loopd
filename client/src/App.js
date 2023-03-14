import './App.css';
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'
import { useNavigate } from 'react-router';
import NavBar from "./components/NavBar"
import Login from "./components/Login"
import NewUser from "./components/NewUser"
import Home from './components/Home'

function App() {

  const [ currentUser, setCurrentUser ] = useState(null)
  const navigate = useNavigate()

  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
    })
    setCurrentUser(null)
    navigate('/')
  }

  return (
    <div >
      <NavBar user={currentUser} handleLogout={handleLogout}/>
      <Routes>
        <Route path="/signup" element={<NewUser setCurrentUser={setCurrentUser}/>}/>
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser}/>}/>
        <Route path="/" element={<Home user={currentUser}/>}/>
      </Routes>
    </div>
  );
}

export default App;
