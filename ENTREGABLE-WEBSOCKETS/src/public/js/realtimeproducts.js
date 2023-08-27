const socket = io()
const form = document.getElementById("idForm");
const botonProd = document.getElementById("botonProductos");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target);
  const datForm = new FormData(e.target)
  console.log(datForm.get("title"))
  const prod= Object.fromEntries(datForm)
  console.log(prod)
  socket.emit("NuevoProducto", prod)
  e.target.reset()
});

botonProd.addEventListener("click", () => {
    socket.on("prods", (productos) =>{
        console.log(productos)
    })
}) 