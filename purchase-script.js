// Configuration state
let selectedStorage = null;
let selectedRefresh = null;
let selectedDisplay = null;
let selectedCharger = null;
let selectedLens = null;
let selectedAudio = null;
let selectedBattery = null;
let totalPrice = 0;

// Get all option cards
const storageCards = document.querySelectorAll('[data-storage]');
const refreshCards = document.querySelectorAll('[data-refresh]');
const displayCards = document.querySelectorAll('[data-display]');
const chargerCards = document.querySelectorAll('[data-charger]');
const lensCards = document.querySelectorAll('[data-lens]');
const audioCards = document.querySelectorAll('[data-audio]');
const batteryCards = document.querySelectorAll('[data-battery]');
const continueBtn = document.getElementById('continueBtn');

// Storage selection
storageCards.forEach(card => {
    card.addEventListener('click', function() {
        // Remove selected class from all storage cards
        storageCards.forEach(c => c.classList.remove('selected'));
        
        // Add selected class to clicked card
        this.classList.add('selected');
        
        // Update selected storage
        selectedStorage = {
            capacity: this.getAttribute('data-storage'),
            price: parseInt(this.getAttribute('data-price'))
        };
        
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
        selectedRefresh = {
            rate: this.getAttribute('data-refresh'),
            price: parseInt(this.getAttribute('data-price'))
        };
        
        // Update summary
        updateSummary();
    });
});

// Display selection
displayCards.forEach(card => {
    card.addEventListener('click', function() {
        // Remove selected class from all display cards
        displayCards.forEach(c => c.classList.remove('selected'));
        
        // Add selected class to clicked card
        this.classList.add('selected');
        
        // Update selected display
        selectedDisplay = {
            type: this.getAttribute('data-display'),
            price: parseInt(this.getAttribute('data-price'))
        };
        
        // Update summary
        updateSummary();
    });
});

// Charger selection
chargerCards.forEach(card => {
    card.addEventListener('click', function() {
        // Remove selected class from all charger cards
        chargerCards.forEach(c => c.classList.remove('selected'));
        
        // Add selected class to clicked card
        this.classList.add('selected');
        
        // Update selected charger
        selectedCharger = {
            option: this.getAttribute('data-charger'),
            price: parseInt(this.getAttribute('data-price'))
        };
        
        // Update summary
        updateSummary();
    });
});

// Lens selection
lensCards.forEach(card => {
    card.addEventListener('click', function() {
        // Remove selected class from all lens cards
        lensCards.forEach(c => c.classList.remove('selected'));
        
        // Add selected class to clicked card
        this.classList.add('selected');
        
        // Update selected lens
        selectedLens = {
            type: this.getAttribute('data-lens'),
            price: parseInt(this.getAttribute('data-price'))
        };
        
        // Update summary
        updateSummary();
    });
});

// Audio selection
audioCards.forEach(card => {
    card.addEventListener('click', function() {
        // Remove selected class from all audio cards
        audioCards.forEach(c => c.classList.remove('selected'));
        
        // Add selected class to clicked card
        this.classList.add('selected');
        
        // Update selected audio
        selectedAudio = {
            system: this.getAttribute('data-audio'),
            price: parseInt(this.getAttribute('data-price'))
        };
        
        // Update summary
        updateSummary();
    });
});

// Battery selection
batteryCards.forEach(card => {
    card.addEventListener('click', function() {
        // Remove selected class from all battery cards
        batteryCards.forEach(c => c.classList.remove('selected'));
        
        // Add selected class to clicked card
        this.classList.add('selected');
        
        // Update selected battery
        selectedBattery = {
            capacity: this.getAttribute('data-battery'),
            price: parseInt(this.getAttribute('data-price'))
        };
        
        // Update summary
        updateSummary();
    });
});

