const Usuario = require("../models/usuario.model");
const bcrypt = require("bcrypt");

const mostrarRegistro = (req, res) => {
    res.render("usuarios/registro");
};

const registrarUsuario = async (req, res) => {
    try {
        const nombre = req.body.nombre?.trim();
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        if (!nombre || !email || !password || password.length < 6) {
            return res.status(400).send("Nombre, correo y una contraseña de mínimo 6 caracteres son obligatorios");
        }

        const usuarioExistente = await Usuario.findOne({ email }).lean();

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

        res.redirect("/usuarios/login");

    } catch (error) {
        console.error(error);
        res.status(500).send("Error al registrar usuario");
    }
};

const mostrarLogin = (req, res) => {
    res.render("usuarios/login");
};

const iniciarSesion = async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        if (!email || !password) {
            return res.status(400).send("Correo y contraseña son obligatorios");
        }

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.send("Correo o contraseña incorrectos");
        }

        const passwordCorrecta = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!passwordCorrecta) {
            return res.send("Correo o contraseña incorrectos");
        }

        req.session.usuarioId = usuario._id.toString();
        req.session.nombre = usuario.nombre;

        res.redirect("/");

    } catch (error) {
        console.error(error);
        res.status(500).send("Error al iniciar sesión");
    }
};

const cerrarSesion = (req, res, next) => {
    req.session.destroy((error) => {
        if (error) {
            return next(error);
        }

        res.clearCookie("connect.sid");
        res.redirect("/usuarios/login");
    });
};

module.exports = {
    mostrarRegistro,
    registrarUsuario,
    mostrarLogin,
    iniciarSesion,
    cerrarSesion
};