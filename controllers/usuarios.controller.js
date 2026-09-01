const Usuario = require("../models/usuario.model");
const bcrypt = require("bcrypt");

const mostrarRegistro = (req, res) => {
    res.render("usuarios/registro");
};

const registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        const usuarioExistente = await Usuario.findOne({ email });

        if (usuarioExistente) {
            return res.send("El correo ya está registrado");
        }

        const passwordEncriptada = await bcrypt.hash(password, 10);

        const nuevoUsuario = new Usuario({
            nombre,
            email,
            password: passwordEncriptada
        });

        await nuevoUsuario.save();

        res.send("Usuario registrado correctamente");

    } catch (error) {
        console.error(error);
        res.status(500).send("Error al registrar usuario");
    }
};

module.exports = {
    mostrarRegistro,
    registrarUsuario
};