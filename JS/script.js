// Form Success Message
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent actual form submission

    // Show success message
    document.getElementById('successMessage').classList.remove('hidden');
    document.getElementById('contactForm').reset(); // Optional: Clear the form fields
});

// Product Detail Page - Storing Product Data
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function () {
        const productName = card.dataset.name;
        const productPrice = card.dataset.price;
        const productImages = JSON.parse(card.dataset.images);
        const productDescription = card.dataset.description;
        const productDetail = card.dataset.detail;

        // Store product data in local storage
        localStorage.setItem('productName', productName);
        localStorage.setItem('productDetail', productDetail);
        localStorage.setItem('productPrice', productPrice);
        localStorage.setItem('productImages', JSON.stringify(productImages));
        localStorage.setItem('productDescription', productDescription);

        // Redirect to the product detail page
        window.location.href = 'product-detail.html';
    });
});

// Product Detail Page - Displaying Product Data
document.addEventListener('DOMContentLoaded', function() {
    const productName = localStorage.getItem('productName');
    const productDetail = localStorage.getItem('productDetail');
    const productPrice = localStorage.getItem('productPrice');
    const productImages = JSON.parse(localStorage.getItem('productImages'));
    const productDescription = localStorage.getItem('productDescription');

    if (productName) {
        document.getElementById('productName').textContent = productName;
        document.getElementById('productDetail').textContent = productDetail;
        document.getElementById('productPrice').textContent = productPrice;
        document.getElementById('productDescription').textContent = productDescription;

        // Populate carousel with images
        const carousel = document.getElementById('carousel');
        productImages.forEach(image => {
            const img = document.createElement('img');
            img.src = image;
            img.alt = 'Product Image';
            img.classList.add('w-full', 'h-96', 'object-contain', 'rounded-md');
            carousel.appendChild(img);
        });
        
        // Carousel navigation
        const prevButton = document.getElementById('prevButton');
        const nextButton = document.getElementById('nextButton');
        let currentIndex = 0;

        function updateCarousel() {
            const slideWidth = carousel.children[0].offsetWidth;
            carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }

        prevButton.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        nextButton.addEventListener('click', function() {
            if (currentIndex < carousel.children.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });

        updateCarousel();
    }

    // Update cart notification count
    function updateCartNotification() {
        const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
        document.getElementById('cartCount').textContent = cart.length;
    }

    updateCartNotification();
});

// Cart Page - Displaying Cart Items
document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center text-gray-600">Your cart is empty.</p>';
    } else {
        let total = 0;
        cartItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md', 'flex', 'justify-between', 'items-center');
            itemDiv.innerHTML = `
                <div>
                    <h3 class="text-xl font-semibold">${item.name}</h3>
                    <p class="text-gray-600">$${item.price}</p>
                </div>
                <button class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-500" onclick="removeItem(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(itemDiv);
            total += parseFloat(item.price);
        });
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    window.removeItem = function(index) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        location.reload(); // Reload the page to update the cart
    };
});
