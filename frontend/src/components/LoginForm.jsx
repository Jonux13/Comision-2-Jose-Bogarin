
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { API_URL } from '../utils/const';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';


function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const { login  } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const navigate = useNavigate()

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(formData);
    setFormData({
      email: '',
      password: ''
    });

    const req = await fetch(`${API_URL}/user/login`,{
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      },
    });

    if(req.status === 200) {
      alert("inicio de sesión exitoso");
    } else {
      alert("Error al iniciar sesión");
    }
    
    const res = await req.json()
    login(res);
    navigate("/")
  
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder='my-email@email.com'  name='email'
          value={formData.email}
          onChange={handleInputChange}/>
        <input type="password" placeholder='*********'   name='password'
          value={formData.password}
          onChange={handleInputChange}/>
        <button>Login</button>
      </form>
    </div>
  )
}

export default LoginForm