// Importa las funciones desde el archivo funciones.js
import { loadCart, pageback } from "./commonFunctions.js";

let cart = {};
const productRows = document.getElementById("productRows");
const btnClearCart = document.getElementById("btnClearCart");
const btnProductsPay = document.getElementById("btnProductsPay");
const btnReturn = document.getElementById("btnReturn");
const logo = document.getElementById("logo");
const containerModal = document.getElementsByClassName("containerModal");

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("cartStorage")) {
    cart = loadCart(); // Cargo los productos del LocalStorage al carrito si existen
    productRows.innerHTML = "";
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

//volver al index
btnReturn.addEventListener("click", () => {
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
  renderModalPay();
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
    delete cart[id];
  }

  renderCart();
  localStorage.setItem("cartStorage", JSON.stringify(cart));

  e.stopPropagation();
};

logo.addEventListener("click", () => {
  pageback();
});

//Genero el Modal para el Pago
function renderModalPay() {
  const pay = document.getElementById("totalPay").textContent;

  Swal.fire({
    title: "Ingrese los dato para la Compra",
    html: ` <input type="text" id="name" class="swal2-input" placeholder="Nombre">
    <input type="text" id="surname" class="swal2-input" placeholder="Apellido">
   <input type="email" id="email" class="swal2-input" placeholder="correo@email.com">
   <p>Total a pagar: <span id="">${pay} </span></p>
    `,
    confirmButtonText: "Pagar",
    focusConfirm: false,
    preConfirm: () => {
      const name = Swal.getPopup().querySelector("#name").value;
      const surname = Swal.getPopup().querySelector("#surname").value;
      const email = Swal.getPopup().querySelector("#email").value;

      return { name: name, surname: surname, email: email, pay: pay };
    },
  }).then((checkOutData) => {
    checkOut(checkOutData.value);
  });
}

//Generar un ticket  con un numero de  operacion random
// Ademas
function checkOut(checkOutData) {
  const textMensaje = `${checkOutData.name} ${checkOutData.surname}`;

  localStorage.setItem("cartStorage", "");
  productRows.innerHTML = "";
  document.getElementById("totalItems").textContent = 0;
  document.getElementById("totalPay").textContent = 0 + " €";
  btnClearCart.style.display = "none";
  btnProductsPay.style.display = "none";

  let transationId = "";
  for (let i = 0; i < 6; i++) {
    const digit = Math.floor(Math.random() * 10); // Genera un dígito aleatorio del 0 al 9
    transationId += digit;
  }
  Swal.fire({
    icon: "success",
    title: "Gracias por su compra",
    text: `${textMensaje}`,
    footer: `<p>Número de Operacion: ${transationId} - Importe:${checkOutData.pay} </p>`,
  });
}
