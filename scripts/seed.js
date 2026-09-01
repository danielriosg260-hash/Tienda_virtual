const dotenv = require("dotenv");
const conectarDB = require("./config/database");
const Producto = require("./models/producto.model");

dotenv.config();

const productos = [
    {
        nombre: "Camiseta básica",
        descripcion: "Camiseta de algodón, disponible en varios colores.",
        precio: 29.9,
        imagen: "https://picsum.photos/seed/camiseta/300/200"
    },
    {
        nombre: "Pantalón jeans",
        descripcion: "Pantalón vaquero clásico de corte recto.",
        precio: 89.9,
        imagen: "https://picsum.photos/seed/jeans/300/200"
    },
    {
        nombre: "Zapatillas deportivas",
        descripcion: "Zapatillas cómodas para uso diario o deporte.",
        precio: 149.9,
        imagen: "https://picsum.photos/seed/zapatillas/300/200"
    }
];

const sembrar = async () => {
    await conectarDB();

    const existentes = await Producto.countDocuments({});
    if (existentes > 0) {
        console.log("Ya hay productos en la base, no se insertó de nuevo.");
        process.exit(0);
    }

    await Producto.insertMany(productos);
    console.log(`${productos.length} productos de ejemplo insertados.`);
    process.exit(0);
};

sembrar();