import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditName from "./EditName";
import EditPassword from "./EditPassword";

function Account({ currentUser, updateUser, handleLogout }) {
  const [editName, setEditName] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const navigate = useNavigate();

  const handleDelete = () => {
    fetch(`users/${currentUser.id}`, {
      method: "DELETE",
    });
    handleLogout();
  };

  return (
    <div>
      <h1 class="text-6xl font-semibold m-5">Account!</h1>
      {!editName ? (
        <button onClick={() => setEditName(!editName)} className="button">
          Edit Name/username
        </button>
      ) : (
        <EditName currentUser={currentUser} updateUser={updateUser} />
      )}
      {!editPassword ? (
        <button onClick={() => setEditPassword(!editPassword)} className="button">
          Edit password
        </button>
      ) : (
        <EditPassword currentUser={currentUser} updateUser={updateUser} />
      )}
      <button onClick={() => handleDelete()} className="button">Delete account</button>
      <button className="button" onClick={() => navigate("/")}>
        Close
      </button>
    </div>
  );
}

export default Account;
