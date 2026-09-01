const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");

const conectarDB = require("./config/database");

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

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

const usuariosRoutes = require("./routes/usuarios.routes");
app.use("/usuarios", usuariosRoutes);

app.get("/", (req, res) => {
    res.render("inicio", { usuario: req.session.nombre });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});