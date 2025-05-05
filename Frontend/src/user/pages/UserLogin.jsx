import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import instance from "../../axiosConfig.js";

function UserLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await instance.post("/user/login", form, { withCredentials: true });
      navigate(`/`);
    } catch (error) {
      console.log("Login error:", error);
    }
  }

  return (
    <div>
      <div>
        <h1>User Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoFocus
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <button
            type="submit"
          >
            Login
          </button>

        </form>
     
      </div>
    </div>
  );
}

export default UserLogin;