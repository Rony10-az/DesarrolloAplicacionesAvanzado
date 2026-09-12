const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController.js");

// Definir rutas y asociarlas con controladores
router.get("/", mainController.home);
router.get("/about", mainController.about);
module.exports = router;

//Definir rutas para nuevas paginas contacto y admin
router.get("/contact", mainController.contact);
router.post("/contact", mainController.saveContact);
router.get("/admin", mainController.admin);
