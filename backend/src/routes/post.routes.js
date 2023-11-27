import { Router } from "express";
import { ctrlCreatePost, ctrlGetAllPost, ctrlGetPostById } from "../controllers/post.controllers.js";



const postRouter = Router();

postRouter.get('/',ctrlGetAllPost)

postRouter.post('/',ctrlCreatePost)

postRouter.get('/:postId',ctrlGetPostById)


export {postRouter} 