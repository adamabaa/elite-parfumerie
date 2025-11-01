// Données des produits
const products = [
    {
        id: 1,
        name: "Noir Élégant",
        description: "Un parfum masculin audacieux aux notes boisées et épicées. Parfait pour les occasions spéciales.",
        price: 58900, // 89.90€ → 58,900 CFA
        category: "homme",
        image: "https://images.unsplash.com/photo-1594032190407-06931e0586ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        featured: true,
        inStock: true
    },
    {
        id: 2,
        name: "Fleur de Soir",
        description: "Une fragrance féminine délicate aux notes florales et fruitées. Élégance et fraîcheur.",
        price: 62600, // 95.50€ → 62,600 CFA
        category: "femme",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        featured: true,
        inStock: true
    },
    {
        id: 3,
        name: "Lumière d'Or",
        description: "Un parfum mixte aux notes d'agrumes et de vanille. Lumineux et enveloppant.",
        price: 51200, // 78.00€ → 51,200 CFA
        category: "mixte",
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        featured: true,
        inStock: true
    },
    {
        id: 4,
        name: "Mystère Royal",
        description: "Un parfum masculin sophistiqué aux notes de cuir et de tabac. Mystérieux et intense.",
        price: 78700, // 120.00€ → 78,700 CFA
        category: "homme",
        image: "https://images.unsplash.com/photo-1615634376655-8613c82c0133?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        featured: true,
        inStock: true
    },
    {
        id: 5,
        name: "Rose Éternelle",
        description: "Une fragrance féminine romantique aux notes de rose et de musc. Timeless et élégant.",
        price: 68900, // 105.00€ → 68,900 CFA
        category: "femme",
        image: "https://images.unsplash.com/photo-1590737319720-4ccb7ee0d0b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        featured: false,
        inStock: true
    },
    {
        id: 6,
        name: "Zen Oasis",
        description: "Un parfum mixte apaisant aux notes de thé vert et de santal. Calme et sérénité.",
        price: 54100, // 82.50€ → 54,100 CFA
        category: "mixte",
        image: "https://images.unsplash.com/photo-1613029226237-0c4c82a2cc6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        featured: false,
        inStock: true
    },
    {
        id: 7,
        name: "Aventure Sauvage",
        description: "Un parfum masculin énergique aux notes d'épices et de bois. Audacieux et libre.",
        price: 60300, // 92.00€ → 60,300 CFA
        category: "homme",
        image: "https://images.unsplash.com/photo-1590736969955-1d0c72cf30fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        featured: false,
        inStock: true
    },
    {
        id: 8,
        name: "Jardin Secret",
        description: "Une fragrance féminine envoûtante aux notes de jasmin et de vanille. Sensuel et mystérieux.",
        price: 75400, // 115.00€ → 75,400 CFA
        category: "femme",
        image: "https://images.unsplash.com/photo-1613029226653-8b882a1d08e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        featured: false,
        inStock: true
    }
];

// Gestion du panier
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Formatage des prix en CFA
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
        minimumFractionDigits: 0
    }).format(price);
}

// Gestion du chargement des images
function handleImageLoad(img) {
    img.style.opacity = '1';
    img.parentElement.classList.remove('loading');
}

function handleImageError(img) {
    img.parentElement.classList.add('error');
    img.parentElement.innerHTML = `
        <div class="image-error">
            <i class="fas fa-image"></i>
            <span>Image non disponible</span>
        </div>
    `;
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    updateCartCount();
    
    // Page spécifique
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'index.html':
        case '':
            initHomePage();
            break;
        case 'boutique.html':
            initBoutiquePage();
            break;
        case 'panier.html':
            initPanierPage();
            break;
        case 'commande.html':
            initCommandePage();
            break;
        case 'contact.html':
            initContactPage();
            break;
    }
}

// Page d'accueil
function initHomePage() {
    displayBestSellers();
}

