const http = require("http");
const repo = require("./repository/studentsRepository");

const PORT = 4000;

const server = http.createServer((req, res) => {

    const { method, url } = req;

    res.setHeader("Content-Type", "application/json; charset=utf-8");

    // =====================
    // GET /students
    // =====================
    if (url === "/students" && method === "GET") {
        res.statusCode = 200;
        res.end(JSON.stringify(repo.getAll()));
    }

    // =====================
    // GET /students/:id
    // =====================
    else if (url.startsWith("/students/") && method === "GET") {
        const id = parseInt(url.split("/")[2]);

        const student = repo.getById(id);

        if (student) {
            res.statusCode = 200;
            res.end(JSON.stringify(student));
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "Estudiante no encontrado" }));
        }
    }

    // =====================
    // POST /students
    // =====================
    else if (url === "/students" && method === "POST") {

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            let data;
            try {
                data = JSON.parse(body);
            } catch {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: "JSON inválido" }));
            }
            if (typeof data !== "object" || data === null) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: "Body debe ser un objeto" }));
            }

            const newStudent = repo.create(data);

            res.statusCode = 201;
            res.end(JSON.stringify(newStudent));
        });
    }

    // =====================
    // PUT /students/:id
    // =====================
    else if (url.startsWith("/students/") && method === "PUT") {

        const id = parseInt(url.split("/")[2]);

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            let data;
            try {
                data = JSON.parse(body);
            } catch {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: "JSON inválido" }));
            }
            if (typeof data !== "object" || data === null) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: "Body debe ser un objeto" }));
            }

            const updatedStudent = repo.update(id, data);

            if (updatedStudent) {
                res.statusCode = 200;
                res.end(JSON.stringify(updatedStudent));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: "Estudiante no encontrado" }));
            }
        });
    }

    // =====================
    // DELETE /students/:id
    // =====================
    else if (url.startsWith("/students/") && method === "DELETE") {

        const id = parseInt(url.split("/")[2]);

        const deletedStudent = repo.remove(id);

        if (deletedStudent) {
            res.statusCode = 200;
            res.end(JSON.stringify(deletedStudent));
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "Estudiante no encontrado" }));
        }
    }
    // =====================
    // POST /ListByStatus
    // =====================
    else if (url === "/ListByStatus" && method === "POST") {

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            let data;
            try {
                data = JSON.parse(body);
            } catch {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: "JSON inválido" }));
            }
            if (typeof data !== "object" || data === null) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: "Body debe ser un objeto" }));
            }

            const { status } = data;

            const result = repo.listByStatus(status);

            res.statusCode = 200;
            res.end(JSON.stringify(result));
        });
    }
    // =====================
    // POST /ListByGrade
    // =====================

    else if (url === "/ListByGrade" && method === "POST") {

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            let data;
            try {
                data = JSON.parse(body);
            } catch {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: "JSON inválido" }));
            }
            if (typeof data !== "object" || data === null) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: "Body debe ser un objeto" }));
            }

            const { gpa } = data;

            const result = repo.listByGrade(gpa);

            res.statusCode = 200;
            res.end(JSON.stringify(result));
        });
    }

    // =====================
    // 404
    // =====================
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Ruta no encontrada" }));
    }




});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});