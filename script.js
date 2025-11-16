// REAL product data using your GitHub filenames
const products = [
    {
        id: 1,
        name: "Arcane Threads Zip-Up",
        price: 2199,
        image: "Arcane Threads Zip-Up.jpg"
    },
    {
        id: 2,
        name: "Reaper Wing Hoodie",
        price: 2199,
        image: "Reaper Wing Hoodie.jpg"
    },
    {
        id: 3,
        name: "Rogue Shred Hoodie",
        price: 2199,
        image: "Rogue Shred Hoodie.jpg"
    },
    {
        id: 4,
        name: "Echo Recall Hoodie",
        price: 2199,
        image: "Echo Recall Hoodie.jpg"
    }
];

const productGrid = document.getElementById("product-grid");
const cartCount = document.getElementById("cart-count");

// Render Products in Grid
products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">Rs. ${product.price}.00</p>
    `;

    productGrid.appendChild(card);
});

// Cart System (optional)
function addToCart(id) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cartCount.textContent = cart.length;
}

function scrollToProducts() {
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

updateCartCount();
