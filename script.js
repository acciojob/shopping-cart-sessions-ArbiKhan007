// This is the boilerplate code given for you
// You can modify this code
// Product data
document.addEventListener('DOMContentLoaded', function() {
	const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

//session storage
const sessionStorage=window.sessionStorage

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn")

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" onclick="addToCart(${product.id})" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

const cartData=[]
// Render cart list
function renderCart(product) {
	if(product==null) return;
	const li = document.createElement("li");
	li.innerHTML=`Id: ${product.id} -> Product Name: ${product.name} Price: ${product.price}`;
	cartList.appendChild(li);
}

function renderCartFromSession() {
  const stored = sessionStorage.getItem("cart_data");
  const cartSessionData = stored ? JSON.parse(stored) : [];

  if (!Array.isArray(cartSessionData) || cartSessionData.length === 0) return;

  cartData.push(...cartSessionData);

  cartSessionData.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `Id: ${product.id} -> Product Name: ${product.name} Price: ${product.price}`;
    cartList.appendChild(li);
  });
}


// Add item to cart
function addToCart(productId) {
	console.log(cartData);
	cartData.push(products[productId-1])
	sessionStorage.setItem("cart_data", JSON.stringify(cartData));
	renderCart(cartData.at(-1))
}

// Remove item from cart
function removeFromCart(productId) {}

// Clear cart
clearCartBtn.addEventListener("click", ()=>clearCart())
function clearCart() {
	cartData.length=0;
	cartList.innerHTML=''
	sessionStorage.setItem("cart_data", JSON.stringify(cartData))
}

// Initial render
renderProducts();
renderCartFromSession();
renderCart()      
});
