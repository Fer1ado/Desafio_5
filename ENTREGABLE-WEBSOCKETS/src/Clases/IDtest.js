import { promises as fs } from "fs";
import { _dirname } from "../path.js"

const ruta = `${_dirname}/Json/products.json`;

function generarID (){
 let newID = Math.floor(Math.random() * 1000) + 1;
console.log(newID)
    
}

    
generarID()
