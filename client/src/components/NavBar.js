import { NavLink } from "react-router-dom";

function NavBar({ user, handleLogout }) {
  if (!user) {
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
      <button className="nav-button" onClick={handleLogout}>
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
