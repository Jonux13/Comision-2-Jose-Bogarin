import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

function AuthProvider({ children }) {

 const [auth, setAuth] = useState({undefined})

 const login = ({user, token}) => {
    setAuth({user, token})
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
};


const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuth(null);
};

useEffect(() => {
    const userString = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    console.log("userString:", userString);
    console.log("token:", token);

    // Verificar si userString o token son undefined o null
    if (!userString || !token) {
        // Si userString o token son undefined o null, limpiar y establecer auth a null
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setAuth(null);
        return;
    }

    try {
        // Intentar realizar JSON.parse
        const user = JSON.parse(userString);
        setAuth({ user, token });
    } catch (error) {
        console.error("Error al hacer JSON.parse:", error);
        // Manejar el error de JSON.parse, limpiar y establecer auth a null
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setAuth(null);
    }
}, []);


  return (
    <AuthContext.Provider value={{auth, login, logout}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider