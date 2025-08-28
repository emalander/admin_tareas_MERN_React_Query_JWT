[README.txt](https://github.com/user-attachments/files/22026544/README.txt)
Admin de Tareas con MERN, React Query y JWT
Descripción del Proyecto
Este proyecto es un completo administrador de tareas desarrollado con la arquitectura MERN (MongoDB, Express, React y Node.js). La aplicación está diseñada para ser eficiente y segura, utilizando tecnologías modernas para la gestión de datos y la autenticación.

Backend: Se ha construido con Express para crear una API RESTful que interactúa con una base de datos MongoDB. La seguridad se implementa a través de la autenticación con JSON Web Tokens (JWT).

Frontend: Desarrollado con React, utiliza React Query para una gestión de estado y una sincronización de datos de alto rendimiento. Para la validación de esquemas y datos, se ha integrado Zod.

La estructura del proyecto está dividida en dos directorios principales: Task_backend para el servidor y TASK-FRONTEND para la interfaz de usuario.

Tecnologías Utilizadas
Frontend
React

React Query: Gestión de estado del servidor.

Zod: Validación de esquemas.

Backend
Node.js

Express: Servidor web.

MongoDB: Base de datos NoSQL.

JWT (JSON Web Tokens): Autenticación.

Guía de Instalación y Uso
Sigue estos pasos para poner en marcha la aplicación en tu entorno local.

1. Clona el Repositorio
Abre tu terminal y ejecuta el siguiente comando para clonar el proyecto:

git clone https://github.com/emalander/admin_tareas_MERN_React_Query_JWT.git
cd admin_tareas_MERN_React_Query_JWT

2. Configura el Backend
Navega al directorio Task_backend y instala las dependencias necesarias:

cd Task_backend
npm install

Luego, crea un archivo .env en la raíz de la carpeta Task_backend con tus variables de entorno. Asegúrate de reemplazar los valores de ejemplo con tu propia cadena de conexión de MongoDB y una clave secreta para JWT.

# Ejemplo de variables de entorno para el backend
PORT=5000
MONGODB_URI=tu_cadena_de_conexion_de_mongodb
JWT_SECRET=tu_clave_secreta_para_jwt

Para iniciar el servidor, ejecuta:

npm start

3. Configura el Frontend
Abre una nueva terminal, navega al directorio TASK-FRONTEND e instala sus dependencias:

cd ..
cd TASK-FRONTEND
npm install

Para iniciar el cliente de React:

npm start

Una vez que ambos servidores estén corriendo, la aplicación estará disponible en tu navegador en http://localhost:3000.

Contribuciones
Si deseas contribuir, por favor haz un fork del repositorio, crea una nueva rama y envía un pull request con tus cambios.
