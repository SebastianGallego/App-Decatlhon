let productContainer = document.querySelector(".shop-items");
let productsArray = [];
let viewMoreBtn = [];
let actualID;
let buttons;

// Parametros de la API
/*const url = "https://shoes-collections.p.rapidapi.com/shoes";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "07c3d30a48msh7f14b4b7ccee2cap11c871jsn9e2f0660efb4",
    "X-RapidAPI-Host": "shoes-collections.p.rapidapi.com",
  },
};*/

//Pido los Productos al Servidor
//fetch(url, options)
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    console.log(data); //Luego quitar Comentario
    productsArray = data.slice(0, 21); //Me queso con 21 Productos

    getResults(productsArray); //Llamo a la funcion que genera las cards
  })
  .catch((error) => {
    console.error("Error al obtener datos de la API:", error);
  });

//Recibe el json de la consulta y genera las cards guardo el ID
function getResults(productsArray) {
  productsArray.forEach((product) => {
    const title = product.title.substring(0, 30);

    productContainer.innerHTML += `
        <div class="shop-item" id="${product.id}">  
        <img class="shop-item-image" src="${product.image}">
        <span class="shop-item-title">${title}</span>
        <div class="shop-item-details">
            <span class="shop-item-price">$ ${product.price}</span>
            <button class="btn btn-primary view-more-btn" type="button">Ver más</button>
        </div>
    </div>`;
  });

  //Para convertir de NodeList a un Array de Botones
  viewMoreBtn = document.querySelectorAll(".view-more-btn");
  viewMoreBtn = [...viewMoreBtn];

  //Escucho el clic los botones de las tarjetas, con el ID voy y busco en
  //el Array de Productos el Producto Actual

  viewMoreBtn.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      if (event.target.classList.contains("view-more-btn")) {
        actualID = parseInt(event.target.parentNode.parentNode.id);
      }
      //paso el ID como parametro para luego Buscarlo
      window.location.href = "product.html?id=" + actualID;
    });
  });
}
