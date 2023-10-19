// Obtenemos el valor del parámetro de consulta 'dato' de la URL
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");

const url = `https://fakestoreapi.com/products/${id}`;

//Pido los Productos al Servidor
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    getResult(data);
  })
  .catch((error) => {
    console.error("Error al obtener datos de la API:", error);
  });

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
