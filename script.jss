// Sample game setups data
const gameSetups = [
    {
        id: 1,
        name: "Pro Gamer Ultimate",
        price: "$3,499",
        category: "pro",
        tags: ["RTX 4090", "i9-13900K", "32GB RAM", "4K Ready"],
        description: "Maximum performance for competitive gaming"
    },
    {
        id: 2,
        name: "Streamer Edition",
        price: "$2,799",
        category: "streaming",
        tags: ["RTX 4070 Ti", "i7-13700", "64GB RAM", "Dual PC Setup"],
        description: "Perfect for streaming with high quality encoding"
    },
    {
        id: 3,
        name: "Budget Beast",
        price: "$1,199",
        category: "budget",
        tags: ["RTX 4060", "Ryzen 5 7600", "16GB RAM", "1080p Gaming"],
        description: "Excellent performance without breaking the bank"
    },
    {
        id: 4,
        name: "VR Master",
        price: "$3,999",
        category: "vr",
        tags: ["RTX 4090", "i9-13900KS", "64GB RAM", "VR Ready"],
        description: "The ultimate virtual reality experience"
    },
    {
        id: 5,
        name: "RGB Dream",
        price: "$2,499",
        category: "pro",
        tags: ["RTX 4080", "Ryzen 7 7800X3D", "32GB RGB RAM", "Custom Loop"],
        description: "Aesthetic meets performance with full RGB"
    },
    {
        id: 6,
        name: "Compact Powerhouse",
        price: "$1,899",
        category: "streaming",
        tags: ["RTX 4070", "i5-13600K", "32GB RAM", "Mini-ITX"],
        description: "Small form factor with big performance"
    }
];

// DOM Elements
const setupGrid = document.querySelector('.setup-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const uploadBtn = document.getElementById('uploadBtn');
const uploadModal = document.getElementById('uploadModal');
const closeModal = document.querySelector('.close-modal');
const uploadForm = document.getElementById('uploadForm');

// Initialize the setups grid
function renderSetups(filter = 'all') {
    setupGrid.innerHTML = '';
    
    const filteredSetups = filter === 'all' 
        ? gameSetups 
        : gameSetups.filter(setup => setup.category === filter);
    
    filteredSetups.forEach(setup => {
        const setupCard = document.createElement('div');
        setupCard.className = 'setup-card';
        setupCard.innerHTML = `
            <div class="setup-img">
                <i class="fas fa-gamepad"></i>
            </div>
            <div class="setup-content">
                <h3>${setup.name}</h3>
                <p>${setup.description}</p>
                <div class="setup-price">${setup.price}</div>
                <div class="setup-tags">
                    ${setup.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <button class="btn-primary" onclick="viewSetup(${setup.id})">View Details</button>
                <button class="btn-secondary" onclick="addToCart(${setup.id})">Add to Cart</button>
            </div>
        `;
        setupGrid.appendChild(setupCard);
    });
}

// Filter setups by category
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        // Filter setups
        renderSetups(button.dataset.filter);
    });
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Modal functionality
uploadBtn.addEventListener('click', () => {
    uploadModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    uploadModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === uploadModal) {
        uploadModal.style.display = 'none';
    }
});

// Handle video upload form
uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('videoTitle').value;
    const url = document.getElementById('videoUrl').value;
    const file = document.getElementById('videoFile').files[0];
    const category = document.getElementById('gameCategory').value;
    
    // Here you would normally send this to a backend
    // For now, just show an alert
    alert(`Video "${title}" would be uploaded to category: ${category}`);
    
    // Reset form and close modal
    uploadForm.reset();
    uploadModal.style.display = 'none';
});

// Cart functionality (simplified)
let cart = [];

function addToCart(setupId) {
    const setup = gameSetups.find(s => s.id === setupId);
    if (setup) {
        cart.push(setup);
        alert(`${setup.name} added to cart!\nTotal items in cart: ${cart.length}`);
        updateCartCount();
    }
}

function updateCartCount() {
    // Update cart count display (you'd need to add this element)
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function viewSetup(setupId) {
    const setup = gameSetups.find(s => s.id === setupId);
    if (setup) {
        alert(`Viewing details for: ${setup.name}\nPrice: ${setup.price}\nDescription: ${setup.description}`);
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderSetups();
    
    // Add cart count element to navbar
    const cartBtn = document.querySelector('.btn-cart');
    if (cartBtn) {
        const cartCount = document.createElement('span');
        cartCount.className = 'cart-count';
        cartCount.textContent = '0';
        cartBtn.appendChild(cartCount);
    }
});