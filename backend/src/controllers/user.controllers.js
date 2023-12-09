import { UserModel } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { createJWT } from '../utils/jwt.js';





export const ctrlCreateUser = async (req, res) => {
    try {
        // Obtiene la contraseña del cuerpo de la solicitud.
        const { password } = req.body;

        // Aplica el hash a la contraseña antes de almacenarla.
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea un nuevo usuario en la base de datos con la contraseña hasheada.
        const newUser = await UserModel.create({ ...req.body, password: hashedPassword });

        res.status(201).json(newUser);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};





export const ctrlLoginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await UserModel.findOne({ email });
  
      if (!user || !user.password) {

        return res.status(404).json({ error: 'User not found' });
      }
    
      // if (!user.password) {
      //   return res.status(401).json({ error: 'Invalid credentials' });
      // }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {

        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = await createJWT({ userId: user._id });
  
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(500).json({ error: "Couldn't login user" });
    }
  };
  
  
  

// Controlador para obtener información de un usuario por su ID.
export const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findOne({ _id: userId }, ["-__v"]);
    if (!user) return res.sendStatus(404);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};



