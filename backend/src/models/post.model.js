import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      maxLength: 20,
      minLength: 3,
    },
    titulo: {
      type: String,
      required: true,
    },
    contenido: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PostModel = model("post", postSchema);
