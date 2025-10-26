// Configuration state
let selectedStorage = null;
let selectedRefresh = null;
let basePrice = 0;

// Get all option cards
const storageCards = document.querySelectorAll('[data-storage]');
const refreshCards = document.querySelectorAll('[data-refresh]');
const continueBtn = document.getElementById('continueBtn');

// Storage selection
storageCards.forEach(card => {
    card.addEventListener('click', function() {
        // Remove selected class from all storage cards
        storageCards.forEach(c => c.classList.remove('selected'));
        
        // Add selected class to clicked card
        this.classList.add('selected');
        
        // Update selected storage
        selectedStorage = this.getAttribute('data-storage');
        basePrice = parseInt(this.getAttribute('data-price'));
        
        // Update summary
        updateSummary();
    });
});

// Refresh rate selection
refreshCards.forEach(card => {
    card.addEventListener('click', function() {
        // Remove selected class from all refresh cards
        refreshCards.forEach(c => c.classList.remove('selected'));
        
        // Add selected class to clicked card
        this.classList.add('selected');
        
        // Update selected refresh rate
        selectedRefresh = this.getAttribute('data-refresh');
        
        // Update summary
        updateSummary();
    });
});

// Update summary section
function updateSummary() {
    const storageDisplay = document.getElementById('selected-storage');
    const refreshDisplay = document.getElementById('selected-refresh');
    const totalPrice = document.getElementById('total-price');
    
    // Update storage display
    if (selectedStorage) {
        if (selectedStorage === '1024') {
            storageDisplay.textContent = '1TB';
        } else {
            storageDisplay.textContent = selectedStorage + 'GB';
        }
    } else {
        storageDisplay.textContent = 'Not selected';
    }
    
    // Update refresh rate display
    if (selectedRefresh) {
        refreshDisplay.textContent = selectedRefresh + 'Hz';
    } else {
        refreshDisplay.textContent = 'Not selected';
    }
    
    // Update total price
    if (selectedStorage) {
        totalPrice.textContent = '$' + basePrice.toLocaleString();
    } else {
        totalPrice.textContent = '$0';
    }
    
    // Enable/disable continue button
    if (selectedStorage && selectedRefresh) {
        continueBtn.disabled = false;
    } else {
        continueBtn.disabled = true;
    }
}

// Continue button click handler
continueBtn.addEventListener('click', function() {
    if (selectedStorage && selectedRefresh) {
        // Create configuration object
        const configuration = {
            storage: selectedStorage === '1024' ? '1TB' : selectedStorage + 'GB',
            refreshRate: selectedRefresh + 'Hz',
            price: basePrice
        };
        
        // Store in session storage
        sessionStorage.setItem('visionProConfig', JSON.stringify(configuration));
        
        // Alert user (you can replace this with actual checkout page navigation)
        alert(`Configuration saved!\n\nStorage: ${configuration.storage}\nRefresh Rate: ${configuration.refreshRate}\nTotal: $${configuration.price.toLocaleString()}\n\nProceeding to checkout...`);
        
        // You can redirect to checkout page here
        // window.location.href = 'checkout.html';
    }
});

// Add smooth scroll animation for page load
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
