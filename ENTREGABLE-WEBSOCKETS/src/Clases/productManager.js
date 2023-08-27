import { promises as fs } from "fs";
import { _dirname } from "../path.js"

const ruta = `${_dirname}/Json/products.json`;

export default class ProductManager {
  constructor() {
    this.products = [];
  }

  async addProduct(input) {
    //chequeo si todos los campos estan completos para agregar el producto
    const check = Object.values(input).some(
      (valor) => valor === undefined || valor === "" || valor === null
    );
    //transformo a objeto el archivo json para chequear por duplicados
    const producto = JSON.parse(await fs.readFile(ruta, "utf-8"));
    //chequeo si el producto no esta repetido
    const prod = producto.some((prod) => prod.code === input.code);

    if (check) {
      return "Producto Incompleto, todos los campos deben tener información";
    }

    if (prod) {
      return "Producto repetido";
    } else {
      this.products.push(input);
      await fs.writeFile(ruta, JSON.stringify(this.products));
      console.log("Producto agregado con éxito!");
      return "Producto agregado con éxito!";
    }
  }

  async getProducts() {
    const producto = JSON.parse(await fs.readFile(ruta, "utf-8"));
    return producto;
  }

  async getProductById(id) {
    const producto = JSON.parse(await fs.readFile(ruta, "utf-8"));
    const produ = producto.find((prod) => prod.id === id);
    console.log(produ);
    if (produ) {
      return produ;
    } else {
      return "Producto no encontrado";
    }
  }

  async updateProduct(id, edicion) {
    //transformo a objeto la base de datos
    const producto = JSON.parse(await fs.readFile(ruta, "utf-8"));
    //chequeo que todos los campos del edit que llega esten completos
    const check = Object.values(edicion).some(
      (valor) => valor === undefined || valor === "" || valor === null
    );
    //busco la ubicación del producto a editar
    const indx = producto.findIndex((prod) => prod.id === parseInt(id));

    if (check) {
      return "Es necesario completar todos los campos para realizar la edición del producto";
    }
    if (indx !== -1) {
      (producto[indx].title = edicion.title),
        (producto[indx].description = edicion.description),
        (producto[indx].price = edicion.price),
        (producto[indx].code = edicion.code),
        (producto[indx].stock = edicion.stock),
        (producto[indx].thumbnail = edicion.thumbnail),
        await fs.writeFile(ruta, JSON.stringify(producto));
      return "Producto editado con éxito";
    } else {
      console.log("Producto no encontrado");
      return "Producto no encontrado";
    }
  }

  async deleteProduct(id) {
    const producto = JSON.parse(await fs.readFile(ruta, "utf-8"));
    const indx = producto.findIndex((prod) => prod.id === parseInt(id));

    if (indx != -1) {
      const nuevoJson = producto.filter((prod) => prod.id != parseInt(id));
      await fs.writeFile(ruta, JSON.stringify(nuevoJson));
      return "producto elminado con éxito";
    } else {
      return "producto no encontrado";
    }
  }
}
