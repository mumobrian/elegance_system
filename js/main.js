// Mobile Menu Toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.main-nav').classList.toggle('active');
    this.querySelector('i').classList.toggle('fa-times');
    this.querySelector('i').classList.toggle('fa-bars');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            document.querySelector('.main-nav').classList.remove('active');
            document.querySelector('.mobile-menu-btn i').classList.remove('fa-times');
            document.querySelector('.mobile-menu-btn i').classList.add('fa-bars');
        }
    });
});
// Search functionality
const searchTrigger = document.getElementById('searchTrigger');
const searchBox = document.getElementById('searchBox');
const searchInput = document.getElementById('globalSearchInput');
const searchResults = document.getElementById('searchResults');
const searchForm = document.getElementById('globalSearchForm');

// Toggle search box
searchTrigger.addEventListener('click', function(e) {
  e.preventDefault();
  searchBox.classList.toggle('active');
  if (searchBox.classList.contains('active')) {
    searchInput.focus();
  }
});

// Close search when clicking outside
document.addEventListener('click', function(e) {
  if (!searchBox.contains(e.target) && e.target !== searchTrigger) {
    searchBox.classList.remove('active');
  }
});

// Perform search
searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
  performSearch(searchInput.value.trim());
});

// Search as you type
let searchTimeout;
searchInput.addEventListener('input', function() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    performSearch(this.value.trim());
  }, 300);
});

function performSearch(query) {
  if (query.length < 2) {
    searchResults.innerHTML = '<div class="no-results">Enter 2+ characters to search</div>';
    return;
  }
  
  // In a real app, this would be an AJAX call to your backend
  const results = allProducts.filter(product => {
    return product.name.toLowerCase().includes(query.toLowerCase()) || 
           product.category.toLowerCase().includes(query.toLowerCase());
  });
  
  displayResults(results);
}

function displayResults(results) {
  if (results.length === 0) {
    searchResults.innerHTML = '<div class="no-results">No products found</div>';
    return;
  }
  
  let html = '';
  results.forEach(product => {
    html += `
      <div class="search-result-item">
        <img src="${product.image}" alt="${product.name}">
        <div class="search-result-info">
          <h4><a href="${product.url}">${product.name}</a></h4>
          <div class="price">$${product.price.toFixed(2)}</div>
        </div>
      </div>
    `;
  });
  
  searchResults.innerHTML = html;
}

// Sample product data (replace with your actual products)
const allProducts = [
  {
    id: 1,
    name: "Classic Denim Jacket",
    price: 89.99,
    category: "Women",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    url: "product.html?id=1"
  },
  // Add all your other products here...
];
// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        const product = {
            id: productId,
            name: this.closest('.product-card').querySelector('h3 a').textContent,
            price: parseFloat(this.closest('.product-card').querySelector('.current-price').textContent.replace('$', '')),
            image: this.closest('.product-card').querySelector('img').src,
            quantity: 1
        };
        
        // Check if product already in cart
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(product);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Show notification
        showNotification(`${product.name} added to cart!`);
    });
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize cart count
updateCartCount();

// Product page quantity selector
if (document.querySelector('.quantity-selector')) {
    const quantityInput = document.querySelector('.quantity-selector input');
    document.querySelector('.quantity-btn.minus').addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });
    
    document.querySelector('.quantity-btn.plus').addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        if (value < 10) {
            quantityInput.value = value + 1;
        }
    });
}

// Product tabs
if (document.querySelector('.product-tabs')) {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}