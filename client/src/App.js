import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { useNavigate } from "react-router";
import Sequencer from "./components/Sequencer";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import NewUser from "./components/NewUser";
import Home from "./components/Home";
import Pad from "./components/Pad";
import Account from "./components/Account";

import useUserStore from './stores'

function App() {
  // const [currentUser, setCurrentUser] = useState(null);
  const [userSeqs, setUserSeqs] = useState([]);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const fetchUser = useUserStore((state) => state.fetchUser)

  useEffect(() =>{
    fetchUser()
  }, [])

  // useEffect(() => {
  //   fetch("/me").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => {
  //         setCurrentUser(user);
  //         setUserSeqs(user.sequences);
  //       });
  //     } else {
  //       r.json().then((errors) => setErrors(errors));
  //     }
  //   });
  // }, []);

  // const handleLogout = () => {
  //   fetch("/logout", {
  //     method: "DELETE",
  //   });
  //   setCurrentUser(null);
  //   navigate("/");
  // };

  const deleteSequence = (id) => {
    console.log(id);
    fetch(`/sequences/${id}`, {
      method: "DELETE",
    });
    const updatedSeqs = userSeqs.filter((seq) => seq.id !== id);
    setUserSeqs(updatedSeqs);
    navigate("/sequencer");
  };

  // const updateUser = (updatedUser) => {
  //   setCurrentUser(updatedUser);
  //   navigate("/");
  // };

  return (
    <div className='app'>
      <div className="bar">
        <NavBar />
      </div>
      <Routes>
        <Route
          path="/sequencer"
          element={
            <Sequencer
              // currentUser={currentUser}
              // setCurrentUser={setCurrentUser}
              userSeqs={userSeqs}
              setUserSeqs={setUserSeqs}
              deleteSequence={deleteSequence}
            />
          }
        />
        <Route
          path="/account"
          element={
            <Account />
          }
        />
        <Route
          path="/signup"
          element={<NewUser 
            // setCurrentUser={setCurrentUser} 
            />}
        />
        <Route
          path="/login"
          element={<Login 
            // setCurrentUser={setCurrentUser} 
            />}
        />
        <Route path="/pad" element={<Pad />} />
        <Route path="/" element={<Home 
        // user={currentUser} 
        />} />
      </Routes>
    </div>
  );
}

export default App;
