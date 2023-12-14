import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import NotFoundPage from "./pages/404Page";
import PostPage from "./pages/PostPage";
import PrivateRoutes from "./components/PrivateRoutes";
import NewPostPage from "./pages/NewPostPage";

function AppRouter() {
  return (
    <div>
      <Header />
      <Routes>
        {/* Página principal fuera de PrivateRoutes */}
        <Route path="/" element={<HomePage />} />

        {/* Página de posts accesible sin autenticación */}
        <Route path="/post" element={<PostPage />} />

        {/* Rutas privadas dentro de PrivateRoutes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/post/new" element={<NewPostPage />} />
        </Route>

        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default AppRouter;
