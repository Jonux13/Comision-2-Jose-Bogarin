import { CommentModel } from "../models/comment.model.js";

// Controlador para crear comentarios.
export const ctrlCreateComment = async (req, res) => {
  const userId = req.user._id;

  try {
    const { postId, descripcion_comment } = req.body;

    const newComment = new CommentModel({
      autor: userId,
      descripcion_comment, 
      postId,
    });

    await newComment.save();

    // Poblar el campo 'autor' con 'username'
    const populatedComment = await CommentModel.findById(newComment._id).populate('autor', 'username');

    return res.status(201).json(populatedComment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



// Controlador para obtener comentarios por postId.
export const ctrlGetCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Console log para verificar el postId antes de la consulta
    console.log('PostId a buscar:', postId);

    // Verifica que postId no sea null o undefined antes de la consulta
    if (!postId) {
      console.error('Error: postId no proporcionado');
      return res.status(400).json({ error: 'Bad Request', details: 'postId not provided' });
    }

    // Realiza la lógica para obtener el comentario asociado al postId
    const comment = await CommentModel.findOne({ postId });

    // Console log para imprimir el resultado de la consulta
    console.log('Comentario encontrado:', comment);

    // Devuelve el comentario como respuesta
    return res.status(200).json(comment);
  } catch (error) {
    console.error('Error al obtener el comentario:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};




export const ctrlGetCommentById = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const comment = await CommentModel.findById(commentId);
    
    if (!comment) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    return res.status(200).json(comment);
  } catch (error) {
    console.error('Error al obtener el comentario:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};