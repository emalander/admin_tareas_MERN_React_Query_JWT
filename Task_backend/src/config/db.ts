import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {

  try {
      const connection = await mongoose.connect(process.env.DATABASE_URL)
      console.log(connection.connection.host)
      const url = `${connection.connection.host}:${connection.connection.port}`
      console.log(colors.magenta.bold(`MongoDB Conectado en: ${url}`))
  } catch (error) {
      console.log("Error al conectar")
      process.exit(1)
  }

}