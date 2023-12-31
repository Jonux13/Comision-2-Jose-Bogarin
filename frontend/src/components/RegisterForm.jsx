import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/const";

function RegisterForm() {
  const [formData, setFormData] = useState({
    avatar: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    setFormData({
      avatar: "",
      username: "",
      email: "",
      password: "",
    });

    const req = await fetch(`${API_URL}/user/register`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (req.status === 201) {
      Swal.fire({
        text: "Usuario registrado exitosamente",
        icon: "success",
        confirmButtonText: "OK",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Redirige después de hacer clic en "OK"
          const res = await req.json();
          login(res);
          navigate("/");
        }
      });
      // alert("Usuario registrado exitosamente");
    } else {
      Swal.fire({
        text: "Error al registrar un usuario",
        icon: "success",
        confirmButtonText: "OK",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Redirige después de hacer clic en "OK"
          const res = await req.json();
          login(res);
          navigate("/");
        }
      });
      // alert("Error al registrar un usuario");
    }

    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Sing up</h2>
        <label>
          Avatar:
          <input
            type="url"
            placeholder="www.my-avatar.com"
            name="avatar"
            value={formData.avatar}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Username:
          <input
            type="text"
            placeholder="Joe Doe"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            placeholder="my-email@email.com"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            placeholder="*********"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit">SIGN UP</button>
      </form>
    </div>
  );
}

export default RegisterForm;
