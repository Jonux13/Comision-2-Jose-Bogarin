import React, { useState } from 'react';
import ModalForm from '../components/ModalForm'; // Asegúrate de que la ruta sea correcta
import PostCard from '../components/PostCard'; // Asegúrate de que la ruta sea correcta

const NewPostPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postList, setPostList] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (formData) => {
    // Agregar la nueva publicación a la lista
    setPostList([...postList, formData]);
    // Cierra el modal después de enviar el formulario
    closeModal();
  };

  return (
    <div>
      <h1>New Post Page</h1>
      <button onClick={openModal}>Agregar Nuevo Elemento</button>
      <ModalForm isOpen={isModalOpen} onRequestClose={closeModal} onSubmit={handleFormSubmit} />
      {/* Mostrar las publicaciones existentes */}
      {postList.map((post, index) => (
        <PostCard
          key={index}
          postId={index.toString()} // Puedes usar un ID único aquí
          autor={post.autor}
          titulo={post.title}
          descripcion={post.description}
          imageURL={post.avatar}
          date={new Date().toLocaleDateString()} // Otra opción es incluir la fecha actual
          refresh={() => {}}
        />
      ))}
    </div>
  );
};

export default NewPostPage;

