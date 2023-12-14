// Importa los módulos necesarios
import React, { useState } from 'react';
import Modal from 'react-modal';
import { MdAddAPhoto } from 'react-icons/md';


// Función principal que renderiza el componente
const ModalForm = ({ isOpen, onRequestClose, onSubmit }) => {
  // Estado para gestionar los valores del formulario
  const [avatar, setAvatar] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!avatar || !title || !description) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    // Validación de URL
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlRegex.test(avatar)) {
      alert('Por favor, ingresa una URL válida para la imagen.');
      return;
    }
    onSubmit({ imageURL: avatar, titulo: title, descripcion: description });
    // Limpia los campos después de enviar
    setAvatar('');
    setTitle('');
    setDescription('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h2>Agregar Nuevo Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="avatar">Image (URL)</label>
            <div className="avatar-upload">
              <input
                type="text"
                id="avatar"
                placeholder="Ingrese la URL del avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
              <label htmlFor="avatar" className="avatar-label">
                <MdAddAPhoto />
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              placeholder="Ingrese el título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              placeholder="Ingrese la descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button className='btn-modal' type="submit">Enviar</button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalForm;