import { PostModel } from "../models/post.model.js";


export const ctrlCreatePost = async (req, res) => {
    try {
        const newUser = await PostModel.create(req.body);

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



export const ctrlGetAllPost = async (req, res) => {
    try {
        const posts = await PostModel.find({}, "-__v");

        if (posts.length > 0) {
            res.status(200).json(posts);
        } else {     
            res.status(404).json({ message: 'No se encontraron usuarios.' });
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};



export const ctrlGetPostById = async (req, res) => {

    const { postId } = req.params;

    try {
        
        const user = await PostModel.findOne({ _id: postId }, "-__v");

       
        res.json(user);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};