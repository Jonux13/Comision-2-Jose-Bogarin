import { Router } from "express";
import {
  ctrlCreateComment,
  ctrlGetCommentById,
  ctrlGetCommentsByPostId,
} from "../controllers/comment.controllers.js"; // Corregir aquí
import { validateToken } from "../middleware/auth.js";

const commentRouter = Router();

commentRouter.use(validateToken);

commentRouter.post("/:postId/comment", ctrlCreateComment);

commentRouter.get("/:postId", ctrlGetCommentsByPostId);

commentRouter.get("/comment/:commentId", ctrlGetCommentById);

export { commentRouter };
