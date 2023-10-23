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
  productFilter(data, id);
};

let resultsContainer = document.getElementById("results");

//Filtra por Campo/Valor, recibe el Array de Productos, y por que campo va
// a filtrar ademas del valor, si recibe "Ver todos" muestra todos
// Ademas actualiza el Titulo de la lista de Productos
function productFilter(data, valor) {
  const productsFilters = data.filter((producto) => {
    return producto.id == valor;
  });
  renderResults(productsFilters);
}

let productContainer = document.getElementById("result");

//Recibe el json de la consulta y genera las cards guardo el ID
function renderResults(product) {
  productContainer.innerHTML = `
        <div class="productSelected" id="${product[0].id}">  
       

        <div class="imgContainer" >  
          <img class="shop-item-image" src="${product[0].thumbnailUrl}">
        </div>
        <div class="productContainer" >  
          <h2 class="shop-item-description">${product[0].brand}</h2>
          <H1 class="product-title">${product[0].title}</H1>
          <h3 class="shop-item-price">$ ${product[0].price}</h3>
          <p class="shop-item-description">${product[0].rating}</p>
          <p class="shop-item-description">${product[0].details}</p>
          <h4 class="shop-item-description">Color: ${product[0].color}</h4> 
         </div>
        
         <button class="btn btn-primary addCart-btn" type="button">Agregar al Carrito</button>
         <button class="btn btn-primary cancel-btn" type="button" >Cancelar</button>
              
       </div>`;

  //Escuchar los botones para ver que hacer
  // Agregar al carrito o Volver al index
}

//const logoLink = document.getElementById("logo");
//const titleLink = document.getElementById("title");
/*
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
