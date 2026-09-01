const express = require("express");

const router = express.Router();

const {
    listarProductos,
    crearProducto,
    editarProducto,
    eliminarProducto
} = require("../controllers/productos.controller");

router.get("/", listarProductos);

router.post("/", crearProducto);

router.put("/:id", editarProducto);

router.delete("/:id", eliminarProducto);

module.exports = router;