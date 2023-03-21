import { NavLink } from "react-router-dom";

function NavBar({ user, handleLogout }) {
  if (!user) {
    return (
      <div>
        <NavLink to="/login">
          <button className="button">Login</button>
        </NavLink>
        <NavLink to="/signup">
          <button className="button">Sign Up</button>
        </NavLink>
      </div>
    );
  }

  return (
    <div className="navbar">
      <button className="button" onClick={handleLogout}>
        Logout
      </button>
      <NavLink to="/">
        <button className="button">Home</button>
      </NavLink>
      <NavLink to="/account">
        <button className="button">Account</button>
      </NavLink>
    </div>
  );
}

export default NavBar;
