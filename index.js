// Importa las funciones desde el archivo funciones.js
import { loadCart, renderStars, updateCartCounter } from "./commonFunctions.js";

let data = [];
let productsCard = [];
let actualID;
let cart = {};
const resultsContainer = document.getElementById("results");
const cartLink = document.querySelector(".cartLink");

let filterkey = document.querySelectorAll("ul");
const inputFilter = document.getElementById("inputFilter");

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  if (localStorage.getItem("cartStorage")) {
    cart = loadCart(); // Cargo los productos del LocalStorage al carrito si existen
    updateCartCounter(cart);
  }
});

const fetchData = async () => {
  try {
    const res = await fetch("api.json");
    data = await res.json();
    productFilter(data, "id", "Ver Todos");
  } catch (err) {
    alert(
      "Error de comunicación con el servidor de datos - Error: " + err.message
    );
  }
};

//Filtra por Campo/Valor, recibe el Array de Productos, y por que campo va
// a filtrar ademas del valor, si recibe "Ver todos" muestra todos
// Ademas actualiza el Titulo de la lista de Productos
function productFilter(data, campo, valor) {
  const productsFilters = data.filter((producto) => {
    return producto[campo] == valor || valor === "Ver Todos";
  });

  const resultsTitle = document.getElementById("resultsTitle");
  resultsTitle.innerHTML = "";
  if (valor == "Ver Todos") valor = "Todos";
  resultsTitle.innerHTML = `Productos: ${valor}`;
  renderResults(productsFilters);
}

//Recibe los productos filtrados y lo muestra en pantalla
function renderResults(data) {
  resultsContainer.innerHTML = "";
  data.forEach((result) => {
    resultsContainer.innerHTML += `
    <div class="card" id="${result.id}">
        <img src="${result.thumbnailUrl}" alt="${result.title}">
        <h3 class="productPrice">${result.price} €</h3>
        <h3 class="brand">${result.brand}</h3>
        <h4>${result.title}</h4>
        <div class="rating">${renderStars(result.rating)}</div>
        
    </div> `;
  });
  productsCard = document.querySelectorAll(".card");
  productsCard.forEach((card) => {
    card.addEventListener("click", function () {
      actualID = card.id;
      window.location.href = "product.html?id=" + actualID;
    });
  });
}

//Captura por que campo y valor se desea filtrar
//Para hacer todo con una sola funcion de render
filterkey.forEach((filter) => {
  filter.addEventListener("click", function (e) {
    // Capturo la primer clase de todas las que tenga la etiqueta
    const campo = this.closest("ul").classList[0];

    let valor = e.target.innerText;

    if (valor === "") {
      // Si es una img no tiene un innerText uso el atributo data
      valor = e.target.getAttribute("data");
      console.log(campo, valor);
    }
    productFilter(data, campo, valor);
  });
});

//Filtro Rapido por Producto
inputFilter.addEventListener("input", function () {
  let textFilter = inputFilter.value.toLowerCase();
  document.getElementById(
    "resultsTitle"
  ).innerHTML = `Productos: ${textFilter}`;

  let result = data.filter(function (producto) {
    return producto.title.toLocaleLowerCase().includes(textFilter);
  });
  renderResults(result);
});

cartLink.addEventListener("click", function () {
  if (Object.values(cart).length > 0) {
    window.location.href = "cart.html";
  } else {
    Swal.fire("Carrito Vacío!", "Puedes comprar algo de la tienda", "warning");
  }
});
