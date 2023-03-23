import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login({ setCurrentUser }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = (e) => {
    e.preventDefault();
    fetch("/login", {
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
          setErrors(err);
          console.log(errors.errors);
        });
      }
    });
  };

  return (
    <div >
      <h1>Login</h1>
      <div 
      class="flex justify-center"
      >
        <form onSubmit={login}>
          <div>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="username"
              class="block w-50 rounded-md border-gray-300 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 m-5"
            />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password"
              class="w-50 rounded-md border-gray-300 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50  mt-2"
            />
          </div>
          <button className="button" type="submit">
            Login
          </button>
        </form>
      </div>

      {errors
        ? errors.errors.map((err) => <p className="error">{err}</p>)
        : null}
    </div>
  );
}

export default Login;
