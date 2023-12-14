import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/const";
import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import Header from "./Header";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      Swal.fire({
        text: "Por favor, completa todos los campos",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      const req = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (req.status === 200) {
        Swal.fire({
          text: "Inicio de sesión exitoso",
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
      } else if (req.status === 401) {
        Swal.fire({
          text: "Contraseña incorrecta. Por favor, verifica tus credenciales.",
          icon: "warning",
          confirmButtonText: "OK",
        });
      } else if (req.status === 404) {
        Swal.fire({
          text: "Usuario no registrado. Por favor, regístrate.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then(async (result) => {
          if (result.isConfirmed) {
            // Redirige después de hacer clic en "OK"
            const res = await req.json();
            login(res);
            navigate("/register");
          }
        });
      } else {
        Swal.fire({
          text: "Error al iniciar sesión",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
}

export default LoginForm;
