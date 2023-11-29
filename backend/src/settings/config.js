import "dotenv/config";


// Objeto de configuración que contiene las variables de entorno o valores predeterminados.
export const config = { 
    PORT: process.env.PORT || 3000,
    MONGO_URI:
        process.env.MONGO_URI || "mongodb://localhost:27017/login_db",
        jwt_secret: process.env.JWT_SECRET || 'secret'
}