import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { API_URL } from '../utils/const';

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(formData);
    setFormData({
      username: '',
      email: '',
      password: ''
    });

    const req = await fetch(`${API_URL}/user/register`,{
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      },
    });

    if(req.status === 201) {
      alert("Usuario registrado exitosamente");
    } else {
      alert("Error al registrar un usuario");
    }
    
    navigate("/login")
  

    

  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };



  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
   
        <input type="url" 
          placeholder="www.my-avatar.com" 
          name="avatar" 
          value={formData.avatar}
          onChange={handleInputChange}
          />
          

        <input
          type="text"
          placeholder='Joe Doe'
          name='username'
          value={formData.username}
          onChange={handleInputChange}
        />

        <input
          type="email"
          placeholder='my-email@email.com'
          name='email'
          value={formData.email}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder='*********'
          name='password'
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;
