// Login.jsx
import { useState } from "react";
import { loginUser } from "../api/axios";
import "../styles/auth.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.access_token);
      alert("Login successful");
      window.location.href = "/books";
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
  <form onSubmit={handleSubmit} className="form-container">
  <h2>Login</h2>
  <input
    name="email"
    placeholder="Email"
    onChange={(e) => setForm({ ...form, email: e.target.value })}
  />
  <input
    name="password"
    type="password"
    placeholder="Password"
    onChange={(e) => setForm({ ...form, password: e.target.value })}
  />
  <button type="submit">Login</button>
  <a href="/register" className="link">Create an account</a>
</form>

  );
}

export default Login;
