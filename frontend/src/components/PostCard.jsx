import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { API_URL } from "../utils/const";
import { Navigate } from "react-router-dom";
import ModalFormComment from "../components/ModalFormComment";
import { formatDate } from "../utils/dateUtils";

const PostCard = ({
  postData,
  avatar,
  autor,
  postId,
  titulo,
  descripcion,
  descripcion_comment,
  imageURL,
  date,
  refresh,
}) => {
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
        throw new Error(
          `Error en la solicitud: ${response.status} ${response.statusText}`
        );
      }

      return response;
    } catch (error) {
      throw error;
    }
  };

  const handleCommentSubmission = async (commentData) => {
    console.log("commentData:", commentData);
    try {
      commentData.postId = postId;

      const response = await fetch(`${API_URL}/comment/${postId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
        body: JSON.stringify({
          descripcion_comment: commentData.comentario,
          postId: commentData.postId,
        }),
      });

      console.log("Respuesta del servidor:", response);

      if (!response.ok) {
        const responseData = await response.json();
        console.error("Detalles del error:", responseData);
        throw new Error(
          `Error en la solicitud: ${response.status} ${response.statusText}`
        );
      }

      // Almacenamos el comentario en el estado del componente
      setComments([...comments, await response.json()]);
    } catch (error) {
      console.error("Error al agregar el comentario:", error);
    } finally {
      setCommentModalOpen(false);
    }
  };

  const fechaFormateada = formatDate(date);

  if (redirect) {
    // Redirigir a la página de inicio de sesión si el usuario no está autenticado
    return <Navigate to="/login" />;
  }

  return (
    <div className="post-card-container">
      <div className="post-card">
        <div className="avatar-container"></div>

        <div className="encabezado-container">
          <img className="avatar" src={avatar} alt="Imagen del post" />
          <div className="post-header">
            <h3>{titulo}</h3>
            <span>{fechaFormateada}</span>
            <p>Por: {autor}</p>
          </div>
        </div>

        <div className="post-content">
          <div className="image-container">
            <img className="post-image" src={imageURL} alt="Imagen del post" />
          </div>

          <div className="description-comments-container">
            <div className="description">
              <p>{descripcion}</p>
            </div>

            {console.log("Autor:", autor)}
            <div className="comments-section">
              {comments.map((comment) => (
                <div className="comment" key={comment._id}>
                  <h4>Comentario:</h4>
                  <p>{comment.descripcion_comment}</p>

                  <p>Por: {comment.autor.username}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="button-container">
            <button
              className="material-symbols-outlined comment-button"
              onClick={() => {
                if (auth && auth.token) {
                  setCommentModalOpen(true);
                } else {
                  Swal.fire({
                    text: "Debe logearse para interactuar!",
                    icon: "warning",
                    confirmButtonText: "OK",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setRedirect(true);
                    }
                  });
                }
              }}
            >
              add_comment
            </button>

            <button
              className="material-symbols-outlined delete-button"
              onClick={(e) => {
                e.preventDefault();

                if (auth && auth.user) {
                  console.log("auth:", auth);
                  // Verificar si el usuario autenticado es el autor del post
                  if (auth.user && auth.user._id === postData.autorId) {
                    console.log(
                      "Comparación:",
                      String(auth.user._id) === String(autor)
                    );

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
                    console.log(
                      "Usuario autenticado, pero no es el autor del post"
                    );
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
                  Swal.fire({
                    text: "Debe logearse para interactuar!",
                    icon: "warning",
                    confirmButtonText: "OK",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setRedirect(true);
                    }
                  });
                }
              }}
            >
              delete
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