function displayBestSellers() {
    const container = document.getElementById('best-sellers-container');
    if (!container) return;
    
    const bestSellers = products.filter(product => product.featured);
    
    container.innerHTML = bestSellers.map(product => `
        <div class="col-md-6 col-lg-3 mb-4 fade-in">
            <div class="card product-card h-100">
                <div class="product-img loading">
                    <img 
                        src="${product.image}" 
                        alt="${product.name}" 
                        loading="lazy"
                        onload="handleImageLoad(this)"
                        onerror="handleImageError(this)"
                    >
                    <div class="image-placeholder">
                        <i class="fas fa-perfume-bottle"></i>
                    </div>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="product-title">${product.name}</h5>
                    <p class="product-description">${product.description}</p>
                    <div class="product-info">
                        <div class="product-price mt-auto">${formatPrice(product.price)}</div>
                        ${!product.inStock ? '<span class="stock-badge out-of-stock">Rupture</span>' : ''}
                    </div>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                        ${product.inStock ? 'Ajouter au panier' : 'Rupture de stock'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Événements pour les boutons "Ajouter au panier"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Page boutique
function initBoutiquePage() {
    displayAllProducts();
    setupFilters();
    setupSorting();
}

function displayAllProducts(productsToDisplay = products) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    if (productsToDisplay.length === 0) {
        container.innerHTML = `
            <div class="col-12 no-products">
                <i class="fas fa-search"></i>
                <h4>Aucun produit trouvé</h4>
                <p>Aucun produit ne correspond à vos critères de recherche.</p>
                <button class="btn btn-outline-primary" onclick="resetFilters()">Réinitialiser les filtres</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = productsToDisplay.map(product => `
        <div class="col-md-6 col-lg-4 mb-4 fade-in">
            <div class="card product-card h-100">
                <div class="product-img loading">
                    <img 
                        src="${product.image}" 
                        alt="${product.name}" 
                        loading="lazy"
                        onload="handleImageLoad(this)"
                        onerror="handleImageError(this)"
                    >
                    <div class="image-placeholder">
                        <i class="fas fa-perfume-bottle"></i>
                    </div>
                    ${product.featured ? '<span class="featured-badge">Populaire</span>' : ''}
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="product-title">${product.name}</h5>
                    <p class="product-description">${product.description}</p>
                    <div class="product-info">
                        <div class="product-price mt-auto">${formatPrice(product.price)}</div>
                        ${!product.inStock ? '<span class="stock-badge out-of-stock">Rupture</span>' : ''}
                    </div>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                        ${product.inStock ? 'Ajouter au panier' : 'Rupture de stock'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Mettre à jour le compteur de produits
    const countElement = document.getElementById('products-count');
    if (countElement) {
        countElement.textContent = `${productsToDisplay.length} produit${productsToDisplay.length > 1 ? 's' : ''}`;
    }
    
    // Événements pour les boutons "Ajouter au panier"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

function resetFilters() {
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    filterCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    filterProducts();
}

function setupFilters() {
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    const resetButton = document.getElementById('reset-filters');
    
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });
    
    if (resetButton) {
        resetButton.addEventListener('click', resetFilters);
    }
}

function filterProducts() {
    const selectedGenders = Array.from(document.querySelectorAll('input[value="homme"], input[value="femme"], input[value="mixte"]:checked'))
        .map(checkbox => checkbox.value);
    
    const selectedPrices = Array.from(document.querySelectorAll('input[value^="0-"], input[value^="25000-"], input[value^="50000+"]:checked'))
        .map(checkbox => checkbox.value);
    
    let filteredProducts = products;
    
    // Filtrer par genre
    if (selectedGenders.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            selectedGenders.includes(product.category)
        );
    }
    
    // Filtrer par prix (adapté aux prix CFA)
    if (selectedPrices.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            return selectedPrices.some(priceRange => {
                if (priceRange === '0-25000') return product.price < 25000;
                if (priceRange === '25000-50000') return product.price >= 25000 && product.price <= 50000;
                if (priceRange === '50000+') return product.price > 50000;
                return true;
            });
        });
    }
    
    displayAllProducts(filteredProducts);
}

function setupSorting() {
    const sortSelect = document.getElementById('sort-products');
    if (!sortSelect) return;
    
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        let sortedProducts = [...products];
        
        switch(sortValue) {
            case 'name':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'price-asc':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'featured':
                sortedProducts.sort((a, b) => b.featured - a.featured);
                break;
        }
        
        displayAllProducts(sortedProducts);
    });
}

// Page panier
function initPanierPage() {
    displayCartItems();
    setupCartEvents();
}

function displayCartItems() {
    const container = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const taxElement = document.getElementById('tax');
    const shippingElement = document.getElementById('shipping');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart fa-3x mb-3"></i>
                <h4>Votre panier est vide</h4>
                <p>Découvrez nos parfums et ajoutez-les à votre panier.</p>
                <a href="boutique.html" class="btn btn-primary">Découvrir la boutique</a>
            </div>
        `;
        
        if (subtotalElement) subtotalElement.textContent = formatPrice(0);
        if (totalElement) totalElement.textContent = formatPrice(0);
        if (taxElement) taxElement.textContent = formatPrice(0);
        if (shippingElement) shippingElement.textContent = formatPrice(0);
        if (checkoutBtn) checkoutBtn.classList.add('disabled');
        
        return;
    }
    
    container.innerHTML = '';
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;
        
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-img">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjBGMEYwIi8+CjxwYXRoIGQ9Ik00MCA0MEM0Mi4yMDkxIDQwIDQ0IDM4LjIwOTEgNDQgMzZDNDQgMzMuNzkwOSA0Mi4yMDkxIDMyIDQwIDMyQzM3Ljc5MDkgMzIgMzYgMzMuNzkwOSAzNiAzNkMzNiAzOC4yMDkxIDM3Ljc5MDkgNDAgNDAgNDBaIiBmaWxsPSIjQ0VDRUNFIi8+CjxwYXRoIGQ9Ik00OCA1MkgyOEMyNi44OTU0IDUyIDI2IDUxLjEwNDYgMjYgNTBWMzRDMjYgMzIuODk1NCAyNi44OTU0IDMyIDI4IDMySDUyQzUzLjEwNDYgMzIgNTQgMzIuODk1NCA1NCAzNFY1MEM1NCA1MS4xMDQ2IDUzLjEwNDYgNTIgNTIgNTJaIiBmaWxsPSIjQ0VDRUNFIi8+Cjwvc3ZnPgo='">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${product.name}</div>
                <div class="cart-item-price">${formatPrice(product.price)}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease" data-id="${product.id}">-</button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${product.id}">
                <button class="quantity-btn increase" data-id="${product.id}">+</button>
            </div>
            <div class="cart-item-total">${formatPrice(itemTotal)}</div>
            <button class="remove-btn" data-id="${product.id}" title="Supprimer">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        container.appendChild(cartItem);
    });
    
    const shipping = subtotal > 50000 ? 0 : 3000; // Livraison gratuite au-dessus de 50,000 CFA
    const tax = subtotal * 0.18; // 18% TVA
    const total = subtotal + tax + shipping;
    
    if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
    if (totalElement) totalElement.textContent = formatPrice(total);
    if (taxElement) taxElement.textContent = formatPrice(tax);
    if (shippingElement) {
        shippingElement.textContent = formatPrice(shipping);
        if (shipping === 0) {
            shippingElement.innerHTML += ' <span class="text-success"><i class="fas fa-check"></i> Livraison gratuite</span>';
        }
    }
    if (checkoutBtn) checkoutBtn.classList.remove('disabled');
}

