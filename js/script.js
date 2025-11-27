// Sample product data
const products = [
    {
        id: 1,
        name: "Stylish T-Shirt",
        price: 25.00,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "A comfortable and stylish t-shirt perfect for everyday wear."
    },
    {
        id: 2,
        name: "Elegant Handbag",
        price: 50.00,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "A sophisticated handbag that complements any outfit."
    },
    {
        id: 3,
        name: "Comfortable Shoes",
        price: 40.00,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Lightweight and comfortable shoes for all-day wear."
    },
    {
        id: 4,
        name: "Classic Watch",
        price: 30.00,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "A timeless watch that adds elegance to your wrist."
    },
    {
        id: 5,
        name: "Gold Earrings",
        price: 15.00,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Beautiful gold earrings that shine with every move."
    },
    {
        id: 6,
        name: "Casual T-Shirt",
        price: 20.00,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "A casual t-shirt for relaxed and comfortable days."
    },
    {
        id: 7,
        name: "Silver Necklace",
        price: 25.00,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "A delicate silver necklace for a touch of elegance."
    },
    {
        id: 8,
        name: "Leather Bracelet",
        price: 20.00,
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "A stylish leather bracelet that suits any style."
    },
    {
        id: 9,
        name: "Stylish Sunglasses",
        price: 35.00,
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Trendy sunglasses to protect and enhance your look."
    }
];

// Cart functions
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId, size) {
    const cart = getCart();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId && item.size === size);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: size,
            quantity: 1
        });
    }
    saveCart(cart);
    alert('Item added to cart!');
}

function updateQuantity(productId, size, newQuantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId && item.size === size);
    if (item) {
        item.quantity = newQuantity;
        if (item.quantity <= 0) {
            removeFromCart(productId, size);
        } else {
            saveCart(cart);
        }
    }
}

function removeFromCart(productId, size) {
    let cart = getCart();
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    saveCart(cart);
}

function getTotalPrice() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Display cart items
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;

    const cart = getCart();
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('total-price').textContent = '0.00';
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Size: ${item.size}</p>
                <p>$${item.price.toFixed(2)} each</p>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, '${item.size}', ${item.quantity - 1})">-</button>
                    <span>Quantity: ${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, '${item.size}', ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id}, '${item.size}')">Remove</button>
        `;
        cartItems.appendChild(itemElement);
    });

    document.getElementById('total-price').textContent = getTotalPrice().toFixed(2);
}

// Load product details
function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (product) {
        document.getElementById('product-img').src = product.image;
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('product-description').textContent = product.description;

        // Add to cart button
        document.getElementById('add-to-cart').addEventListener('click', () => {
            const size = document.getElementById('size').value;
            addToCart(productId, size);
        });

        // Buy now button
        document.getElementById('buy-now').addEventListener('click', () => {
            const size = document.getElementById('size').value;
            addToCart(productId, size);
            window.location.href = 'success.html';
        });
    }
}

// Navbar toggle for mobile
function toggleNavbar() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Form handling
function handleLogin(event) {
    event.preventDefault();
    alert('Login functionality not implemented (static site).');
}

function handleSignup(event) {
    event.preventDefault();
    alert('Signup functionality not implemented (static site).');
}

function handleContact(event) {
    event.preventDefault();
    alert('Message sent! (This is a static site, no backend.)');
}

// Checkout function
function checkout() {
    window.location.href = 'success.html';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Navbar toggle
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleNavbar);
    }

    // Load product details if on product page
    if (document.getElementById('product-detail')) {
        loadProductDetails();
    }

    // Display cart if on cart page
    if (document.getElementById('cart-items')) {
        displayCart();
    }

    // Form handlers
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContact);
    }
});
