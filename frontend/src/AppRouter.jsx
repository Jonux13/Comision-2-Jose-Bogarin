import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import NotFoundPage from './pages/404Page';
import PostPage from './pages/PostPage';
import PrivateRoutes from './components/PrivateRoutes';



function AppRouter() {
  return (
    <Routes>

      <Route element={<PrivateRoutes />}>
      <Route path="/" element= {<HomePage />} />
      <Route path="/post" element= {<PostPage />} />
     </Route>
   

      <Route path="/register" element= {<RegisterForm />} />
      <Route path="/login" element= {<LoginForm />} />

      <Route path="*" element= {<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter