import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/UserStore";

function EditName() {
  const [errors, setErrors] = useState(null);
  const [currentUser, updateUser] = useUserStore((state) => [
    state.zuUser,
    state.updateUser,
  ]);
  const [editForm, setEditForm] = useState({
    name: currentUser.name,
    username: currentUser.username,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/users/${currentUser.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    }).then((r) => {
      if (r.ok) {
        r.json().then((updatedUser) => updateUser(updatedUser));
      } else {
        r.json().then((err) => setErrors(err));
      }
    });
    navigate("/");
  };

  return (
    <div class="mx-auto max-w-xl text-black">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" class="mb-1 block text-sm font-medium">
            Name:{" "}
          </label>
          <input
            name="name"
            value={editForm.name}
            onChange={handleChange}
            class="m-auto block w-200 rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="username" class="mb-1 block text-sm font-medium">
            Username:{" "}
          </label>
          <input
            name="username"
            value={editForm.username}
            onChange={handleChange}
            class="m-auto block w-200 rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
          />
        </div>

        <button className="button" type="submit">
          Save changes!
        </button>
      </form>
      {errors
        ? errors.errors.map((err) => <p className="error">{err}</p>)
        : null}
    </div>
  );
}

export default EditName;
