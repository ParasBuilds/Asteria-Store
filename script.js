// Dummy product data (replace with real API calls if adding backend)
const products = [
    { id: 1, name: 'Stylish Dress', price: 50, image: 'https://via.placeholder.com/250x200?text=Dress' },
    { id: 2, name: 'Casual Shirt', price: 30, image: 'https://via.placeholder.com/250x200?text=Shirt' },
    { id: 3, name: 'Elegant Shoes', price: 80, image: 'https://via.placeholder.com/250x200?text=Shoes' },
    { id: 4, name: 'Fashion Bag', price: 40, image: 'https://via.placeholder.com/250x200?text=Bag' },
    // Add more as needed
];

const productGrid = document.getElementById('product-grid');
const cartCount = document.getElementById('cart-count');

// Load products
products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productGrid.appendChild(card);
});

// Add to cart (simple localStorage)
function addToCart(id) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cartCount.textContent = cart.length;
}

// Scroll to products
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Initialize cart count on load
updateCartCount();