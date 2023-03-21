import { useState } from "react";

function EditPassword({ currentUser, updateUser }) {
  const [errors, setErrors] = useState(null);
  const [editForm, setEditForm] = useState({
    password: "",
    password_confirmation: "",
  });

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
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">Password: </label>
        <input
          name="password"
          type="password"
          value={editForm.password}
          onChange={handleChange}
        />
        <label htmlFor="password_confirmation">Password confirmation: </label>
        <input
          name="password_confirmation"
          type="password"
          value={editForm.password_confirmation}
          onChange={handleChange}
        />
        <button type="submit">Save changes!</button>
      </form>
      {errors
        ? errors.errors.map((err) => <p className="error">{err}</p>)
        : null}
    </div>
  );
}

export default EditPassword;
