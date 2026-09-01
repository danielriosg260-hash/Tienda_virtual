const express = require("express");

const router = express.Router();

const {
    mostrarRegistro,
    registrarUsuario
} = require("../controllers/usuarios.controller");

router.get("/registro", mostrarRegistro);
router.post("/registro", registrarUsuario);

module.exports = router;