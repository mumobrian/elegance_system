// men.js - Men's Collection Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize filter functionality
    initFilters();
    
    // Initialize product interactions
    initProductInteractions();
    
    // Initialize sort functionality
    initSorting();
});

// Filter Functionality
function initFilters() {
    const filterToggle = document.querySelector('.filter-toggle');
    const filterDropdown = document.querySelector('.filter-dropdown');
    
    // Toggle filter dropdown on mobile
    if (filterToggle && filterDropdown) {
        filterToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                filterDropdown.style.display = filterDropdown.style.display === 'block' ? 'none' : 'block';
            }
        });
    }
    
    // Handle size selection
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            filterProducts();
        });
    });
    
    // Handle price range filtering
    const priceSlider = document.querySelector('.slider');
    if (priceSlider) {
        priceSlider.addEventListener('input', function() {
            document.querySelector('.price-values span:first-child').textContent = `$${this.value}`;
            filterProducts();
        });
    }
    
    // Apply filters button
    const applyFiltersBtn = document.querySelector('.apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            filterProducts();
            if (window.innerWidth <= 768) {
                filterDropdown.style.display = 'none';
            }
        });
    }
}

// Product Filtering Logic
function filterProducts() {
    const selectedSize = document.querySelector('.size-option.active').textContent;
    const maxPrice = document.querySelector('.slider').value;
    
    // In a real implementation, this would filter actual products
    // For now, we'll just log the filter values
    console.log(`Filtering products - Size: ${selectedSize}, Max Price: $${maxPrice}`);
    
    // Show loading state
    showLoading();
    
    // Simulate API call delay
    setTimeout(() => {
        // Hide loading state
        hideLoading();
        
        // In a real app, you would update the product grid here
        // with filtered results from your backend
    }, 800);
}

// Product Interactions
function initProductInteractions() {
    // Quick view functionality
    document.querySelectorAll('.quick-view').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // In a real implementation, this would open a modal with product details
            alert(`Quick view for: ${productName}\nThis would open a modal with product details.`);
        });
    });
    
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            
            // Get selected size (from filters or product options)
            let selectedSize = 'M'; // Default
            const activeSize = document.querySelector('.size-option.active');
            if (activeSize) {
                selectedSize = activeSize.textContent;
            }
            
            // Create product object
            const product = {
                id: productId,
                name: productName,
                price: parseFloat(productPrice.replace('$', '')),
                size: selectedSize,
                quantity: 1,
                image: productCard.querySelector('img').src
            };
            
            // Add to cart
            addToCart(product);
            
            // Show notification
            showNotification(`${productName} (Size: ${selectedSize}) added to cart!`);
        });
    });
}

// Shopping Cart Functions
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => 
        item.id === product.id && item.size === product.size
    );
    
    if (existingItemIndex >= 0) {
        // Update quantity if already in cart
        cart[existingItemIndex].quantity += 1;
    } else {
        // Add new item to cart
        cart.push(product);
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update cart count in header
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Sorting Functionality
function initSorting() {
    const sortSelect = document.getElementById('sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            
            // Show loading state
            showLoading();
            
            // Simulate API call delay
            setTimeout(() => {
                // Hide loading state
                hideLoading();
                
                // In a real app, you would sort the products here
                console.log(`Sorting products by: ${sortValue}`);
                
                // Possible sort implementations:
                switch(sortValue) {
                    case 'newest':
                        // Sort by newest first
                        break;
                    case 'price-low':
                        // Sort by price low to high
                        break;
                    case 'price-high':
                        // Sort by price high to low
                        break;
                    case 'rating':
                        // Sort by rating
                        break;
                    default:
                        // Default/featured sorting
                }
            }, 800);
        });
    }
}

// UI Helpers
function showLoading() {
    // In a real implementation, show a loading spinner
    console.log('Loading products...');
}

function hideLoading() {
    // In a real implementation, hide the loading spinner
    console.log('Products loaded');
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize cart count on page load
updateCartCount();