// Update summary section
function updateSummary() {
    const storageDisplay = document.getElementById('selected-storage');
    const refreshDisplay = document.getElementById('selected-refresh');
    const displayDisplay = document.getElementById('selected-display');
    const chargerDisplay = document.getElementById('selected-charger');
    const lensDisplay = document.getElementById('selected-lens');
    const audioDisplay = document.getElementById('selected-audio');
    const batteryDisplay = document.getElementById('selected-battery');
    const totalPriceDisplay = document.getElementById('total-price');
    
    // Price elements
    const priceStorage = document.getElementById('price-storage');
    const priceRefresh = document.getElementById('price-refresh');
    const priceDisplay = document.getElementById('price-display');
    const priceCharger = document.getElementById('price-charger');
    const priceLens = document.getElementById('price-lens');
    const priceAudio = document.getElementById('price-audio');
    const priceBattery = document.getElementById('price-battery');
    
    // Update storage display
    if (selectedStorage) {
        if (selectedStorage.capacity === '1024') {
            storageDisplay.textContent = '1TB';
        } else {
            storageDisplay.textContent = selectedStorage.capacity + 'GB';
        }
        priceStorage.textContent = '₹' + selectedStorage.price.toLocaleString('en-IN');
    } else {
        storageDisplay.textContent = 'Not selected';
        priceStorage.textContent = '₹0';
    }
    
    // Update refresh rate display
    if (selectedRefresh) {
        refreshDisplay.textContent = selectedRefresh.rate + 'Hz';
        priceRefresh.textContent = selectedRefresh.price > 0 ? '+₹' + selectedRefresh.price.toLocaleString('en-IN') : 'Included';
    } else {
        refreshDisplay.textContent = 'Not selected';
        priceRefresh.textContent = '₹0';
    }
    
    // Update display resolution
    if (selectedDisplay) {
        displayDisplay.textContent = selectedDisplay.type;
        priceDisplay.textContent = selectedDisplay.price > 0 ? '+₹' + selectedDisplay.price.toLocaleString('en-IN') : 'Included';
    } else {
        displayDisplay.textContent = 'Not selected';
        priceDisplay.textContent = '₹0';
    }
    
    // Update charger option
    if (selectedCharger) {
        chargerDisplay.textContent = selectedCharger.option === 'yes' ? 'With Charger' : 'No Charger';
        priceCharger.textContent = selectedCharger.price > 0 ? '+₹' + selectedCharger.price.toLocaleString('en-IN') : 'Included';
    } else {
        chargerDisplay.textContent = 'Not selected';
        priceCharger.textContent = '₹0';
    }
    
    // Update lens type
    if (selectedLens) {
        const lensNames = {
            'standard': 'Standard Lens',
            'prescription': 'Prescription Lens',
            'photochromic': 'Photochromic Lens'
        };
        lensDisplay.textContent = lensNames[selectedLens.type] || selectedLens.type;
        priceLens.textContent = selectedLens.price > 0 ? '+₹' + selectedLens.price.toLocaleString('en-IN') : 'Included';
    } else {
        lensDisplay.textContent = 'Not selected';
        priceLens.textContent = '₹0';
    }
    
    // Update audio system
    if (selectedAudio) {
        const audioNames = {
            'spatial': 'Spatial Audio',
            'premium': 'Premium Audio',
            'airpods': 'AirPods Pro Bundle'
        };
        audioDisplay.textContent = audioNames[selectedAudio.system] || selectedAudio.system;
        priceAudio.textContent = selectedAudio.price > 0 ? '+₹' + selectedAudio.price.toLocaleString('en-IN') : 'Included';
    } else {
        audioDisplay.textContent = 'Not selected';
        priceAudio.textContent = '₹0';
    }
    
    // Update battery capacity
    if (selectedBattery) {
        batteryDisplay.textContent = selectedBattery.capacity + 'Whr';
        priceBattery.textContent = selectedBattery.price > 0 ? '+₹' + selectedBattery.price.toLocaleString('en-IN') : 'Included';
    } else {
        batteryDisplay.textContent = 'Not selected';
        priceBattery.textContent = '₹0';
    }
    
    // Calculate total price
    totalPrice = 0;
    if (selectedStorage) totalPrice += selectedStorage.price;
    if (selectedRefresh) totalPrice += selectedRefresh.price;
    if (selectedDisplay) totalPrice += selectedDisplay.price;
    if (selectedCharger) totalPrice += selectedCharger.price;
    if (selectedLens) totalPrice += selectedLens.price;
    if (selectedAudio) totalPrice += selectedAudio.price;
    if (selectedBattery) totalPrice += selectedBattery.price;
    
    // Update total price display
    if (totalPrice > 0) {
        totalPriceDisplay.textContent = '₹' + totalPrice.toLocaleString('en-IN');
    } else {
        totalPriceDisplay.textContent = '₹0';
    }
    
    // Enable/disable continue button (all options must be selected)
    if (selectedStorage && selectedRefresh && selectedDisplay && selectedCharger && selectedLens && selectedAudio && selectedBattery) {
        continueBtn.disabled = false;
    } else {
        continueBtn.disabled = true;
    }
}

// Continue button click handler
continueBtn.addEventListener('click', function() {
    if (selectedStorage && selectedRefresh && selectedDisplay && selectedCharger && selectedLens && selectedAudio && selectedBattery) {
        // Create configuration object
        const lensNames = {
            'standard': 'Standard Lens',
            'prescription': 'Prescription Lens',
            'photochromic': 'Photochromic Lens'
        };
        const audioNames = {
            'spatial': 'Spatial Audio',
            'premium': 'Premium Audio',
            'airpods': 'AirPods Pro Bundle'
        };
        
        const configuration = {
            storage: selectedStorage.capacity === '1024' ? '1TB' : selectedStorage.capacity + 'GB',
            refreshRate: selectedRefresh.rate + 'Hz',
            display: selectedDisplay.type,
            charger: selectedCharger.option === 'yes' ? 'With Charger' : 'No Charger',
            lens: lensNames[selectedLens.type],
            audio: audioNames[selectedAudio.system],
            battery: selectedBattery.capacity + 'Whr',
            totalPrice: totalPrice
        };
        
        // Store in session storage
        sessionStorage.setItem('visionProConfig', JSON.stringify(configuration));
        
        // Alert user (you can replace this with actual checkout page navigation)
        alert(`Configuration saved!\n\nStorage: ${configuration.storage}\nRefresh Rate: ${configuration.refreshRate}\nDisplay: ${configuration.display}\nCharger: ${configuration.charger}\nLens: ${configuration.lens}\nAudio: ${configuration.audio}\nBattery: ${configuration.battery}\nTotal: ₹${configuration.totalPrice.toLocaleString('en-IN')}\n\nProceeding to checkout...`);
        
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
