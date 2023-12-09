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
