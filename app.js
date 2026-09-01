const express = require("express");
const dotenv = require("dotenv");
const conectarDB = require("./config/database");

dotenv.config();

const app = express();

conectarDB();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Tienda virtual funcionando");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});