import React, { useContext, useState  } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import Swal from "sweetalert2";
import { API_URL } from "../utils/const";
import { Navigate } from 'react-router-dom';


const PostCard = ({ autor, postId,  titulo, descripcion, imageURL, date, refresh }) => {
  const { auth } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);



  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/post/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: auth.token,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }
  
      return response;
    } catch (error) {
      throw error;
    }
  };
  

  if (redirect) {
    // Redirigir a la página de inicio de sesión si el usuario no está autenticado
    return <Navigate to="/login" />;
  }


return (
  <div className="post-card-container">
    <div className="post-card">
      <div className="avatar-container">
        <img className="avatar" src={imageURL} alt="Imagen del post" />
      </div>
      <div className="post-content">
        <div className="post-header">
          <h3>{titulo}</h3>
          <span>{date}</span>
        </div>
        <p>{descripcion}</p>
        <p>Por: {autor}</p>
        <div className="button-container">
          <button
            className="comment-button"
            onClick={() => {
              if (auth && auth.token) {
                setModalOpen(true);
              } else {
                console.log("Redirigiendo a la página de inicio de sesión...");
                setRedirect(true);
              }
            }}
          >
            Comentar
          </button>
          <button
  className="delete-button"
  onClick={(e) => {
    e.preventDefault();

    if (auth && auth.token) {
      // Verificar si el usuario autenticado es el autor del post
      if (auth.userId === autor) {
        // Usuario autenticado y autor del post, mostrar confirmación de eliminación
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            handleDelete(postId).then((res) => {
              if (res.status !== 200) {
                return Swal.fire({
                  icon: "error",
                  title: "Oops ...",
                  text: "Something went wrong!",
                  timer: 2500,
                });
              } else {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
                refresh();
              }
            });
          }
        });
      } else {
        // Usuario autenticado, pero no es el autor del post
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "You are not authorized to delete this post.",
          timer: 3000,
        });
      }
    } else {
      // Usuario no autenticado, redirigir a la página de inicio de sesión
      console.log("Redirigiendo a la página de inicio de sesión...");
      setRedirect(true);
    }
  }}
>
  Eliminar
</button>

        </div>
      </div>
    </div>
  </div>
);

};

export default PostCard;
