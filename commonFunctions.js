export { loadCart, renderStars, updateCartCounter };

// Cargo los productos del LocalStorage al carrito si existen
function loadCart() {
  // Cargo los productos del LocalStorage al carrito
  const cartStorage = JSON.parse(localStorage.getItem("cartStorage"));
  return cartStorage;
}

function updateCartCounter(cart) {
  const cartItems = Object.keys(cart).length;
  const cartCounter = document.getElementById("cartCounter");
  cartCounter.innerHTML = cartItems;
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
