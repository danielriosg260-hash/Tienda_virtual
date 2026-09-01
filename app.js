const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");

const conectarDB = require("./config/database");
const productosRoutes = require("./routes/productos.routes");
const usuariosRoutes = require("./routes/usuarios.routes");

dotenv.config();

if (!process.env.SESSION_SECRET) {
    throw new Error("La variable SESSION_SECRET es obligatoria");
}

const app = express();

conectarDB();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Configuración de sesiones (de main)
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

// Rutas integradas de ambos módulos
app.use("/productos", productosRoutes);
app.use("/usuarios", usuariosRoutes);

app.get("/", (req, res) => {
    res.render("inicio", { usuario: req.session ? req.session.nombre : null });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});