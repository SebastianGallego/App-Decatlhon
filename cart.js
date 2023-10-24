document.addEventListener("DOMContentLoaded", () => {
  verifyCart();
});

function verifyCart() {
  if (localStorage.getItem("cart") != null) {
    cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
  }
}

function renderCart(cart) {}
