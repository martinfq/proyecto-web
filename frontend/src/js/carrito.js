let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

const serverURL = "http://localhost:3000";

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});
let productList = [];


//console.log(productList);
function readAllProducts() {
   try {
    let temp = []
    fetch(`${serverURL}/api/read`)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
       productList = [...data]   
      // Iterar sobre los objetos en el JSON y agregar los estudiantes a la lista
      data.forEach((value,key) => {
        // const id = String(item.id) ;
        // const product = item.product;
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src="${value.product.url}">
            <div class="title">${value.product.nombre}</div>
            <div class="price"> \$ ${parseFloat(value.product.precio)}</div>
            <button type="button" onclick="addToCard(${key})" id="botonCard">Agregue al carrito</button>`;
        list.appendChild(newDiv);
      });
    })

   } catch (error) {
    console.error("Error al leer:", error)
   } 
}

readAllProducts();

setTimeout(()=>{
    console.log(productList)
},3000)

const productsInCardList = [];
function addToCard(key){
    console.log(productList[0])
    if(productsInCardList[key] == null){
        // copy product form list to list card
        productsInCardList[key] = JSON.parse(JSON.stringify(productList[key]));
        productsInCardList[key].quantity = 1;
    }
    reloadCard();
}
// function addToCard(key) {
//     if(productsInCardList){
//         const product = productList.filter(item => item.id == key);
//         productsInCardList.push(product);
//         productsInCardList.filter(item => item.id == key).map((item)=> item.quantity=1);
//         console.log(productsInCardList)
//     }
//   //reloadCard();
// }

function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  productsInCardList.forEach((value, key) => {
    totalPrice = totalPrice + parseFloat(value.product.precio) * value.quantity;
    count = count + value.quantity;
    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
                <div><img src="${value.product.url}"/></div>
                <div>${value.product.nombre}</div>
                <div>${parseFloat(value.product.precio)}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${true})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${false})">+</button>
                </div>`;
      listCard.appendChild(newDiv);
    }
  });
  total.innerText = `Total: ${totalPrice.toLocaleString()}`
  quantity.innerText = count;
}
function changeQuantity(key, condicion) {
  if (quantity == 0) {
    delete productsInCardList[key];
  } else {
    if(condicion){
        productsInCardList[key].quantity = productsInCardList[key].quantity - 1;
    }else{
        productsInCardList[key].quantity = productsInCardList[key].quantity + 1;
    } 
  }
  reloadCard();
}


