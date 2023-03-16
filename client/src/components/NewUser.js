import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewUser({ setCurrentUser }) {
  const navigate = useNavigate();

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
          setCurrentUser(user);
          navigate("/");
        });
      } else {
        r.json().then((err) => {
          console.log(err);
        });
      }
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form_input">
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
        </div>
        <div className="form_input">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </div>
        <div className="form_input">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <div className="form_input">
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            placeholder="Password Confirmation"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewUser;
