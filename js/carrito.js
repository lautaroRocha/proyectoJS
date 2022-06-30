
//Clase del objeto del carrito
class Pedido {
    constructor(cliente, direccion, producto, cantidad, talle, observaciones){
        this.cliente = cliente,
        this.direccion = direccion,
        this.producto = producto,
        this.cantidad = cantidad,
        this.talle = talle,
        this.observaciones = observaciones
    }
}

//Clase de los objetos a la venta
class Producto {
    constructor(clase, modelo, precio,link){
        this.clase = clase;
        this.modelo = modelo,
        this.precio = precio,
        this.link = link;
    }
}

//Display de productos y selección
const nombreProducto = document.querySelector('#producto-seleccion-nombre');
const productoSeleccionado = document.querySelector('#producto-seleccion');
const fotosProductos = document.querySelector('.tienda-fotos');
const filtroSeleccion = document.querySelector("#filtro");

//Productos disponibles
const PRODUCTOS = [];
PRODUCTOS.push(remeraNegraMontaña = new Producto("remera", "remera negra montaña",  1700, "images/remera1.png"));
PRODUCTOS.push(remeraBlancaMontaña = new Producto("remera", "remera blanca montaña", 1700, "images/remera2.png"));
PRODUCTOS.push(remeraCaminante = new Producto("remera", "remera caminante", 1700, "images/remera3.png"));
PRODUCTOS.push(remeraEmblema = new Producto("remera", "remera emblema", 1700, "images/remera4.png"));
PRODUCTOS.push(remeraCaminanteBlanca = new Producto("remera", "remera caminante blanca", 1700, "images/remera5.png"));
PRODUCTOS.push(remeraNegraMontañaBlanca = new Producto("remera", "remera negra montaña blanca", 1700, "images/remera6.png"));
PRODUCTOS.push(botaMarronAlta = new Producto("calzado", "bota marrón alta", 4000, "images/bota1.png") )
PRODUCTOS.push(botaGrisBaja = new Producto("calzado", "botín gris topo", 3500, "images/bota2.png"));
PRODUCTOS.push(botaNegraAlta = new Producto("calzado", "bota negra alta", 4000, "images/bota3.png"));
PRODUCTOS.push(gorroAustraliano = new Producto("gorro", "gorro australiano", 2000, "images/hat1.png"))
PRODUCTOS.push(gorraMontana = new Producto("gorro", "gorra montana", 1500, "images/hat2.png"));
PRODUCTOS.push(gorroFrio = new Producto("gorro", "gorro invierno", 4000, "images/hat3.png"))
//carrito
let datosClientes = document.querySelector("#forma-cliente")
const botonAnadir = document.querySelector("#anadir-carrito");
let carrito = [];

///Modal del carrito

let botonModal = document.querySelector('#boton-modal')
let carritoModal = document.querySelector('#carrito-modal')
let botonCerrarModal = document.querySelector("#cerrar-modal")
let cantidadCompra = document.querySelector("#cantidad-comprada");
let divFotos = document.querySelector("#carrito-flex");
let btnEliminar = document.querySelector('#eli-prod');

//El modelo del producto seleccionado
function actualizarNombre() {
    objetoElegido = PRODUCTOS.find(prod => prod.link == productoSeleccionado.getAttribute('src'))
    nombreProducto.textContent = objetoElegido.modelo;

   /*switch (productoSeleccionado.getAttribute('src')){
        case "images/remera1.png":
        nombreProducto.textContent = "remera negra";
        break;
        case "images/remera2.png":
        nombreProducto.textContent = "remera blanca";
        break;
        case "images/remera3.png":
        nombreProducto.textContent = "remera caminante";
        break;
        case "images/remera4.png":
        nombreProducto.textContent = "remera emblema";
        break;
        case "images/remera5.png":
        nombreProducto.textContent = "remera caminante blanca";
        break;
        case "images/remera6.png":
        nombreProducto.textContent = "remera montaña negra blanca";
        break;
        default : 
        nombreProducto.textContent = "";
      
    }*/
    }
 
//Crea las cards
//de los productos repasando
//el array

function filtrar(){

if (filtroSeleccion.value == "todo"){
    fotosProductos.innerHTML = "";
    for (let i=0; i < PRODUCTOS.length; i++) {
        let nuevaFoto = document.createElement('img');
        nuevaFoto.setAttribute('src', PRODUCTOS[i].link);
        fotosProductos.appendChild(nuevaFoto);
        nuevaFoto.addEventListener('click', () => 
        productoSeleccionado.setAttribute('src' , PRODUCTOS[i].link))
        nuevaFoto.addEventListener('click', actualizarNombre)
    }   
}else {
    fotosProductos.innerHTML = ""; 
    PRODUCTOS_FILTRADOS = PRODUCTOS.filter(produ => produ.clase == filtroSeleccion.value);
    for (let i=0; i < PRODUCTOS_FILTRADOS.length; i++) {
        let nuevaFoto = document.createElement('img');
        nuevaFoto.setAttribute('src', PRODUCTOS_FILTRADOS[i].link);
        fotosProductos.appendChild(nuevaFoto);
        nuevaFoto.addEventListener('click', () => 
        productoSeleccionado.setAttribute('src' , PRODUCTOS_FILTRADOS[i].link))
        nuevaFoto.addEventListener('click', actualizarNombre)
    }
}
}


///muestra el total de 
//productos pedidos en el carrito
function sumarCantidad() {
    cantidadCompra.textContent = carrito.reduce( (ac, pedido) => ac + parseInt(pedido.cantidad), 0);
}

//envía img seleccionada al
//carrito
function llenarCarrito(){
    let imagenCompra = document.createElement('img')
    imagenCompra.setAttribute('src', productoSeleccionado.getAttribute('src'));
    divFotos.appendChild(imagenCompra); 
}

//envia los datos del form
//al carrit
function enviarAlCarrito() {
    let talle = document.querySelector("#talle").value;
    let cantidad = document.querySelector("#canti").value;
    let observaciones = document.querySelector("#obs").value;
    let cliente = document.querySelector("#cliente").value;
    let direccion = document.querySelector("#direccion").value;
    
    ///evita que se envíe un pedido
    ///sin producto
    if(nombreProducto.innerText !== ""){
        carrito.push(new Pedido(`${cliente}`, `${direccion}`, `${nombreProducto.textContent}`, `${cantidad}`, `${talle}`,  `${observaciones}`));
        sumarCantidad();
    }else{
            alert('Aún no has seleccionado ningún producto')
        } ;
    
    llenarCarrito();

}

///enviar datos
datosClientes.addEventListener('submit', enviarAlCarrito);

//botones del modal
botonModal.onclick = function() {
    carritoModal.style.display = "block";
  }
botonCerrarModal.onclick = function() {
    carritoModal.style.display = "none";
}
btnEliminar.onclick = function (){
    carrito.pop()
    divFotos.removeChild(divFotos.lastChild)
    sumarCantidad()
}

filtroSeleccion.addEventListener('change', filtrar)