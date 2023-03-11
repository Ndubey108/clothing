const productList = document.getElementById('product-list');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const priceSort = document.getElementById('price-sort');

let cart = [];

// function to render products
function renderProducts(products) {
  productList.innerHTML = '';
  products.forEach(product => {
    const productDiv = document.createElement('div');
     productDiv.classList.add("box"); 
       
    const productImg = document.createElement('img');
    productImg.src=product.image;
    productImg.classList.add("img1");
    const productName = document.createElement('h3');
    const productPrice = document.createElement('p');

    const addToCartButton = document.createElement('button');
    const removeFromCartButton = document.createElement('button');
   
  
    productName.textContent = product.title;
    productPrice.textContent = '$' + product.price.toFixed(2);
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.classList.add("add");
    removeFromCartButton.textContent = 'Remove from Cart';
    removeFromCartButton.classList.add("remove");
    addToCartButton.addEventListener('click', () => {
      addToCart(product);
    });
    removeFromCartButton.addEventListener('click', () => {
      removeFromCart(product);
    });
    productDiv.appendChild(productImg);
    productDiv.appendChild(productName);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(addToCartButton);
    productDiv.appendChild(removeFromCartButton);
   

    productList.appendChild(productDiv);
  });
}

// function to sort products by price
function sortProducts(products, sortType) {
  if (sortType === 'low-to-high') {
    products.sort((a, b) => a.price - b.price);
  } else if (sortType === 'high-to-low') {
    products.sort((a, b) => b.price - a.price);
  }
  return products;
}

// function to fetch products from the API and render them
function fetchAndRenderProducts(sortType) {
  fetch('https://fakestoreapi.com/products/')
    .then(response => response.json())
    .then(data => {
      const sortedProducts = sortProducts(data, sortType);
      renderProducts(sortedProducts);
    })
    .catch(error => console.error(error));
}

// function to add a product to the cart
function addToCart(product) {
  cart.push(product);
  cartCount.textContent = cart.length;
  const cartItem = document.createElement('li');
  cartItem.textContent = product.title;
  cartItems.appendChild(cartItem);
}

// function to remove a product from the cart
function removeFromCart(product) {
  const index = cart.findIndex(item => item.id === product.id);
  if (index !== -1) {
    cart.splice(index, 1);
    cartCount.textContent = cart.length;
    const cartItem = document.querySelector(`li[data-id="${product.id}"]`);
    if (cartItem) {
      cartItems.removeChild(cartItem);
    }
  }
}

// fetch and render products on page load
fetchAndRenderProducts(priceSort.value);

// handle price sort change
priceSort.addEventListener('change', event => {
  fetchAndRenderProducts(event.target.value);
});
