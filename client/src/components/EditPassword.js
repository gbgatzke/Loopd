import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/UserStore";

function EditPassword() {
  const [errors, setErrors] = useState(null);
  const [editForm, setEditForm] = useState({
    password: "",
    password_confirmation: "",
  });
  const [currentUser, updateUser] = useUserStore((state) => [
    state.zuUser,
    state.updateUser,
  ]);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/userpassword/${currentUser.id}`, {
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
        <label htmlFor="password" class="mb-1 block text-sm font-medium">
          Password:{" "}
        </label>
        <input
          name="password"
          type="password"
          value={editForm.password}
          onChange={handleChange}
          class="m-auto block w-200 rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
        />
        <label
          htmlFor="password_confirmation"
          class="mb-1 block text-sm font-medium"
        >
          Password confirmation:{" "}
        </label>
        <input
          name="password_confirmation"
          type="password"
          value={editForm.password_confirmation}
          onChange={handleChange}
          class="m-auto block w-200 rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
        />
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

export default EditPassword;
