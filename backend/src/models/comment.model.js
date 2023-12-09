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
commentSchema.pre('save', async function (next) {
  try {
    // Obtén el modelo del post correspondiente al postId
    const postModel = model('Post');
    const post = await postModel.findById(this.postId);

    // Si el post existe, asigna el postId al comentario
    if (post) {
      this.postId = post._id;
    }

    next();
  } catch (error) {
    next(error);
  }
});

export const CommentModel = model('Comment', commentSchema);
