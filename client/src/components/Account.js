import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditName from "./EditName";
import EditPassword from "./EditPassword";
import useUserStore from "../stores/UserStore";

function Account() {
  const [editName, setEditName] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [currentUser, updateUser, logoutUser] = useUserStore((state) => [
    state.zuUser,
    state.updateUser,
    state.logoutUser,
  ]);
  const navigate = useNavigate();

  const handleDelete = () => {
    fetch(`users/${currentUser.id}`, {
      method: "DELETE",
    });
    logoutUser();
    updateUser(null);
    navigate("/");
  };

  return (
    <div>
      <h1 class="text-6xl font-semibold m-5">Account!</h1>
      {!editName ? (
        <button onClick={() => setEditName(!editName)} className="button">
          Edit Name/username
        </button>
      ) : (
        <EditName />
      )}
      {!editPassword ? (
        <button
          onClick={() => setEditPassword(!editPassword)}
          className="button"
        >
          Edit password
        </button>
      ) : (
        <EditPassword />
      )}
      <button onClick={() => handleDelete()} className="button">
        Delete account
      </button>
      <button className="button" onClick={() => navigate("/")}>
        Close
      </button>
    </div>
  );
}

export default Account;
