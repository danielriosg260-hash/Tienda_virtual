const express = require("express");

const router = express.Router();

const {
    listarProductos,
    formularioNuevo,
    crearProducto,
    formularioEdicion,
    editarProducto,
    eliminarProducto
} = require("../controllers/productos.controller");

router.get("/", listarProductos);

router.get("/nuevo", formularioNuevo);

router.post("/", crearProducto);

router.get("/:id/editar", formularioEdicion);

router.post("/:id", editarProducto);

router.get("/:id/eliminar", eliminarProducto);

module.exports = router;