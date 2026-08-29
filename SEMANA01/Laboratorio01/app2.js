let tareas = [];
let id = 1;

// 📌 Categorías tipo constante (más seguro)
const categorias = {
    ESTUDIO: "Estudio",
    TRABAJO: "Trabajo",
    PERSONAL: "Personal"
};

// =============================
// ➕ AGREGAR TAREA
// =============================
function agregarTarea(titulo, descripcion, categoria) {

    // Validaciones
    if (!titulo || !descripcion) {
        console.log("❌ Error: título o descripción vacíos");
        return;
    }

    if (!Object.values(categorias).includes(categoria)) {
        console.log("❌ Categoría inválida");
        return;
    }

    const tarea = {
        id: id++,
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        categoria,
        completado: false,
        fechaCreacion: new Date(),
        fechaCompletado: null
    };

    tareas.push(tarea);

    console.log("✅ Tarea agregada correctamente");
}

// =============================
// 📋 LISTAR TODAS LAS TAREAS
// =============================
function listarTareas() {

    if (tareas.length === 0) {
        console.log(" No hay tareas registradas");
        return;
    }

    console.log("\n LISTA DE TAREAS");

    tareas.forEach(t => {
        console.log(
            `ID: ${t.id} | ${t.titulo} | ${t.categoria} | ${t.completado ? "✔️ Completado" : "❌ Pendiente"
            }`
        );
    });
}

// =============================
// ✔️ COMPLETAR TAREA
// =============================
function completarTarea(idTarea) {

    const tarea = tareas.find(t => t.id === idTarea);

    if (!tarea) {
        console.log(" Tarea no encontrada");
        return;
    }

    if (tarea.completado) {
        console.log(" La tarea ya estaba completada");
        return;
    }

    tarea.completado = true;
    tarea.fechaCompletado = new Date();

    console.log("✔️ Tarea completada correctamente");
}

// =============================
//  ELIMINAR TAREA
// =============================
function eliminarTarea(idTarea) {

    const index = tareas.findIndex(t => t.id === idTarea);

    if (index === -1) {
        console.log(" Tarea no encontrada");
        return;
    }

    tareas.splice(index, 1);

    console.log(" Tarea eliminada");
}

// =============================
//  FILTRAR POR CATEGORÍA
// =============================
function listarPorCategoria(categoria) {

    const filtradas = tareas.filter(t => t.categoria === categoria);

    if (filtradas.length === 0) {
        console.log(" No hay tareas en esta categoría");
        return;
    }

    console.log(`\n TAREAS - ${categoria}`);

    filtradas.forEach(t => {
        console.log(
            `ID: ${t.id} | ${t.titulo} | ${t.completado ? "✔️" : "❌"}`
        );
    });
}

// =============================
//  ESTADÍSTICAS
// =============================
function estadisticas() {

    const total = tareas.length;
    const completadas = tareas.filter(t => t.completado).length;
    const pendientes = total - completadas;

    console.log("\n ESTADÍSTICAS");
    console.log(`Total tareas: ${total}`);
    console.log(`Completadas: ${completadas}`);
    console.log(`Pendientes: ${pendientes}`);
}

// =============================
//  PRUEBA DEL SISTEMA
// =============================

agregarTarea("Estudiar Node.js", "Repasar teoría y práctica", categorias.ESTUDIO);
agregarTarea("Reunión de equipo", "Planificar proyecto", categorias.TRABAJO);
agregarTarea("Comprar víveres", "Ir al supermercado", categorias.PERSONAL);

listarTareas();

completarTarea(2);

listarTareas();

listarPorCategoria("Estudio");

estadisticas();

eliminarTarea(3);

listarTareas();