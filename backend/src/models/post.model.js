import { Schema, model, Types } from "mongoose";

const postSchema = new Schema(
  {
    autor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PostModel = model("post", postSchema);
