import React, { useState } from 'react';
import Modal from 'react-modal';

const ModalForm = ({ isOpen, onRequestClose, onSubmit, postDescription }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment) {
            alert('Por favor, completa el campo de comentario.');
            return;
        }
    
        onSubmit({ descripcion_comment: postDescription, comentario: comment });
        setComment('');
    };
    

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal"
            overlayClassName="overlay"
        >
            <div className="modal-content">
                <h2>Agregar Comentario</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="comment">Comentario</label>
                        <textarea
                            id="comment"
                            placeholder="Ingrese el comentario"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <button className='btn-modal' type="submit">Enviar</button>
                </form>
            </div>
        </Modal>
    );
};

export default ModalForm;
