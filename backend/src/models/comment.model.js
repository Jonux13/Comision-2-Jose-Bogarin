// commentModel.js
import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
  {
    autor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    descripcion_comment: {
      type: String,
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware para asignar el postId antes de guardar el comentario
// Middleware para asignar el postId antes de guardar el comentario
commentSchema.pre('save', async function (next) {
  try {
    // No es necesario buscar el modelo del post, ya que ya tienes el postId
    // this.postId debería contener el _id del post
    next();
  } catch (error) {
    next(error);
  }
});


export const CommentModel = model('Comment', commentSchema);
