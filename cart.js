// Importa las funciones desde el archivo funciones.js
import { loadCart, pageback } from "./commonFunctions.js";

let cart = {};
const productRows = document.getElementById("productRows");
const btnClearCart = document.getElementById("btnClearCart");
const btnProductsPay = document.getElementById("btnProductsPay");
const btnReturn = document.getElementById("btnReturn");

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("cartStorage")) {
    cart = loadCart(); // Cargo los productos del LocalStorage al carrito si existen
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
  document.getElementById("totalItems").textContent = totalItems;
  document.getElementById("totalPay").textContent = totalPay + " €";

  if (Object.values(cart).length == 0) {
    btnClearCart.style.display = "none";
    btnProductsPay.style.display = "none";
  }
}

btnReturn.addEventListener("click", () => {
  //volver al index
  pageback();
});

//Si hay productos en el carrito, limpio el objero carrito,
// limpio la tabla grabo en el LocalStorage y actualiso el Resumen
btnClearCart.addEventListener("click", () => {
  if (Object.values(cart).length > 0) {
    CartEmpy();
  }
});

function CartEmpy() {
  Swal.fire({
    title: "Está seguro de vaciar el Carrito?",
    text: "Estas a tiempo de arrepentirte!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, vaciar carrito!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        "Carrito Vacío!",
        "El carrito ya no tiene productos 😥.",
        "success"
      );
      cart = {};
      localStorage.setItem("cartStorage", JSON.stringify(cart));
      productRows.innerHTML = "";
      updateResume();
    }
  });
}

//Pago
btnProductsPay.addEventListener("click", () => {
  if (Object.values(cart).length > 0) {
    CartEmpy();
  } else {
    Swal.fire("Carrito Vacío!", "No hay productos para pagar.", "warning");
  }
});
