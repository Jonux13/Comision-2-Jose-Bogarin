// commentModel.js
import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    autor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    descripcion_comment: {
      type: String,
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.pre("save", async function (next) {
  try {
  } catch (error) {
    next(error);
  }
});

export const CommentModel = model("Comment", commentSchema);
