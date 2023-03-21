import { useState } from "react";

function EditName({ currentUser, updateUser }) {
  const [errors, setErrors] = useState(null);
  const [editForm, setEditForm] = useState({
    name: currentUser.name,
    username: currentUser.username,
  });

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
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input name="name" value={editForm.name} onChange={handleChange} />
        <label htmlFor="username">Username: </label>
        <input
          name="username"
          value={editForm.username}
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

export default EditName;
