// Obtenemos el valor del parámetro de consulta 'dato' de la URL
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
let data = [];
let productActual; //Objeto con el producto seleccionado
let cart = {}; //declaro el objeto donde van a estar los productos del carrito

document.addEventListener("DOMContentLoaded", () => {
  fetchData();

  if (localStorage.getItem("cart") != null) {
    cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
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

let resultsContainer = document.getElementById("results");

//Filtra por Campo/Valor, recibe el Array de Productos, y por que campo va
// a filtrar ademas del valor, si recibe "Ver todos" muestra todos
// Ademas actualiza el Titulo de la lista de Productos
function productFilter(data, valor) {
  productActual = data.filter((item) => {
    return item.id == valor;
  });
  console.log(productActual);
  renderResults(productActual);
}

let productContainer = document.getElementById("result");

//Recibe el json de la consulta y genera las cards guardo el ID
function renderResults(product) {
  productContainer.innerHTML = `
        <div class="productSelected d-flex" id="${product[0].id}">  
       

        <div class="imgContainer " >  
          <img class="" src="${product[0].thumbnailUrl}">
        </div>
        <div class="productContainer d-flex flex-column align-items-start" >  
          <h2 class="">${product[0].brand}</h2>
          <H1 class="">${product[0].title}</H1>
          <h3 class="productPrice ">${product[0].price} €</h3>
          <div class="container d-flex align-items-center ">
              <div class="rating">${renderStars(product[0].rating)} </div>
              <h6 class="m-3">Rating: ${product[0].rating}/5 </h6>
          </div>
          <h6 class="">Descripción: </h6>
          <p class="">${product[0].details}</p>
          <h4 class="" id="${product[0].color}">Color: ${product[0].color}</h4> 
         </div>
         
              
       </div>`;

  //Escuchar los botones para ver que hacer
  // Agregar al carrito o Volver al index
}

// Función para generar estrellas en proporción al rating
function renderStars(rating) {
  const stars = "★★★★★"; // Cinco estrellas llenas
  const starsZero = "☆☆☆☆☆"; // Cinco estrellas vacías
  const starsMax = 5; // Valor máximo de calificación

  const starsFull = stars.slice(0, rating);
  const starsCount = starsZero.slice(0, starsMax - rating);

  return starsFull + starsCount;
}

let btnAddCart = document.getElementById("btnAddCart");

//Click en botón Agregar Al Carrito
btnAddCart.addEventListener("click", () => {
  setCart(productActual);
});

const setCart = (productAdd) => {
  const product = {
    id: productAdd[0].id,
    title: productAdd[0].title,
    price: productAdd[0].price,
    image: productAdd[0].thumbnailUrl,
    quantity: 1,
  };

  // Pregunto si en el carrito ya hay algun producto con este id
  // Si hay le sumo 1 en cantidad
  if (cart.hasOwnProperty(product.id)) {
    product.quantity += cart[product.id].quantity;
  }

  //Agrego el produto al array y guardo en el LocalStorage
  cart[product.id] = { ...product };
  localStorage.setItem("cart", JSON.stringify(cart));

  //Vuelvo a la pagina principal
  pageback();
};

const logoLink = document.getElementById("logo");
const btnCancel = document.getElementById("btnCancel");

btnCancel.addEventListener("click", function () {
  pageback();
});

logoLink.addEventListener("click", function () {
  pageback();
});

function pageback() {
  window.location.href = "index.html";
}
