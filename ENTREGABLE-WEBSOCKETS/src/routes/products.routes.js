import ProductManager from "../Clases/productManager.js";
import { Router } from "express";

const prodRoute = Router();
const ejecutar = new ProductManager();


//pedido de productos por ID
prodRoute.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  res.send(await ejecutar.getProductById(parseInt(pid)));
});

//Pedido de listado completo
prodRoute.get("/", async (req, res) => {
  res.send(await ejecutar.getProducts());
});

//Subida de productos
prodRoute.post("/", async (req, res) => {
  const producto = await ejecutar.addProduct(req.body);

  if (
    producto === "Producto Incompleto, todos los campos deben tener información"
  ) {
    return res.status(400).send(producto);
  }
  if (producto === "Producto repetido") {
    return res.status(400).send(producto);
  } else {
    return res.status(200).send(producto);
  }
});
//editado de producto
prodRoute.put("/:id", async (req, res) => {
  const { id } = req.params;

  const producto = await ejecutar.updateProduct(id, req.body);

  if (producto === "Producto no encontrado") {
    return res.status(400).send(producto);
  } else {
    return res.status(200).send(producto);
  }
});

//borrado de producto
prodRoute.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const producto = await ejecutar.deleteProduct(id);

  if (producto === "producto no encontrado") {
    return res.status(400).send(producto);
  } else {
    return res.status(200).send(producto);
  }
});

export default prodRoute;
