import { connect } from "mongoose";
import { config  } from "./config.js";

export const startConnecton = async () => {
  try {
    const db = await connect(config.MONGO_URI)
    console.log("Database is connected to:", db.connection.name)
  } catch (error) {
    console.log(error)
  }
}