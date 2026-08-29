let students = [
    {
        id: 1,
        name: "Juan Pérez",
        grade: 20,
        age: 23,
        email: "juan.perez@ejemplo.com",
        phone: "+51 987654321",
        enrollmentNumber: "2025001",
        course: "Diseño y Desarrollo de Software C24",
        year: 3,
        subjects: ["Algoritmos", "Bases de Datos", "Redes"],
        gpa: 3.8,
        status: "Activo",
        admissionDate: "2022-03-01"
    }
];

// =========================
// GET ALL
// =========================
function getAll() {
    return students;
}

// =========================
// GET BY ID
// =========================
function getById(id) {
    return students.find(s => s.id === Number(id));
}

// =========================
// CREATE (CON VALIDACIÓN)
// =========================
function create(student) {

    if (!student.name || !student.email || !student.course || !student.phone) {
        return { error: "Faltan campos obligatorios" };
    }

    student.id = students.length
        ? Math.max(...students.map(s => s.id)) + 1
        : 1;

    students.push(student);
    return student;
}

// =========================
// UPDATE
// =========================
function update(id, data) {
    const index = students.findIndex(s => s.id === Number(id));

    if (index === -1) return null;

    const { id: _, ...safeData } = data;

    students[index] = {
        ...students[index],
        ...safeData
    };

    return students[index];
}

// =========================
// DELETE
// =========================
function remove(id) {
    const index = students.findIndex(s => s.id === Number(id));

    if (index === -1) return null;

    return students.splice(index, 1)[0];
}

// =========================
// FILTER BY STATUS
// =========================
function listByStatus(status) {
    return students.filter(s => s.status === status);
}

// =========================
// FILTER BY GRADE (GPA)
// =========================
function listByGrade(minGpa) {
    return students.filter(s => s.gpa >= Number(minGpa));
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    listByStatus,
    listByGrade
};