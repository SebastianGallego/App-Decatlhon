export { loadCart, renderStars };

// Cargo los productos del LocalStorage al carrito si existen
function loadCart() {
  // Cargo los productos del LocalStorage al carrito
  if (localStorage.getItem("cart") != null) {
    const cartStorage = JSON.parse(localStorage.getItem("cart"));
    console.log(cartStorage);
    return cartStorage;
  }
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
