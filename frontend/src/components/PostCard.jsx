import React, { useContext, useState,  useEffect  } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import Swal from "sweetalert2";
import { API_URL } from "../utils/const";
import { Navigate } from 'react-router-dom';
import ModalFormComment from '../components/ModalFormComment';





const PostCard = ({ postData, autor, postId, titulo, descripcion, descripcion_comment, imageURL, date, refresh }) => {
  const { auth } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [comments, setComments] = useState([]);





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
  

  const handleCommentSubmission = async (commentData) => {
    console.log('commentData:', commentData);
    try {

      commentData.postId = postId;
      
      const response = await fetch(`${API_URL}/comment/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth.token,
        },
        body: JSON.stringify({
          descripcion_comment: commentData.comentario,
          postId: commentData.postId,
        }),
      });

      console.log('Respuesta del servidor:', response);

      if (!response.ok) {
        const responseData = await response.json();
        console.error('Detalles del error:', responseData);
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }

      // Lógica para actualizar el estado de los comentarios después de agregar uno nuevo
      const newComment = await response.json(); // Asumo que el comentario recién creado viene en la respuesta
      setComments([...comments, newComment]);

    } catch (error) {
      console.error('Error al agregar el comentario:', error);
    } finally {
      setCommentModalOpen(false);
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

          {console.log('Autor:', autor)}
         <div className="comments-section">
          <h4>Comentarios:</h4>
            {comments.map((comment) => (
            <div key={comment._id}>
              <p>{comment.descripcion_comment}</p>
              
              <p>Por: {comment.autor.username}</p>
            </div>
          ))}
        </div>
          <div className="button-container">
            <button
              className="comment-button"
              onClick={() => {
                if (auth && auth.token) {
                  setCommentModalOpen(true);
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


                console.log("auth.user._id:", auth.user._id);
                console.log("Tipo de auth.user._id:", typeof auth.user._id);
                console.log("autor:", autor);
                console.log("Tipo de autor:", typeof autor);

                if (auth && auth.user) {
                  console.log("auth:", auth);
                  // Verificar si el usuario autenticado es el autor del post
                  if  (auth.user && auth.user._id ===  postData.autorId) {
                    console.log("Comparación:", String(auth.user._id) === String(autor));

                    console.log("Usuario autenticado y autor del post");
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
                    console.log("Usuario autenticado, pero no es el autor del post");
                    console.log("auth.userId:", auth.userId);
                    console.log("autor:", autor);
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

      {isCommentModalOpen && (
        <ModalFormComment
          isOpen={isCommentModalOpen}
          onRequestClose={() => setCommentModalOpen(false)}
          onSubmit={handleCommentSubmission}
          postDescription={descripcion_comment} 
        />
      )}
    </div>
  );
};

export default PostCard;
