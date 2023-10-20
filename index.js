document.addEventListener("DOMContentLoaded", (e) => {
  fetchData();
});

let data = [];

const fetchData = async () => {
  const res = await fetch("api.json");
  data = await res.json();

  const campo = "color";
  const valor = "Azul";
  renderFilters(data, campo, valor);
};

//Recibe el json de la consulta y lo muestra en pantalla
let resultsContainer = document.getElementById("results");

async function renderResults(data) {
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

//Filtro por marca
function renderFilters(data, campo, valor) {
  const productsFilters = data.filter((producto) => producto[campo] === valor);
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
