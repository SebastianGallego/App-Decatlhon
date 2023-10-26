// Importa las funciones desde el archivo funciones.js
import { loadCart, pageback } from "./commonFunctions.js";

let cart = {};
const productRows = document.getElementById("productRows");
const btnClearCart = document.getElementById("btnClearCart");
const btnProductsPay = document.getElementById("productsPay");
const btnReturn = document.getElementById("btnReturn");

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("cartStorage")) {
    cart = loadCart(); // Cargo los productos del LocalStorage al carrito si existen

    console.log(cart);
    productRows.innerHTML = "";
    renderCart();
  }
});

function renderCart() {
  Object.values(cart).forEach((product) => {
    productRows.innerHTML += `
      <tr>
        <td>1</td>
            <td class="text-start">
              <img src="${
                product.image
              }" alt="Imagen del Producto" class="productImg">
              <span class="d-inline ms-2">${product.title}</span>
            </td>
        <td>${product.price} €</td>
      <td>
          <button class="btn btn-danger">-</button>
          <span class="quantity">${product.quantity}</span>
          <button class="btn btn-success">+</button>
      </td>
          <td>${product.quantity * product.price} €</td>
      <td>
          <button class="btn btn-danger">Eliminar</button>
      </td>
    </tr>
         `;
  });
  updateResume();
}

//Actualiza los valores del Total de Items y el Total a Pagar
// Acumula la Cantidad de items y suma totales
function updateResume() {
  const totalItems = Object.values(cart).reduce(
    (acc, { quantity }) => acc + quantity,
    0
  );
  const totalPay = Object.values(cart).reduce(
    (acc, { quantity, price }) => acc + quantity * price,
    0
  );

  console.log(totalItems, totalPay);
  document.getElementById("totalItems").textContent = totalItems;
  document.getElementById("totalPay").textContent = totalPay + " €";
}

btnReturn.addEventListener("click", () => {
  //volver al index
  pageback();
});

//Vaciar el Carrito, limpio el objero carrito, limpio la tabla
//grabo en el LocalStorage y actualiso el Resumen
btnClearCart.addEventListener("click", () => {
  cart = {};
  productRows.innerHTML = "";
  localStorage.setItem("cartStorage", JSON.stringify(cart));
  updateResume();
});
