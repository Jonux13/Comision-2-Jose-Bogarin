import { PostModel } from "../models/post.model.js";

// Controlador para crear post.
export const ctrlCreatePost = async (req, res) => {
  const userId = req.user._id;

  try {
    const { titulo, descripcion, imageURL } = req.body;

    const newPost = new PostModel({
      autor: userId,
      titulo,
      descripcion,
      imageURL,
    });

    await newPost.save();

    // Poblar el campo 'autor' con 'username'
    const populatedPost = await PostModel.findById(newPost._id).populate('autor', 'username');
    console.log('Post poblado:', populatedPost);

    return res.status(201).json(populatedPost);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};






// Controlador para obtener todos los post.
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


// Controlador para obtener un post por su ID
export const ctrlGetPostById = async (req, res) => {

    const { postId } = req.params;
    try {
        const post = await PostModel.findOne({ _id: postId }, ["-__v"]);
        if (!post) return res.sendStatus(404);
        res.json(post);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};


// Controlador para actualizar un post por su ID
export const ctrlUpdatePostById = async (req, res) => {

    const { postId } = req.params;

    try {
        const updatePost = await PostModel.findOneAndUpdate({ _id: postId },
            req.body,
            { new: true },
            );
        res.json(updatePost)   
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

// Controlador para eliminar un post por su ID
export const ctrlDeletePostById = async (req, res) => {

    const { postId } = req.params;
    try {
        await PostModel.findOneAndDelete({ _id: postId });
        res.sendStatus(200)
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};