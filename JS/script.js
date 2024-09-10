// Success Message
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent actual form submission

    // Show success message
    document.getElementById('successMessage').classList.remove('hidden');
    document.getElementById('contactForm').reset(); // Optional: Clear the form fields
});


// product detail page

 // Add event listeners to product cards
//  document.querySelectorAll('.product-card').forEach(card => {
//     card.addEventListener('click', function () {
//         const productName = card.dataset.name;
//         const productPrice = card.dataset.price;
//         const productImage = card.dataset.image;
//         const productDescription = card.dataset.description;

//         // Store product data in local storage
//         localStorage.setItem('productName', productName);
//         localStorage.setItem('productPrice', productPrice);
//         localStorage.setItem('productImage', productImage);
//         localStorage.setItem('productDescription', productDescription);
//     });
// });


// document.addEventListener('DOMContentLoaded', () => {
//     const productName = localStorage.getItem('productName');
//     const productPrice = localStorage.getItem('productPrice');
//     const productImage = localStorage.getItem('productImage');
//     const productDescription = localStorage.getItem('productDescription');

//     document.getElementById('productName').textContent = productName;
//     document.getElementById('productPrice').textContent = productPrice;
//     document.getElementById('productImage').src = productImage;
//     document.getElementById('productDescription').textContent = productDescription;
// });


 // Add event listeners to product cards
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
    });
});

 // cart
 document.addEventListener('DOMContentLoaded', function() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartCount.textContent = cartItems.length;
});


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
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        location.reload(); // Reload the page to update the cart
    };
});