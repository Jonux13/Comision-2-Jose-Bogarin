import { connect } from "mongoose";
import { config  } from "./config.js";


// Función asincrónica para iniciar la conexión a la base de datos.
export const startConnecton = async () => {
  try {
     // Utiliza la función 'connect' de mongoose para establecer la conexión a la base de datos.
    const db = await connect(config.MONGO_URI)
       // Imprime un mensaje en la consola indicando que la base de datos está conectada y muestra su nombre.
    console.log("Database is connected to:", db.connection.name)
  } catch (error) {
    console.log(error)
  }
}