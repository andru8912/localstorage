//declaracion de variables
let nombrePro = document.querySelector(".nombre-producto");
let presentacionPro = document.querySelector(".presentacion-producto");
let precioPro = document.querySelector(".precio-producto");
let imagenPro = document.querySelector(".imagen-producto");
let buscarPro = document.querySelector(".input-buscar");
let btnGuardar = document.querySelector(".btn-guardar");
let tabla = document.querySelector(".table > tbody");

//agregar evento al boton
btnGuardar.addEventListener("click", function () {
  // alert(nombrePro.value);
  let producto = validarFormulario();
  if (!producto) return;
  guardarProducto(producto);
  borrarTabla();
  mostrarProductos();
});

buscarPro.addEventListener("keyup", (event) => {
  let productos = [];
  let productosPrevios = obetenerProductos();
  if (productosPrevios) {
    productos = productosPrevios;
  }
  let valorBusqueda = event.target.value.toLowerCase();

  if (valorBusqueda){
    productos = productos.filter((p) =>
      p.nombre.toLowerCase().includes(event.target.value.toLowerCase())
    );
  }

  borrarTabla();
  productos.forEach((p, i) => {
    let fila = document.createElement("tr");
    fila.innerHTML = `
            <td>${i + 1}</td>    
            <td>${p.nombre}</td>    
            <td>${p.presentacion}</td>    
            <td>${p.precio}</td>    
            <td><img width='50px' height='50px' src='${p.imagen}'/></td>    
            <td><span class='btn btn-warning btn-editar' onclick='actualizarProducto(${i})'>📄</span></td>    
            <td><span class='btn btn-danger btn-eliminar' onclick='eliminarProducto(${i})'>✖️</span></td>    
        `;
    tabla.appendChild(fila);
  });
});

// traer datos guardados en el navegador
function obetenerProductos() {
  return JSON.parse(localStorage.getItem("productos"));
}

function mostrarProductos() {
  let productos = [];
  let productosPrevios = obetenerProductos();
  if (productosPrevios) {
    productos = productosPrevios;
  }

  productos.forEach((p, i) => {
    let fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${i + 1}</td>    
        <td>${p.nombre}</td>    
        <td>${p.presentacion}</td>    
        <td>${p.precio}</td>    
        <td><img width='50px' height='50px' src='${p.imagen}'/></td>    
        <td><span class='btn btn-warning btn-editar' onclick='actualizarProducto(${i})'>📄</span></td>    
        <td><span class='btn btn-danger btn-eliminar' onclick='eliminarProducto(${i})'>✖️</span></td>    
    `;
    tabla.appendChild(fila);
  });
}

function guardarProducto(producto) {
  let productos = [];
  let productosPrevios = obetenerProductos();
  if (productosPrevios) {
    productos = productosPrevios;
  }
  productos.push(producto);

  localStorage.setItem("productos", JSON.stringify(productos));
  alert("producto guardado con exito");
}

//funcion para obtener los productos del formulario
function validarFormulario() {
  if (
    nombrePro.value == "" ||
    presentacionPro.value == "" ||
    precioPro.value == "" ||
    imagenPro.value == ""
  ) {
    alert("Todos los campos son obligatorios");
    return;
  }

  let producto = {
    nombre: nombrePro.value,
    presentacion: presentacionPro.value,
    precio: precioPro.value,
    imagen: imagenPro.value,
  };

  nombrePro.value = "";
  presentacionPro.value = "";
  precioPro.value = "";
  imagenPro.value = "";
  return producto;
}

function eliminarProducto(pos) {
  let productos = [];
  let productosPrevios = obetenerProductos();
  if (productosPrevios) {
    productos = productosPrevios;
  }

  let confirmar = confirm("¿Desea eliminar el producto?");
  if (confirmar) {
    productos.splice(pos, 1);
    alert("Producto eliminado");
    localStorage.setItem("productos", JSON.stringify(productos));
    borrarTabla();
    mostrarProductos();
  }
}

function borrarTabla() {
  let filas = document.querySelectorAll(".table tbody tr");

  filas.forEach((f) => {
    f.remove();
  });
}

function actualizarProducto(pos) {
  let productos = [];
  let productosPrevios = obetenerProductos();
  if (productosPrevios) {
    productos = productosPrevios;
  }

  nombrePro.value = productos[pos].nombre;
  precioPro.value = productos[pos].precio;
  presentacionPro.value = productos[pos].presentacion;
  imagenPro.value = productos[pos].imagen;

  let btnActualizar = document.querySelector(".btn-actualizar");
  btnActualizar.classList.toggle("d-none");
  btnGuardar.classList.toggle("d-none");

  btnActualizar.addEventListener("click", function () {
    // alert(nombrePro.value);
    productos[pos].nombre = nombrePro.value;
    productos[pos].precio = precioPro.value;
    productos[pos].presentacion = presentacionPro.value;
    productos[pos].imagen = imagenPro.value;

    localStorage.setItem("productos", JSON.stringify(productos));
    alert("Datos actualizados");
    borrarTabla();
    mostrarProductos();

    nombrePro.value = "";
    presentacionPro.value = "";
    precioPro.value = "";
    imagenPro.value = "";

    btnActualizar.classList.toggle("d-none");
    btnGuardar.classList.toggle("d-none");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  borrarTabla();
  mostrarProductos();
});
