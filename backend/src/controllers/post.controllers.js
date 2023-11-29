import { PostModel } from "../models/post.model.js";



export const ctrlCreatePost = async (req, res) => {
  try {
    // if (!req.user || !req.user._id) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }

    const newPostData = {
      user: req.user.user, // Asigna el nombre de usuario del usuario autenticado
      titulo: req.body.titulo,
      contenido: req.body.contenido,
    };

    const newPost = await PostModel.create(newPostData);

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




// Ruta GET para obtener todos los post.
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