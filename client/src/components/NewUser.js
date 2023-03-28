import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/UserStore";

function NewUser({ setCurrentUser }) {
  const updateUser = useUserStore((state) => state.updateUser);
  const navigate = useNavigate();

  const [errors, setErrors] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          updateUser(user);
          navigate("/");
        });
      } else {
        r.json().then((err) => setErrors(err));
      }
    });
  };
  return (
    <div class="mx-auto max-w-xl">
      <form onSubmit={handleSubmit}>
        <div className="form_input">
          <label htmlFor="username" class="mb-1 block text-sm font-medium">
            Username:{" "}
          </label>
          <input
            class="m-auto block w-200 rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form_input">
          <label htmlFor="name" class="mb-1 block text-sm font-medium">
            Name:{" "}
          </label>
          <input
            class="m-auto block w-200 rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form_input">
          <label htmlFor="password" class="mb-1 block text-sm font-medium">
            Password:{" "}
          </label>
          <input
            class="m-auto block w-200 rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form_input">
          <label
            htmlFor="password_confirmation"
            class="mb-1 block text-sm font-medium"
          >
            Password Confirmation:{" "}
          </label>
          <input
            class="m-auto block w-200 rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
          />
        </div>
        <button className="button" type="submit">
          Submit
        </button>
      </form>
      {errors
        ? errors.errors.map((err) => <p className="error">{err}</p>)
        : null}
    </div>
  );
}

export default NewUser;
