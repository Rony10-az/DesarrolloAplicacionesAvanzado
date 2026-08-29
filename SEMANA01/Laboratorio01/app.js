let tareas = [];
let id = 1;

const categorias = ["Estudio", "Trabajo", "Personal"];

function agregarTarea(titulo, descripcion, categoria) {
    if (!categorias.includes(categoria)) {
        console.log("Categoría inválida");
        return;
    }

    const tarea = {
        id: id++,
        titulo,
        descripcion,
        categoria,
        completado: false
    };

    tareas.push(tarea);
    console.log("Tarea agregada correctamente");
}

function listarTareas() {
    console.log("\nLista de tareas:");

    tareas.forEach(t => {
        console.log(
            `ID: ${t.id}, Titulo: ${t.titulo}, Descripcion: ${t.descripcion}, Categoria: ${t.categoria}, Completado: ${t.completado}`
        );
    });
}

function completarTarea(idtarea) {
    const tarea = tareas.find(t => t.id === idtarea);

    if (!tarea) {
        console.log("No existe la tarea");
        return;
    }

    tarea.completado = true;
    console.log("Tarea completada correctamente");
}

//  FILTRAR POR CATEGORÍA
function listarTareasPorCategoria(categoria) {
    const filtradas = tareas.filter(t => t.categoria === categoria);

    console.log(`\nTareas de la categoria ${categoria}:`);

    filtradas.forEach(t => {
        console.log(
            `ID: ${t.id}, Titulo: ${t.titulo}, Descripcion: ${t.descripcion}, Completado: ${t.completado}`
        );
    });
}

//  PRUEBA
agregarTarea("\nEstudiar para el examen", "Repasar apuntes", "Estudio");
agregarTarea("\nReunión de trabajo", "Equipo de proyecto", "Trabajo");
agregarTarea("\nComprar víveres", "Ir al mercado", "Personal");

listarTareas();

completarTarea(2);

listarTareas();

listarTareasPorCategoria("Estudio");