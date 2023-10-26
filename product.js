// Importa las funciones desde el archivo funciones.js
import {
  loadCart,
  renderStars,
  updateCartCounter,
  pageback,
} from "./commonFunctions.js";

// Obtenemos el valor del parámetro de consulta 'dato' de la URL
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
let data = [];
let productActual = {}; //Objeto con el producto seleccionado
let cart = {}; //declaro el objeto donde van a estar los productos del carrito
let productContainer = document.getElementById("result");
let btnAddCart = document.getElementById("btnAddCart");
const logoLink = document.querySelector(".navLogo");
const btnCancel = document.getElementById("btnCancel");
const cartLink = document.querySelector(".cartLink");

document.addEventListener("DOMContentLoaded", () => {
  fetchData(); //Traigo todos los productos
  if (localStorage.getItem("cartStorage")) {
    cart = loadCart(); // Cargo los productos del LocalStorage al carrito si existen
    updateCartCounter(cart);
  }
});

const fetchData = async () => {
  try {
    const res = await fetch("api.json");
    data = await res.json();
    productFilter(data, id);
  } catch (err) {
    alert(
      "Error de comunicación con el servidor de datos - Error: " + err.message
    );
  }
};

//Uso el método find porque se que solo voy a encontrar un producto
// con ese id
function productFilter(data, id) {
  productActual = data.find((item) => {
    return item.id == id;
  });
  renderResults(productActual);
  //Click en botón Agregar Al Carrito
  btnAddCart.addEventListener("click", () => {
    setCart(productActual);
  });
}

//Recibe el json de la consulta y genera las cards guardo el ID
function renderResults(product) {
  productContainer.innerHTML = `
        <div class="productSelected d-flex" id="${product.id}">  
        <div class="imgContainer " >  
          <img class="" src="${product.thumbnailUrl}">
        </div>
        <div class="productContainer d-flex flex-column align-items-start" >  
          <h2 class="">${product.brand}</h2>
          <H1 class="">${product.title}</H1>
          <h3 class="productPrice ">${product.price} €</h3>
          <div class="container d-flex align-items-center ">
              <div class="rating">${renderStars(product.rating)} </div>
              <h6 class="m-3">Rating: ${product.rating}/5 </h6>
          </div>
          <h6 class="">Descripción: </h6>
          <p class="">${product.details}</p>
          <h4 class="" id="${product.color}">Color: ${product.color}</h4> 
         </div>
       </div>`;
}

function setCart(productAdd) {
  const product = {
    id: productAdd.id,
    title: productAdd.title,
    price: productAdd.price,
    image: productAdd.thumbnailUrl,
    quantity: 1,
  };

  // Pregunto si en el carrito ya hay algun producto con este id
  // Si hay le sumo 1 en cantidad
  if (cart.hasOwnProperty(product.id)) {
    product.quantity += cart[product.id].quantity;
  }

  //Agrego el produto al array y guardo en el LocalStorage
  cart[product.id] = { ...product };

  //Para guardar en LocalStorage debo convertir el objeto a string json
  localStorage.setItem("cartStorage", JSON.stringify(cart));
  updateCartCounter(cart);
  //Muestro un mensaje de informativo
  AddedSuccessfully.fire({
    icon: "success",
    title: "El producto fué agregado al carrito",
  });
  // Espero para visualizar el mensaje y Vuelvo a la pagina principal

  setTimeout(function () {
    pageback(); // Cambia la URL a la nueva página
  }, 1150);
}

btnCancel.addEventListener("click", function () {
  pageback();
});

logoLink.addEventListener("click", function () {
  pageback();
});

const AddedSuccessfully = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1100,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

cartLink.addEventListener("click", function () {
  if (Object.values(cart).length > 0) {
    window.location.href = "cart.html";
  } else {
    Swal.fire("Carrito Vacío!", "Puedes comprar algo de la tienda", "warning");
  }
});
