const fs = require("fs");
const readline = require("readline");

const FILE = "tareas.json";

// ======================
// CARGAR DATOS
// ======================
let tareas = [];

if (fs.existsSync(FILE)) {
    const data = fs.readFileSync(FILE, "utf-8");
    tareas = JSON.parse(data);
}

let id = tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1;

// ======================
// CATEGORÍAS
// ======================
const categorias = ["Estudio", "Trabajo", "Personal"];

// ======================
// GUARDAR EN ARCHIVO
// ======================
function guardar() {
    fs.writeFileSync(FILE, JSON.stringify(tareas, null, 2));
}

// ======================
// AGREGAR TAREA
// ======================
function agregarTarea(titulo, descripcion, categoria) {

    if (!categorias.includes(categoria)) {
        console.log("Categoria invalida");
        return;
    }

    if (!titulo || !descripcion) {
        console.log("Datos incompletos");
        return;
    }

    const tarea = {
        id: id++,
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        categoria,
        completado: false
    };

    tareas.push(tarea);
    guardar();

    console.log("Tarea agregada correctamente");
}

// ======================
// LISTAR TAREAS
// ======================
function listarTareas() {

    if (tareas.length === 0) {
        console.log("No hay tareas registradas");
        return;
    }

    console.log("\nLista de tareas:");

    tareas.forEach(t => {
        console.log(
            `${t.id}. ${t.titulo} [${t.categoria}] - ${t.completado ? "Completado" : "Pendiente"}`
        );
    });
}

// ======================
// COMPLETAR TAREA
// ======================
function completarTarea(idTarea) {

    const tarea = tareas.find(t => t.id === idTarea);

    if (!tarea) {
        console.log("No existe la tarea");
        return;
    }

    if (tarea.completado) {
        console.log("La tarea ya esta completada");
        return;
    }

    tarea.completado = true;
    guardar();

    console.log("Tarea completada correctamente");
}

// ======================
// FILTRAR POR CATEGORÍA
// ======================
function filtrarCategoria(categoria) {

    const filtradas = tareas.filter(t => t.categoria === categoria);

    if (filtradas.length === 0) {
        console.log("No hay tareas en esta categoria");
        return;
    }

    console.log(`\nTareas de la categoria ${categoria}:`);

    filtradas.forEach(t => {
        console.log(`${t.id}. ${t.titulo} - ${t.completado ? "Completado" : "Pendiente"}`);
    });
}

// ======================
// READLINE (MENU)
// ======================
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu() {

    console.log(`
MENU
1. Agregar tarea
2. Listar tareas
3. Completar tarea
4. Filtrar por categoria
5. Salir
`);

    rl.question("Seleccione una opcion: ", opcion => {

        switch (opcion) {

            case "1":
                rl.question("Titulo: ", titulo => {
                    rl.question("Descripcion: ", descripcion => {
                        console.log("Categorias: " + categorias.join(", "));
                        rl.question("Categoria: ", categoria => {
                            agregarTarea(titulo, descripcion, categoria);
                            menu();
                        });
                    });
                });
                break;

            case "2":
                listarTareas();
                menu();
                break;

            case "3":
                rl.question("ID de la tarea: ", id => {
                    completarTarea(parseInt(id));
                    menu();
                });
                break;

            case "4":
                rl.question("Categoria: ", categoria => {
                    filtrarCategoria(categoria);
                    menu();
                });
                break;

            case "5":
                console.log("Saliendo...");
                rl.close();
                break;

            default:
                console.log("Opcion invalida");
                menu();
        }
    });
}

// INICIAR APLICACION
menu();