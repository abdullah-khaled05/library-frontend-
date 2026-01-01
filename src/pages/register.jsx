// Register.jsx
import { useState } from "react";
import { registerUser } from "../api/axios";
import "../styles/auth.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      alert(res.data.email);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
 <form onSubmit={handleSubmit} className="form-container">
  <h2>Register</h2>
   <input
    name="name"
    placeholder="Name"
    onChange={handleChange}
  />
  <input
    name="email"
    placeholder="Email"
    onChange={handleChange}
  />
  <input
    name="password"
    type="password"
    placeholder="Password"
    onChange={handleChange}
  />
  <button type="submit">Register</button>
  <a href="/" className="link">Already have an account?</a>
</form>

  );
}

export default Register;
