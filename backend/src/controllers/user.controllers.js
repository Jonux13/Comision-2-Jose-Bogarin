import { UserModel } from "../models/user.model.js";



// Controlador para la creación de un nuevo usuario
export const ctrlCreateUser = async (req, res) => {
    try {
        // Utiliza el modelo de usuario para crear un nuevo usuario en la base de datos, utilizando los datos del cuerpo de la solicitud (req.body).
        const newUser = await UserModel.create(req.body);

        // Devuelve una respuesta con el código de estado 201 (Created) y el nuevo usuario en formato JSON.
        res.status(201).json(newUser);
    } catch (error) {
        // Si ocurre un error durante la creación del usuario, imprímelo en la consola para propósitos de depuración.
        console.log(error);

        // Devuelve una respuesta con el código de estado 500 (Internal Server Error) si hay un problema en el servidor.
        res.sendStatus(500);
    }
};



// Controlador para obtener todos los usuarios
export const ctrlGetAllUsers = async (req, res) => {
    try {
        // Utiliza UserModel.find() para obtener todos los usuarios
        const users = await UserModel.find({}, "-__v");

        // Verifica si hay usuarios y devuelve la respuesta
        if (users.length > 0) {
            res.status(200).json(users);
        } else {
            // Si no hay usuarios, devuelve un mensaje personalizado
            res.status(404).json({ message: 'No se encontraron usuarios.' });
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};




// Controlador para obtener un usuario por su ID
export const ctrlGetUserById = async (req, res) => {
    // Extrae el parámetro de la URL que representa el ID del usuario.
    const { userId } = req.params;

    try {
        // Utiliza el modelo de usuario para buscar un usuario en la base de datos con el ID proporcionado.
        // El "-__v" se utiliza para excluir el campo "__v" en la respuesta, que generalmente se agrega por Mongoose.
        const user = await UserModel.findOne({ _id: userId }, "-__v");

        // Devuelve la información del usuario en formato JSON.
        res.json(user);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};







