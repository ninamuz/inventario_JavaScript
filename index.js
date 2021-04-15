"use strict";

//Creamos un objeto llamado Producto, con sus propiedades
//Utilizando el patrón de diseño Prototype
class Producto {
    constructor(nombre, valor, cantidad) {
        this.nombre = nombre;
        this.valor = valor;
        this.cantidad = cantidad;
    }//Permite convertir el objeto a texto legible
    toString() {
        return `Nombre: ${this.nombre}, Valor: ${this.valor}, Cantidad: ${this.cantidad}, Total: ${this.valor * this.cantidad}`;
    }
}
//Creamos un objeto Inventario donde productos es un arreglo
class Inventario {
    constructor(listaProductos) {
        this.productos = listaProductos;
    }
    //Con este método agrego nuevos productos al arreglo productos
    agregar(productoNuevo) {
        //TODO Una manera de usar 'Spread': this.productos = [...this.productos, ...[productoNuevo]];
        //TODO para crear un nuevo arreglo usando un arreglo existente como parte de él
        this.productos.push(productoNuevo);
    }
}
//Creamos un objeto inventarioRopa y asigno un arreglo vacío
//Se pueden crear otros objetos Inventarios para otras categorías
let inventarioRopa = new Inventario([]);

//Esta función permite agregar productos al arreglo a través de los input del HTML
function ingresar() {
    let nombre = document.getElementById("nombre").value;
    let valor = Number(document.getElementById("valor").value);
    let cantidad = Number(document.getElementById("cantidad").value);
    document.getElementById("correcto").innerText = '';

    // Función flecha para validar todos los campos
    //Devuelve el mismo mensaje en caso que el valor no sea numérico para 'valor' y 'cantidad'
    let validar = (() => {
        //Verificación de campos vacíos
        let mensaje = "";

        if (nombre == "") {
            mensaje += "Ingrese un nombre" + '\n';
        }
        if (valor == "") {
            mensaje += "Ingrese un valor" + '\n';

        }
        if (cantidad == "") {
            mensaje += "Ingrese una cantidad" + '\n';
        }
        //Verificación de valores numéricos
        if (isNaN(valor)) {
            mensaje += "Ingrese un valor" + '\n';
        }
        if (isNaN(cantidad)) {
            mensaje += "Ingrese una cantidad" + '\n';
        }
        let parrafo_errores = document.getElementById("mensaje");
        parrafo_errores.innerText = mensaje;
        //Si no hay mensajes de error, retorna true
        return mensaje == "" ? true : false;
    })

    //Si la validación esta ok y retorna true, se agrega el producto al inventario
    //Si la validación retorna false, el producto no se agrega
    if (validar()) {

        let nuevo = new Producto(nombre, valor, cantidad);
        inventarioRopa.agregar(nuevo);
        document.getElementById("correcto").innerText = `Producto agregado correctamente`;
        document.getElementById("formulario").reset();
    }
}

function listar() {
    let resultado = document.getElementById("lista");
    //!Primer intento (los resultados me quedaban separados por comas)
    // resultado.innerText = inventarioRopa.productos.toString();
    // console.log(inventarioRopa.productos.toString());

    if (inventarioRopa.productos == "") { //si se aprieta listar sin haber ingresado productos
        resultado.innerText = "No ha ingresado ningún producto aún";
    } else {
        //!solución: usar un forEach() que ejecuta la función indicada una vez por cada elemento del array.
        document.getElementById("lista").innerText = ""; // vaciar lista
        inventarioRopa.productos.forEach(productos => resultado.innerText += productos.toString() + '\n');
        inventarioRopa.productos.forEach(productos => console.log(productos.toString()));
    }
}


