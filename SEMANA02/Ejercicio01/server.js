// Importar el modulo ttp nativo de node.js
const http = require("http");

// Definir el puerto del servidor

const PORT = 3000;

// Crear el servidor

const server = http.createServer((req, res) => {
    // Configurar la cabecera de la respuesta
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    //Maneja basico de rutas

    if (req.url === "/") {
        res.statusCode = 200;
        res.end("<h1>Bienvenido a mi servidor Node.js 🚀</h1>");
    } else if (req.url === "/about") {
        res.statusCode = 200;
        res.end("<h1>Acerca de nosostros</h1><p>Este es un servidor basico</p>");
    } else if (req.url === "/contact") {
        res.statusCode = 200;
        res.end("<h1>Contacto</h1><p>Escribenos a contacto@mi-servidor.com</p>");
    } else if (req.url === "/services") {

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html; charset=utf-8");

        res.end(`
        <h1>Lista de Servicios</h1>
        <ul>
            <li>Desarrollo Web</li>
            <li>APIs en Node.js</li>
            <li>Bases de datos</li>
            <li>Soporte técnico</li>
        </ul>
    `);
    } else if (req.url === "/error") {
        res.statusCode = 500;
        res.end("<h1>500 - Error interno del servidor</h1>");
    }
    else {
        res.statusCode = 404;
        res.end("<h1>404 - Página no encontrada</h1>");
    }

});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
