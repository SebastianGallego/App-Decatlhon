document.addEventListener("DOMContentLoaded", (e) => {
  fetchData();
});

let data = [];

const fetchData = async () => {
  const res = await fetch("api.json");
  data = await res.json();
  renderFilters(data, (campo = "id"), (valor = "Ver Todos"));
};

//Recibe el json de la consulta y lo muestra en pantalla
let resultsContainer = document.getElementById("results");

async function renderResults(data) {
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

//Filtro por Campo/Valor, recibe el Array de Productos, y por que campo va
// a filtrar ademas del valor, si recibe "All" muestra todos
function renderFilters(data, campo, valor) {
  console.log(campo, valor);
  const productsFilters = data.filter((producto) => {
    return producto[campo] === valor || valor === "Ver Todos";
  });
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

let filterCategory = document.querySelectorAll(".category");

filterCategory.forEach((category) => {
  category.addEventListener("click", function (e) {
    const campo = "category";
    const valor = category.innerText;
    renderFilters(data, campo, valor);
  });
});
