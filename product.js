// Obtenemos el valor del parámetro de consulta 'dato' de la URL
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
let data = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const fetchData = async () => {
  const res = await fetch("api.json");
  data = await res.json();
  console.log(data, id);
  productFilter(data, "id", id);
};

let resultsContainer = document.getElementById("results");

//Filtra por Campo/Valor, recibe el Array de Productos, y por que campo va
// a filtrar ademas del valor, si recibe "Ver todos" muestra todos
// Ademas actualiza el Titulo de la lista de Productos
function productFilter(data, campo, valor) {
  const productsFilters = data.filter((producto) => {
    return producto[campo] == valor || valor === "Ver Todos";
  });

  //const resultsTitle = document.getElementById("resultsTitle");
  //resultsTitle.innerHTML = "";

  console.log(productsFilters);

  //renderResults(productsFilters);
}

/*
//Recibe el json de la consulta y genera las cards guardo el ID
let productContainer = document.querySelector(".product-item");

function getResult(product) {
  productContainer.innerHTML = `
        <div class="shop-detail" id="${product.id}">  
              <span class="product-title">${product.title}</span>
              <img class="shop-item-image" src="${product.image}">
              <span class="shop-item-description">${product.description}</span>
              <div class="shop-item-details">
                <span class="shop-item-price">$ ${product.price}</span>
                <button class="btn btn-primary addCart-btn" type="button">Agregar al Carrito</button>
                <button class="btn btn-primary cancel-btn" type="button" >Cancelar</button>
              </div>
          </div>`;

  //Escuchar los botones para ver que hacer
  // Agregar al carrito o Volver al index
}

const logoLink = document.getElementById("logo");
const titleLink = document.getElementById("title");

logoLink.addEventListener("click", function () {
  pageback();
});

titleLink.addEventListener("click", function () {
  pageback();
});

function pageback() {
  window.location.href = "index.html";
}
*/
