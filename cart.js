// Importa las funciones desde el archivo funciones.js
import { loadCart } from "./commonFunctions.js";

let cart = {};

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("cartStorage")) {
    cart = loadCart(); // Cargo los productos del LocalStorage al carrito si existen
    updateCartCounter(cart);
  }
});

function renderCart(cart) {}
