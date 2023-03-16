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

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user));
      } else {
        r.json().then((errors) => console.log(errors));
      }
    });
  }, []);

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    });
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <div>
      <div className="bar">
        <NavBar user={currentUser} handleLogout={handleLogout} />
      </div>
      <Routes>
        <Route
          path="/sequencer"
          element={<Sequencer currentUser={currentUser} />}
        />
        <Route
          path="/signup"
          element={<NewUser setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/login"
          element={<Login setCurrentUser={setCurrentUser} />}
        />
        <Route path="/pad" element={<Pad />} />
        <Route path="/" element={<Home user={currentUser} />} />
      </Routes>
    </div>
  );
}

export default App;
