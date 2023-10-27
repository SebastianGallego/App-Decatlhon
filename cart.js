// Importa las funciones desde el archivo funciones.js
import { loadCart, pageback } from "./commonFunctions.js";

let cart = {};
const productRows = document.getElementById("productRows");
const btnClearCart = document.getElementById("btnClearCart");
const btnProductsPay = document.getElementById("btnProductsPay");
const btnReturn = document.getElementById("btnReturn");
const logo = document.getElementById("logo");

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("cartStorage")) {
    cart = loadCart(); // Cargo los productos del LocalStorage al carrito si existen
    productRows.innerHTML = "";

    console.log(cart);

    renderCart();
  }
});

function renderCart() {
  productRows.innerHTML = "";
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
          <button class="btn btn-danger" data-id = ${product.id}>-</button>
          <span class="quantity">${product.quantity}</span>
          <button class="btn btn-success" data-id = ${product.id}>+</button>
      </td>
          <td>${product.quantity * product.price} €</td>
      <td>
          <button class="btn btn-warning" data-id = ${
            product.id
          }>Eliminar</button>
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

//Confirmacion de Vaciar Carrito
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
  } else {
    Swal.fire("Carrito Vacío!", "No hay productos para pagar.", "warning");
  }
});

//Escucho los Botones de la tabla
//Los selecciono por la clase

productRows.addEventListener("click", (e) => {
  btnCantidad(e);
});

const btnCantidad = (e) => {
  if (e.target.classList.contains("btn-success")) {
    const id = e.target.dataset.id;
    const product = cart[id];
    product.quantity++;
    cart[id] = { ...product };
  }

  if (e.target.classList.contains("btn-danger")) {
    const id = e.target.dataset.id;
    const product = cart[id];
    product.quantity--;

    if (cart[id].quantity === 0) {
      delete cart[id];
    } else {
      cart[id] = { ...product };
    }
  }

  if (e.target.classList.contains("btn-warning")) {
    const id = e.target.dataset.id;
    console.log("borrar", id);
    delete cart[id];
  }

  renderCart();
  localStorage.setItem("cartStorage", JSON.stringify(cart));

  e.stopPropagation();
};

logo.addEventListener("click", () => {
  pageback();
});

/* Plantilla Modal de contacto

<div class="modal fade" id="modalContactForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header text-center">
        <h4 class="modal-title w-100 font-weight-bold">Write to us</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body mx-3">
        <div class="md-form mb-5">
          <i class="fas fa-user prefix grey-text"></i>
          <input type="text" id="form34" class="form-control validate">
          <label data-error="wrong" data-success="right" for="form34">Your name</label>
        </div>

        <div class="md-form mb-5">
          <i class="fas fa-envelope prefix grey-text"></i>
          <input type="email" id="form29" class="form-control validate">
          <label data-error="wrong" data-success="right" for="form29">Your email</label>
        </div>

        <div class="md-form mb-5">
          <i class="fas fa-tag prefix grey-text"></i>
          <input type="text" id="form32" class="form-control validate">
          <label data-error="wrong" data-success="right" for="form32">Subject</label>
        </div>

        <div class="md-form">
          <i class="fas fa-pencil prefix grey-text"></i>
          <textarea type="text" id="form8" class="md-textarea form-control" rows="4"></textarea>
          <label data-error="wrong" data-success="right" for="form8">Your message</label>
        </div>

      </div>
      <div class="modal-footer d-flex justify-content-center">
        <button class="btn btn-unique">Send <i class="fas fa-paper-plane-o ml-1"></i></button>
      </div>
    </div>
  </div>
</div>

<div class="text-center">
  <a href="" class="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#modalContactForm">Launch
    Modal Contact Form</a>
</div>


*/
