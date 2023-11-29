import { Schema, model, Types } from "mongoose";

const postSchema = new Schema(
  {
    user: {
      type: String,
      ref: "user",
      required: true,
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
