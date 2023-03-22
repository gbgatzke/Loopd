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
    <div class="mx-auto max-w-xl">
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            class="mb-1 block text-sm font-medium text-gray-700"
          >
            Name:{" "}
          </label>
          <input
            name="name"
            value={editForm.name}
            onChange={handleChange}
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="username"
            class="mb-1 block text-sm font-medium text-gray-700"
          >
            Username:{" "}
          </label>
          <input
            name="username"
            value={editForm.username}
            onChange={handleChange}
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        <button type="submit">Save changes!</button>
      </form>
      {errors
        ? errors.errors.map((err) => <p className="error">{err}</p>)
        : null}
    </div>
  );
}

export default EditName;
