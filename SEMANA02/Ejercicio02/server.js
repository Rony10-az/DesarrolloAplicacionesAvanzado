const http = require("http");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const PORT = 3000;

/**
 * Helper para comparaciones en Handlebars
 */
handlebars.registerHelper("gte", function (a, b) {
    return a >= b;
});

const server = http.createServer((req, res) => {

    const day = new Date().toLocaleDateString("es-ES");

    // =========================
    // RUTA HOME
    // =========================
    if (req.url === "/") {

        const filePath = path.join(__dirname, "views", "home.hbs");

        fs.readFile(filePath, "utf-8", (err, templateData) => {
            if (err) {
                res.statusCode = 500;
                res.end("<h1>500 - Error interno del servidor</h1>");
                return;
            }

            const template = handlebars.compile(templateData);

            const data = {
                title: "Servidor con Handlebars 🚀",
                WelcomeMessage: "Bienvenido al laboratorio de Node.js",
                day,
                students: [
                    "Ana", "Luis", "Carlos", "María"
                ]
            };

            const html = template(data);

            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(html);
        });
    }

    // =========================
    // RUTA ABOUT
    // =========================
    else if (req.url === "/about") {

        const filePath = path.join(__dirname, "views", "about.hbs");

        fs.readFile(filePath, "utf-8", (err, templateData) => {
            if (err) {
                res.statusCode = 500;
                res.end("<h1>500 - Error interno del servidor</h1>");
                return;
            }

            const template = handlebars.compile(templateData);

            const data = {
                title: "Servidor con Handlebars 🚀",
                WelcomeMessage: "Bienvenido al laboratorio de Node.js",
                day,
                cursos: [
                    { nombre: "Matemáticas", profesor: "Dr. García", fecha: "2023-10-01" },
                    { nombre: "Física", profesor: "Dr. López", fecha: "2023-10-02" },
                    { nombre: "Química", profesor: "Dr. Martínez", fecha: "2023-10-03" }
                ]
            };

            const html = template(data);

            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(html);
        });
    }

    // =========================
    // RUTA STUDENTS (CORREGIDA)
    // =========================
    else if (req.url === "/students") {

        const filePath = path.join(__dirname, "views", "students.hbs");

        fs.readFile(filePath, "utf-8", (err, templateData) => {
            if (err) {
                res.statusCode = 500;
                res.end("<h1>500 - Error interno del servidor</h1>");
                return;
            }

            const template = handlebars.compile(templateData);

            const data = {
                title: "Servidor con Handlebars 🚀",
                WelcomeMessage: "Bienvenido al laboratorio de Node.js",
                day,

                // 🔥 IMPORTANTE: ahora es objeto para {{this.nombre}} y {{this.nota}}
                students: [
                    { nombre: "Ana", nota: 18 },
                    { nombre: "Luis", nota: 14 },
                    { nombre: "Carlos", nota: 20 },
                    { nombre: "María", nota: 16 }
                ]
            };

            const html = template(data);

            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(html);
        });
    }

    // =========================
    // 404
    // =========================
    else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end("<h1>404 - Página no encontrada</h1>");
    }
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});