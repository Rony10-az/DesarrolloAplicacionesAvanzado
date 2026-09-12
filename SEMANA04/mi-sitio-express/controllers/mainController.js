// Base de datos en memoria
const messages = [];

const contact = (req, res) => {
    res.render("contact", { title: "Contacto" });
};
const saveContact = (req, res) => {
    const { name, email, mensaje } = req.body;

    // Guardar en memoria
    messages.push({ name, email, mensaje });

    //Redirigir a inicio para ver los mensajes
    res.redirect("/admin");
};

const admin = (req, res) => {
    res.render("admin", { title: "Admin", messages });
};

const home = (req, res) => {
    res.render("home", { title: "Inicio" });
};
const about = (req, res) => {
    res.render("about", { title: "Acerca de" });
};


const mainController = {
    home, about, contact, saveContact, admin
};

module.exports = mainController;