function setupCartEvents() {
    document.addEventListener('click', function(e) {
        // Diminuer la quantité
        if (e.target.classList.contains('decrease') || e.target.parentElement.classList.contains('decrease')) {
            const button = e.target.classList.contains('decrease') ? e.target : e.target.parentElement;
            const productId = parseInt(button.getAttribute('data-id'));
            updateQuantity(productId, -1);
        }
        
        // Augmenter la quantité
        if (e.target.classList.contains('increase') || e.target.parentElement.classList.contains('increase')) {
            const button = e.target.classList.contains('increase') ? e.target : e.target.parentElement;
            const productId = parseInt(button.getAttribute('data-id'));
            updateQuantity(productId, 1);
        }
        
        // Supprimer un article
        if (e.target.classList.contains('remove-btn') || e.target.parentElement.classList.contains('remove-btn')) {
            const button = e.target.classList.contains('remove-btn') ? e.target : e.target.parentElement;
            const productId = parseInt(button.getAttribute('data-id'));
            removeFromCart(productId);
        }
    });
    
    // Modification directe de la quantité
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('quantity-input')) {
            const input = e.target;
            const productId = parseInt(input.getAttribute('data-id'));
            const newQuantity = parseInt(input.value);
            
            if (newQuantity < 1) {
                input.value = 1;
                updateQuantity(productId, 0);
            } else {
                const currentItem = cart.find(item => item.id === productId);
                if (currentItem) {
                    updateQuantity(productId, newQuantity - currentItem.quantity);
                }
            }
        }
    });
}

// Page commande
function initCommandePage() {
    const orderForm = document.getElementById('order-form');
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    
    // Vérifier si le panier est vide
    if (cart.length === 0) {
        window.location.href = 'panier.html';
        return;
    }
    
    // Afficher le récapitulatif de la commande
    displayOrderSummary();
    
    // Gérer l'affichage des détails de carte
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const cardDetails = document.getElementById('card-details');
            if (this.value === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (cart.length === 0) {
                alert('Votre panier est vide. Veuillez ajouter des produits avant de passer commande.');
                return;
            }
            
            // Simulation de traitement de commande
            processOrder();
        });
    }
}

