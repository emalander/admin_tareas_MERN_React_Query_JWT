import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import server from './server'; // Asegúrate de que este es el nombre de tu archivo

dotenv.config();

connectDB();

const port = 4001; // Usaremos el puerto 4001 para evitar el conflicto

server.listen(port, () => {
  console.log(colors.cyan(`REST API funcionando en el puerto ${port}`));
});
