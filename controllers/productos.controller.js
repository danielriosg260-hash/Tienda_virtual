const Producto = require("../models/producto.model");

const listarProductos = async (req, res) => {
    try {
        const productos = await Producto.find({});
        res.render("productos/listar", { productos });
    } catch (error) {
        res.status(500).send("Error al listar productos");
    }
};

const formularioNuevo = (req, res) => {
    res.render("productos/formulario", { producto: null });
};

const crearProducto = async (req, res) => {
    try {
        await Producto.create(req.body);
        res.redirect("/productos");
    } catch (error) {
        res.status(500).send("Error al crear producto");
    }
};

const formularioEdicion = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        res.render("productos/formulario", { producto });
    } catch (error) {
        res.status(500).send("Producto no encontrado");
    }
};

const editarProducto = async (req, res) => {
    try {
        await Producto.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/productos");
    } catch (error) {
        res.status(500).send("Error al editar producto");
    }
};

const eliminarProducto = async (req, res) => {
    try {
        await Producto.findByIdAndDelete(req.params.id);
        res.redirect("/productos");
    } catch (error) {
        res.status(500).send("Error al eliminar producto");
    }
};

module.exports = {
    listarProductos,
    formularioNuevo,
    crearProducto,
    formularioEdicion,
    editarProducto,
    eliminarProducto
};