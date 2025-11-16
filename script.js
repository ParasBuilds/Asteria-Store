// REAL product data using correct GitHub filenames (NO folders)
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

// Check if productGrid exists
if (!productGrid) {
    console.error("Error: Could not find element with ID 'product-grid'. Check your HTML.");
} else {
    // Render Products in Grid (with Lazy Loading)
    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img data-src="${product.image}" alt="${product.name}" class="lazy" 
            onerror="this.src='https://via.placeholder.com/250x200?text=Image+Not+Found'">

            <h3>${product.name}</h3>
            <p class="price">Rs. ${product.price}.00</p>
            <button onclick="addToCart(${product.id}, event)">Add to Cart</button>
        `;

        productGrid.appendChild(card);
    });

    // Lazy Load Images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Cart System
let debounceTimer;
function addToCart(id, event) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        const button = event.target;
        button.classList.add('loading');
        button.disabled = true;

        setTimeout(() => {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            const product = products.find(p => p.id === id);

            if (product) {
                cart.push(product);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartCount();
            } else {
                console.error("Product not found for ID:", id);
            }

            button.classList.remove('loading');
            button.disabled = false;

        }, 200);
    }, 300);
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

// Initialize cart count
updateCartCount();
