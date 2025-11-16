// REAL product data using your GitHub filenames (assuming images are in an 'images/' subfolder)
const products = [
    {
        id: 1,
        name: "Arcane Threads Zip-Up",
        price: 2199,
        image: "images/Arcane Threads Zip-Up.jpg"  // Updated path; create 'images/' folder and place files there
    },
    {
        id: 2,
        name: "Reaper Wing Hoodie",
        price: 2199,
        image: "images/Reaper Wing Hoodie.jpg"
    },
    {
        id: 3,
        name: "Rogue Shred Hoodie",
        price: 2199,
        image: "images/Rogue Shred Hoodie.jpg"
    },
    {
        id: 4,
        name: "Echo Recall Hoodie",
        price: 2199,
        image: "images/Echo Recall Hoodie.jpg"
    }
];

const productGrid = document.getElementById("product-grid");
const cartCount = document.getElementById("cart-count");

// Check if productGrid exists (error handling)
if (!productGrid) {
    console.error("Error: Could not find element with ID 'product-grid'. Check your HTML.");
} else {
    // Render Products in Grid
    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/250x200?text=Image+Not+Found'">
            <h3>${product.name}</h3>
            <p class="price">Rs. ${product.price}.00</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>  <!-- Added button back -->
        `;

        productGrid.appendChild(card);
    });
}

// Cart System
function addToCart(id) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const product = products.find(p => p.id === id);
    if (product) {
        cart.push(product);  // Note: This adds duplicates; for quantities, modify to check and increment
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    } else {
        console.error("Product not found for ID:", id);
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cartCount.textContent = cart.length;
}

function scrollToProducts() {
    const productsSection = document.getElementById("products");
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
    } else {
        console.error("Error: Could not find element with ID 'products'.");
    }
}

// Initialize cart count on load
updateCartCount();
