import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/const";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Header from "./Header";

function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(formData);
    setFormData({
      email: "",
      password: "",
    });

    // Supongamos que formData es un objeto que contiene los valores del formulario
    const { email, password } = formData;

    if (!email || !password) {
      // Si alguno de los campos está vacío
      alert("Por favor, completa todos los campos");
    } else {
      // Si los campos no están vacíos, realizar la solicitud al servidor
      const req = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (req.status === 200) {
        // Si el inicio de sesión es exitoso
        alert("Inicio de sesión exitoso");
        const res = await req.json();
        login(res);
        navigate("/");
      } else if (req.status === 401) {
        // Si la contraseña es incorrecta
        alert("Contraseña incorrecta. Por favor, verifica tus credenciales.");
      } else if (req.status === 404) {
        // Si el usuario no está registrado
        alert("Usuario no registrado. Por favor, regístrate.");
      } else {
        // En caso de otros errores
        alert("Error al iniciar sesión");
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
        <button>LOGIN</button>
      </form>
    </div>
  );
}

export default LoginForm;
