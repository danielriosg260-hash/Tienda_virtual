const express = require("express");

const router = express.Router();

const {
    mostrarRegistro,
    registrarUsuario,
    mostrarLogin,
    iniciarSesion,
    cerrarSesion
} = require("../controllers/usuarios.controller");

router.get("/registro", mostrarRegistro);
router.post("/registro", registrarUsuario);

router.get("/login", mostrarLogin);
router.post("/login", iniciarSesion);
router.post("/logout", cerrarSesion);

module.exports = router;