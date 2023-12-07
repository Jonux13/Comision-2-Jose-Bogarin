// PostPage.jsx
import React, { useEffect, useContext, useState } from 'react';
import PostCard from '../components/PostCard'; // Ajusta la ruta según tu estructura de archivos
import { AuthContext } from "../providers/AuthProvider";
import { API_URL } from "../utils/const";
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';



const PostPage = () => {
  const { auth } = useContext(AuthContext);
  const [postlists, setPostlists] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const getAllPost = () => {
    fetch(`${API_URL}/post`, {
      headers: {
        Authorization: auth ? auth.token : null,
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401 && auth && !auth.token) {
            // Usuario no autenticado intentando interactuar, redirigir a la página de inicio de sesión
            setRedirect(true);
          }
          throw new Error(`Error en la solicitud: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => setPostlists(data))
      .catch((error) => console.error('Error al obtener los datos:', error));
  };

  useEffect(() => {
    getAllPost();
  }, [auth]);

  if (redirect) {
    // Redirigir a la página de inicio de sesión si el usuario no está autenticado
    return <Navigate to="/login" />;
  }


 

  return (
    <div>
      <h2 className='publicaciones-h2'>Publicaciones</h2>
      <Link className='post-btn' to="/post/new">POST</Link>
      {postlists.map((postData) => (
        <PostCard
          key={postData._id}
          postId={postData._id.trim()}
          autor={postData.autor || postData.username }
          titulo={postData.titulo}
          descripcion={postData.contenido || postData.descripcion}
          imageURL={postData.imageURL || 'https://www.buenas-vibras.com.ar/uploads/testimonios/16/vicky-min_186x186.png'}
          date={postData.createdAt || postData.fechaPublicacion}
          refresh={getAllPost}
        />
      ))}
    </div>
  );
  
};

export default PostPage;
