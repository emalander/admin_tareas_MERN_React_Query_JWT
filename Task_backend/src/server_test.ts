import express from 'express';

const app = express();
const port = 4001;

app.get('/api/test', (req, res) => {
    console.log("¡La ruta de prueba está funcionando!");
    res.send("¡Respuesta de la ruta de prueba!");
});

app.listen(port, () => {
    console.log(`Servidor de prueba escuchando en http://localhost:${port}`);
});
