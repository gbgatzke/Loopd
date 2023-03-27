import { NavLink, useNavigate } from "react-router-dom";
import useUserStore from "../stores/UserStore";

function NavBar() {
  const [currentUser, updateUser, logoutUser] = useUserStore((state) => [
    state.zuUser,
    state.updateUser,
    state.logoutUser,
  ]);

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    updateUser(null);
    navigate("/");
  };

  if (!currentUser) {
    return (
      <div>
        <NavLink to="/login">
          <button className="nav-button">Login</button>
        </NavLink>
        <NavLink to="/signup">
          <button className="nav-button">Sign Up</button>
        </NavLink>
      </div>
    );
  }

  return (
    <div>
      <button className="nav-button" onClick={() => handleLogout()}>
        Logout
      </button>
      <NavLink to="/">
        <button className="nav-button">Home</button>
      </NavLink>
      <NavLink to="/account">
        <button className="nav-button">Account</button>
      </NavLink>
    </div>
  );
}

export default NavBar;
