import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';


const Header = () => {
  const location = useLocation();
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const shouldShowAuthLinks = ['/login', '/register'].includes(location.pathname);
  const shouldHideHomePostLink = ['/login', '/register'].includes(location.pathname);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="header-container">
      <h1 className='tu-viaje'>Tu viaje!</h1>
      {!shouldHideHomePostLink && (
        <div className='home-post-link'>
          <NavLink to={"/"} className="nav-link" >Home</NavLink>
          <NavLink to={"/post"} className="nav-link" >Post</NavLink>                
        </div>
      )}
      
      {shouldShowAuthLinks && (
      <div className='login-sign-in-link'>
        <NavLink to={"/post"} className="nav-link" >POST</NavLink>
        <NavLink to={"/login"} className="nav-link" >LOG IN</NavLink>
        <NavLink to={"/register"} className="nav-link" >SIGN UP</NavLink>
      </div>
      )}
      {auth && (
        <button className='btn-home' onClick={handleLogout}>LOG OUT</button>
      )}
    </div>
  );
};

export default Header;