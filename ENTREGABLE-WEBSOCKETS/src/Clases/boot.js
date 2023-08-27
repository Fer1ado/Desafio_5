import Product from "./Productos.js"
import { _dirname } from "../path.js"
import { promises as fs } from "fs";
import ProductManager from "../Clases/productManager.js";
///////////////////////////////////////////////////////////////////////////////////////
///CREACION DE ITEMS

const producto1 = new Product(
    "manzana",
    "roja",
    550,
    "http://thumbnail.com",
    "MM284",
    76,
    true
  );
  const producto2 = new Product(
    "Pera de Agua",
    "Pera de agua o Blanquilla: Son peras de tamaño medio, dulces y muy jugosas. Su piel es lisa y su corazón muy pequeño. También cuenta con una Denominación de Origen Protegida de Rincón de Soto, en La Rioja.",
    687,
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnectarfruit.es%2Fproducto%2Fpera-de-agua&psig=AOvVaw0yQWX9Kz_5m5a6xP-ZpOlZ&ust=1692554675287000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKi1stOn6YADFQAAAAAdAAAAABAE",
    "MM248",
    54,
    true
  );
  const producto3 = new Product(
    "mandarina",
    "naranja",
    354,
    "http://thumbnail.com",
    "MA275",
    206,
    true
  );
  const producto4 = new Product("Mango", "dulce", 845, [], "PI265", 126);
  const producto5 = new Product(
    "Manzana Fuji",
    "Manzana Fuji: Es una variedad de manzana originaria de Japón. Es dulce y crujiente, y se caracteriza por su piel amarilla-verdosa con manchas rojas.",
    500,
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.frutas-hortalizas.com%2Ffrutas%2Fmanzanas-fuji.html&psig=AOvVaw1J7LhXJf8sXZJw4rZlWj7-&ust=1692554675288000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKi1stOn6YADFQAAAAAdAAAAABAD",
    "MM249",
    32,
    true
  );
  const producto6 = new Product(
    "Banana",
    "Banana: Es una fruta tropical originaria del sudeste asiático. Es rica en potasio y vitaminas B6 y C. Se caracteriza por su piel amarilla y su forma curva.",
    300,
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.frutas-hortalizas.com%2Ffrutas%2Fbananas.html&psig=AOvVaw3bE5tGJdK4l8WvLwRf9eGk&ust=1692554675288000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKi1stOn6YADFQAAAAAdAAAAABAJ",
    "MM250",
    12,
    true
  );
  
  const producto7 = new Product(
    "Mango",
    "El mango es una fruta tropical originaria del sur y sureste asiático. Es una fruta dulce y jugosa que se puede comer fresca o utilizarse para hacer postres y bebidas.",
    199,
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.natureword.com%2Fbenefits-of-mango-fruit-and-leaves-for-health-and-beauty%2F&psig=AOvVaw1J7b8XJf8G4cYJfZrI4tW-&ust=1661231748742000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjR5JLZyfMCFQAAAAAdAAAAABAD",
    "MNGO-001",
    100,
    true
  );
  
  const producto8 = new Product(
    "Piña",
    "La piña es una fruta tropical originaria de América del Sur. Es rica en vitamina C y manganeso y se puede comer fresca o utilizarse para hacer postres y bebidas.",
    120,
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.natureword.com%2Fbenefits-of-pineapple-fruit-and-juice-for-health-and-beauty%2F&psig=AOvVaw3kL9n7XlKtHsT8GgTjKdZ-&ust=1661231797192000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjR5JLZyfM",
    76,
    true
  );
  
  const producto9 = new Product(
    "Ñame",
    "El ñame es un tubérculo originario de África y Asia. Es rico en carbohidratos y se puede cocinar de muchas maneras diferentes.",
    159,
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.natureword.com%2Fyam-root-benefits-for-health-and-beauty%2F&psig=AOvVaw3J5ZJzJ6L7fQ4z5rG8vQjK&ust=1661231877512000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjR5JLZyfMCFQAAAAAdAAAAABAD",
    "YAM-001",
    100,
    true
  );
  
  const producto10 = new Product(
    "Batata",
    "La batata es un tubérculo originario de América del Sur. Es rica en vitamina A y se puede cocinar de muchas maneras diferentes.",
    199,
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.natureword.com%2Fsweet-potato-benefits-for-health-and-beauty%2F&psig=AOvVaw1gX9TmKl7W8t4pHxXsKk9-&ust=1661231916342000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjR5JLZyfMCFQAAAAAdAAAAABAD",
    "BT-001",
    100,
    true
  );
  

 
  const ejecutar = new ProductManager();
  
  export default async function primerboot() {
    const producto = JSON.parse( await fs.readFile(`${_dirname}/Json/products.json`, "utf-8"));
   
  
    if (producto.length === 0) {
      ejecutar.addProduct(producto1);
      ejecutar.addProduct(producto2);
      ejecutar.addProduct(producto3);
      ejecutar.addProduct(producto4);
      ejecutar.addProduct(producto5);
      ejecutar.addProduct(producto6);
      ejecutar.addProduct(producto7);
      ejecutar.addProduct(producto8);
      ejecutar.addProduct(producto9);
      ejecutar.addProduct(producto10);
  
      return;
    } else {
      return console.log("Todo listo");
    }
  }