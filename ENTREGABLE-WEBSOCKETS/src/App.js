import ProductManager from "./Clases/productManager.js";
import CarritoManager from "./Clases/carritoManager.js";
import primerboot from "./Clases/boot.js";
import { engine } from "express-handlebars";
import express from "express";
import cartRoute from "./routes/cart.routes.js";
import prodRoute from "./Routes/products.routes.js";
import { _dirname } from "./path.js";
import { Server } from "socket.io";
import path from "path";

///inicio servidor
const app = express();
const PORT = 8080;

//SOCKET IO
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

//server de io
const io = new Server(server);


const mensaje = []

io.on("connection", (socket) => {
  console.log("Servidor Socket.io conectado");
  
  socket.on('nuevoProducto', async (nuevoProd) => {
  await ejecutar.addProduct(nuevoProd);
  });
  
  socket.on("update-products", async () => {
    const mensaje = await ejecutar.getProducts()
    socket.emit("product-data",mensaje)
    console.log(mensaje)
  })


})

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(_dirname, "./views"));
app.use("/static", express.static(path.join(_dirname, "/public")));

//ROUTES
app.use("/api/products", prodRoute);
app.use("/api/cart", cartRoute);

//RUTAS HANDLEBARS
app.get("/static", (req, res) => {
  res.render("realtimeproducts", {
    css: "products.css",
  });
});

app.get("/static", (req, res) => {
  res.render("products", {
    css: "style.css",
  });
});

//INICIALIZANDO EL LISTADO DE PRODUCTOS
const ejecutar = new ProductManager();

//INICIALIZANDO CARRITO DE COMPRAS
const carro = new CarritoManager();

//CARGA DE PRODUCTOS
primerboot();