function displayOrderSummary() {
    const container = document.getElementById('order-summary');
    if (!container) return;
    
    let subtotal = 0;
    const itemsHtml = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return '';
        
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
        
        return `
            <div class="order-summary-item">
                <div class="item-info">
                    <img src="${product.image}" alt="${product.name}" class="item-image">
                    <div class="item-details">
                        <div class="item-name">${product.name}</div>
                        <div class="item-quantity">Quantité: ${item.quantity}</div>
                    </div>
                </div>
                <div class="item-total">${formatPrice(itemTotal)}</div>
            </div>
        `;
    }).join('');
    
    const shipping = subtotal > 50000 ? 0 : 3000;
    const tax = subtotal * 0.18;
    const total = subtotal + tax + shipping;
    
    container.innerHTML = `
        <div class="order-summary-content">
            <h5>Récapitulatif de commande</h5>
            <div class="order-items">
                ${itemsHtml}
            </div>
            <div class="order-totals">
                <div class="total-line">
                    <span>Sous-total:</span>
                    <span>${formatPrice(subtotal)}</span>
                </div>
                <div class="total-line">
                    <span>Livraison:</span>
                    <span>${formatPrice(shipping)}${shipping === 0 ? ' <small class="text-success">(Gratuite)</small>' : ''}</span>
                </div>
                <div class="total-line">
                    <span>TVA (18%):</span>
                    <span>${formatPrice(tax)}</span>
                </div>
                <div class="total-line grand-total">
                    <span><strong>Total:</strong></span>
                    <span><strong>${formatPrice(total)}</strong></span>
                </div>
            </div>
        </div>
    `;
}

function processOrder() {
    const formData = new FormData(document.getElementById('order-form'));
    const orderData = {
        customer: {
            firstname: document.getElementById('firstname').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            postal: document.getElementById('postal').value,
            city: document.getElementById('city').value
        },
        payment: document.querySelector('input[name="payment"]:checked').value,
        items: cart,
        total: calculateCartTotal()
    };
    
    // Simulation d'envoi
    console.log('Commande traitée:', orderData);
    
    // Affichage de confirmation
    alert(`Merci ${orderData.customer.firstname} ! Votre commande a été reçue et est en cours de traitement. Un email de confirmation vous a été envoyé.`);
    
    // Vider le panier et rediriger
    cart = [];
    updateCartStorage();
    updateCartCount();
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Page contact
function initContactPage() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('contact-name').value,
                email: document.getElementById('contact-email').value,
                subject: document.getElementById('contact-subject').value,
                message: document.getElementById('contact-message').value
            };
            
            // Simulation d'envoi
            console.log('Message de contact:', formData);
            
            alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
            contactForm.reset();
        });
    }
}

// Fonctions du panier
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    if (!product.inStock) {
        showNotification('Ce produit est en rupture de stock', 'error');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartStorage();
    updateCartCount();
    
    // Notification
    showNotification(`${product.name} a été ajouté au panier`, 'success');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity < 1) {
        item.quantity = 1;
    }
    
    updateCartStorage();
    updateCartCount();
    
    if (window.location.pathname.includes('panier.html')) {
        displayCartItems();
    }
    
    if (window.location.pathname.includes('commande.html')) {
        displayOrderSummary();
    }
}

function removeFromCart(productId) {
    const product = products.find(p => p.id === productId);
    cart = cart.filter(item => item.id !== productId);
    updateCartStorage();
    updateCartCount();
    
    if (window.location.pathname.includes('panier.html')) {
        displayCartItems();
    }
    
    if (window.location.pathname.includes('commande.html')) {
        displayOrderSummary();
    }
    
    if (product) {
        showNotification(`${product.name} a été retiré du panier`, 'warning');
    }
}

function calculateCartTotal() {
    return cart.reduce((total, item) => {
        const product = products.find(p => p.id === item.id);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}

function updateCartStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

function showNotification(message, type = 'success') {
    // Créer une notification
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed notification`;
    notification.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 1050;
        min-width: 300px;
        animation: fadeIn 0.3s ease;
    `;
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info'}-circle me-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Gestion des URLs avec paramètres
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
}

// Conversion EUR vers CFA (pour référence)
function convertToCFA(euroPrice) {
    return Math.round(euroPrice * 655.957); // Taux de change approximatif
}