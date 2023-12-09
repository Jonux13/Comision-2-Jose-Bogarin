// PostPage.jsx
import React, { useEffect, useContext, useState } from 'react';
import PostCard from '../components/PostCard'; // Ajusta la ruta según tu estructura de archivos
import { AuthContext } from "../providers/AuthProvider";
import { API_URL } from "../utils/const";
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import ModalForm from '../components/ModalForm';




const PostPage = () => {
  const { auth } = useContext(AuthContext);
  const [postlists, setPostlists] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const getAllPost = async () => {
    try {
      const response = await fetch(`${API_URL}/post`, {
        headers: {
          Authorization: auth ? auth.token : null,
        },
      });
  
      if (!response.ok) {
        if (response.status === 401 && auth && !auth.token) {
          // Usuario no autenticado intentando interactuar, redirigir a la página de inicio de sesión
          setRedirect(true);
          return;
        }
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }
  
      const postDataArray = await response.json();
  
      // Obtener información del usuario para cada publicación
      const postWithUserInfo = await Promise.all(
        postDataArray.map(async (postData) => {
          const userResponse = await fetch(`${API_URL}/user/${postData.autor}`, {
            headers: {
              Authorization: auth ? auth.token : null,
            },
          });
          if (userResponse.ok) {
            const userData = await userResponse.json();
            return { ...postData, autorId: userData._id, autor: userData.username };
          } else {
            console.error(`Error al obtener información del usuario ${postData.autor}`);
            return postData;
          }
        })
      );
  
      setPostlists(postWithUserInfo);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };
  

  const handleAddPost = async (postData) => {
    try {
      const response = await fetch(`${API_URL}/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth.token,
        },
        body: JSON.stringify(postData),
      });
  
      console.log('Respuesta del servidor:', response);
  
      if (!response.ok) {
        const responseData = await response.json();
        console.error('Detalles del error:', responseData);
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }
  
      getAllPost();

    } catch (error) {
      console.error('Error al agregar el post:', error);
    } finally {
      
      setModalOpen(false);
    }
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
      <Link
        className='post-btn'
        onClick={() => {
          if (auth && auth.token) {
            setModalOpen(true);
          } else {
            console.log("Redirigiendo a la página de inicio de sesión...");
            setRedirect(true);
          }
        }}
      >
        POST
      </Link>
  
      <ModalForm
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        onSubmit={handleAddPost}
      />
      {postlists.map((postData) => {
        console.log('postData:', postData);
        return (
          <PostCard
            postData={postData}
            key={postData._id}
            postId={postData._id.trim()}
            autor={postData.autor}
            titulo={postData.titulo}
            descripcion={postData.contenido || postData.descripcion}
            descripcion_comment={postData.descripcion_comment}
            imageURL={postData.imageURL || 'https://www.buenas-vibras.com.ar/uploads/testimonios/16/vicky-min_186x186.png'}
            date={postData.createdAt || postData.fechaPublicacion}
            refresh={getAllPost}
          />
        );
      })}
    </div>
  );
  
  
};

export default PostPage;
