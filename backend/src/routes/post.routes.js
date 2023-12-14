import { Router } from "express";
import {
  ctrlCreatePost,
  ctrlDeletePostById,
  ctrlGetAllPost,
  ctrlGetPostById,
  ctrlUpdatePostById,
} from "../controllers/post.controllers.js";
import { validateToken } from "../middleware/auth.js";

const postRouter = Router();

postRouter.get("/", ctrlGetAllPost);

postRouter.use(validateToken);

postRouter.post("/", ctrlCreatePost);

postRouter.get("/:postId", ctrlGetPostById);

postRouter.put("/:postId", ctrlUpdatePostById);

postRouter.delete("/:postId", ctrlDeletePostById);

export { postRouter };
