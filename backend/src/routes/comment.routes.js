import { Router } from "express";
import { ctrlCreateComment } from "../controllers/comment.controllers.js";
import { validateToken } from "../middleware/auth.js";



const commentRouter = Router();

commentRouter.use(validateToken);

commentRouter.post('/:postId/comment', ctrlCreateComment);

export { commentRouter };
