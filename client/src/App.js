import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router";
import Sequencer from "./components/Sequencer";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import NewUser from "./components/NewUser";
import Home from "./components/Home";
import Pad from "./components/Pad";
import Account from "./components/Account";

import useUserStore from "./stores/UserStore.js";

function App() {
  // const [errors, setErrors] = useState(null);

  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="app">
      <div className="bar">
        <NavBar />
      </div>
      <Routes>
        <Route path="/sequencer" element={<Sequencer />} />
        <Route path="/account" element={<Account />} />
        <Route path="/signup" element={<NewUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pad" element={<Pad />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
