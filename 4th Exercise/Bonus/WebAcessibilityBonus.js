// Coquette Shopping Cart - Beginner Friendly JavaScript

// Wait for the page to load completely
document.addEventListener('DOMContentLoaded', function() {
    
    // Create a cart array to store items
    let cart = [];
    
    // Get all the "Add to basket" buttons
    const addButtons = document.querySelectorAll('button');
    
    // Get the shopping cart icon
    const cartIcon = document.querySelector('.cart-icon');
    
    // Create a notification element (the little bubble that shows item count)
    let cartCount = document.createElement('span');
    cartCount.className = 'cart-count';
    cartCount.style.cssText = `
        background-color: #ff9eb5;
        color: white;
        border-radius: 50%;
        padding: 2px 6px;
        font-size: 12px;
        position: absolute;
        margin-left: -15px;
        margin-top: -10px;
        font-weight: bold;
    `;
    
    // Add the count bubble next to the cart icon
    if (cartIcon) {
        cartIcon.parentElement.style.position = 'relative';
        cartIcon.parentElement.appendChild(cartCount);
    }
    
    // Function to update the cart count display
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Make the bubble bounce when adding items
        if (totalItems > 0) {
            cartCount.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 200);
        }
        
        // Hide bubble if cart is empty
        if (totalItems === 0) {
            cartCount.textContent = '';
        }
    }
    
    // Function to show a cute notification message
    function showNotification(message, isSuccess = true) {
        // Create notification element
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${isSuccess ? '#ffb7c7' : '#ff9eb5'};
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            font-family: 'Segoe UI', sans-serif;
            font-size: 14px;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease;
            pointer-events: none;
        `;
        
        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Remove notification after 2 seconds
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }
    
    // Function to get image description from the card
    function getImageDescription(button) {
        const card = button.closest('.photo-card');
        const img = card.querySelector('img');
        const altText = img.getAttribute('alt');
        const description = card.querySelector('p').textContent;
        
        return {
            alt: altText,
            description: description.substring(0, 50) + '...'
        };
    }
    
    // Function to add item to cart
    function addToCart(button) {
        const card = button.closest('.photo-card');
        const img = card.querySelector('img');
        const imageInfo = getImageDescription(button);
        
        // Check if item already exists in cart
        const existingItem = cart.find(item => item.alt === imageInfo.alt);
        
        if (existingItem) {
            // If item exists, increase quantity
            existingItem.quantity++;
            showNotification(`✨ Added another ${imageInfo.alt.split(' ').slice(0, 3).join(' ')}!`, true);
        } else {
            // If item is new, add to cart
            cart.push({
                alt: imageInfo.alt,
                description: imageInfo.description,
                quantity: 1
            });
            showNotification(`💖 Added ${imageInfo.alt.split(' ').slice(0, 3).join(' ')} to your basket!`, true);
        }
        
        // Update the cart count display
        updateCartCount();
        
        // Add a little heart animation to the button
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
        
        // Log the cart to console (for debugging)
        console.log('Current Cart:', cart);
    }
    
    // Add click event to all "Add to basket" buttons
    addButtons.forEach(button => {
        // Make sure it's not the cart icon button
        if (button.textContent.includes('Add to basket')) {
            button.addEventListener('click', function() {
                addToCart(this);
            });
        }
    });
    
    // Make the cart icon show the cart contents when clicked
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (cart.length === 0) {
                showNotification('💕 Your basket is empty. Add some pretty photos!', false);
                return;
            }
            
            // Create a popup showing cart contents
            let cartMessage = '🛍️ Your Basket:\n\n';
            cart.forEach((item, index) => {
                cartMessage += `${index + 1}. ${item.alt.split(' ').slice(0, 3).join(' ')} - ${item.quantity} item${item.quantity > 1 ? 's' : ''}\n`;
            });
            cartMessage += `\n✨ Total items: ${cart.reduce((total, item) => total + item.quantity, 0)}`;
            cartMessage += '\n\n💖 Thank you for shopping!';
            
            alert(cartMessage);
        });
    }
    
    // Bonus: Add a fun message when the page loads
    setTimeout(() => {
        showNotification('🌸 Welcome to The Wondering Photographer!', true);
    }, 500);
    
    // Bonus: Create a checkout button message
    console.log('💕 Coquette Shopping Cart is ready! Click "Add to basket" to start shopping!');
});