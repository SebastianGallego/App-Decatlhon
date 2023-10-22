document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

let data = [];

const fetchData = async () => {
  const res = await fetch("api.json");
  data = await res.json();
  productFilter(data, (campo = "id"), (valor = "Ver Todos"));
};

let resultsContainer = document.getElementById("results");

//Recibe los productos filtrados y lo muestra en pantalla
function renderResults(data) {
  resultsContainer.innerHTML = "";
  data.forEach((result) => {
    resultsContainer.innerHTML += `
    <div class="card">
        <img src="${result.thumbnailUrl}" alt="${result.title}">
        <h3 class="productPrice">${result.price} €</h3>
        <h3 class="brand">${result.brand}</h3>
        <h4>${result.title}</h4>
        <div class="rating">${renderStars(result.rating)}</div>
        
    </div> `;
  });
}

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

// Función para generar estrellas en proporción al rating
function renderStars(rating) {
  const stars = "★★★★★"; // Cinco estrellas llenas
  const starsZero = "☆☆☆☆☆"; // Cinco estrellas vacías
  const starsMax = 5; // Valor máximo de calificación

  const starsFull = stars.slice(0, rating);
  const starsCount = starsZero.slice(0, starsMax - rating);

  return starsFull + starsCount;
}

let filterkey = document.querySelectorAll("ul");

//Captura por que campo y valor se desea filtrar
//Para hacer todo con una sola funcion de render
filterkey.forEach((filter) => {
  filter.addEventListener("click", function (e) {
    // Capturo la primer clase de todas las que tenga la etiqueta
    const campo = filter.classList[0];
    let valor = e.target.innerText;
    if (valor === "") {
      // Si es una img no tiene un innerText uso el atributo data
      valor = e.target.getAttribute("data");
    }
    productFilter(data, campo, valor);
  });
});

const inputFilter = document.getElementById("inputFilter");

//Filtro Rapido por Producto
inputFilter.addEventListener("input", function () {
  let textFilter = inputFilter.value.toLowerCase();
  if (textFilter.length > 0) {
    let result = data.filter(function (producto) {
      return producto.title.toLocaleLowerCase().includes(textFilter);
    });
    renderResults(result);
  }
});
