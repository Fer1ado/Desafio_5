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
  socket.on("mensajeConexion", (user) => {
    if(user.rol === "Admin"){
      socket.emit("credencialesConexion", "Usuario Válido")
    } else {
      socket.emit("credencialesConexion", "Usuario no Válido")
    }
  });
  
  
  socket.on("mensaje", (infoMsg) => {
    mensaje.push(infoMsg)
    socket.emit("mensajes",mensaje)
    console.log(infoMsg)
  })


  socket.on("nuevoProducto", (prod) =>{
    //push al productmanager
    socket.emit("prods", prods)
  } )
  
});

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
  const user = {
    nombre: "maria",
    cargo: "tutor",
  };

  const cursos = [
    { numCurso: 123, tipo: "Programación Backend", dia: "L y M" },
    { numCurso: 545, tipo: "Programación Backend", dia: "M Y J" },
    { numCurso: 684, tipo: "Programación Backend", dia: "S" },
  ];

  res.render("realtimeproducts", {
    user: user,
    css: "products.css",
    esTutor: user.cargo === "tutor",
    cursos: cursos,
  });
});

//INICIALIZANDO EL LISTADO DE PRODUCTOS
const ejecutar = new ProductManager();

//INICIALIZANDO CARRITO DE COMPRAS
const carro = new CarritoManager();

//CARGA DE PRODUCTOS
primerboot();
