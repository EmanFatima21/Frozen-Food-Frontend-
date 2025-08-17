document.addEventListener('DOMContentLoaded', () => {

    // --- PRODUCT DATA (Updated with new categories) ---
    const menuItems = [
        // Beef
        { id: "kofte", name: "Kofte", quantity: "12pcs", price: 600, image: "kofta.jpeg", category: "chicken", description: "Juicy and flavorful meatballs, perfect as a main course or a hearty snack.", status: "available" },
        { id: "shami-kabab", name: "Shami ", quantity: "12pcs", price: 600, image: "Shami.jpeg", category: "beef", description: "A classic blend of minced meat and lentils, spiced to perfection and fried to a golden brown.", status: "available" },
        { id: "seekh-kabab", name: "Seekh Kabab", quantity: "12pcs", price: 800, image: "seekh kabab.jpeg", category: "beef", description: "Spiced minced meat molded onto skewers and grilled, delivering a smoky and rich flavor.", status: "available" },
        { id: "chapli-kabab", name: "Chapli Kabab", quantity: "6pcs", price: 500, image: "Chaplin Kabab.jpeg", category: "beef", description: "A Pashtun-style minced kebab, known for its unique spices and flat, round shape.", status: "available" },
        
        // Chicken
        { id: "aalu-chicken-cutlets", name: "Aalu Chicken Cutlets", quantity: "12pcs", price: 600, image: "Cutlets.jpeg", category: "chicken", description: "A delicious mix of mashed potatoes and minced chicken, formed into patties and fried.", status: "available" },
        { id: "chicken-bread", name: "Chicken Bread", quantity: "12pcs", price: 1200, image: "chicken bread.jpeg", category: "chicken", description: "Soft, baked bread filled with a creamy and savory chicken mixture. A complete snack.", status: "available" },
        
        // Snacks
        { id: "chicken-sticks", name: "Chicken Sticks", quantity: "12pcs", price: 500, image: "chicken sticks.jpeg", category: "snacks", description: "Tender chicken strips, breaded and fried until golden. A favorite for all ages.", status: "available" },
        { id: "chicken-rolls", name: "Chicken Rolls", quantity: "12pcs", price: 600, image: "Roll.jpeg", category: "snacks", description: "Crispy spring rolls filled with a savory mixture of seasoned chicken and vegetables.", status: "available" },
        { id: "nuggets", name: "Nuggets", quantity: "12pcs", price: 500, image: "nuggets.jpeg", category: "snacks", description: "Bite-sized pieces of breaded chicken, perfect for dipping in your favorite sauce.", status: "unavailable" },
        { id: "chicken-tempura", name: "Chicken Tempura", quantity: "Half KG", price: 700, image: "chicken tempura.jpeg", category: "snacks", description: "Lightly battered and deep-fried chicken pieces, offering a crispy texture and juicy interior.", status: "available" },
        { id: "aalu-samosa", name: "Aalu Samosa", quantity: "12pcs", price: 250, image: "aalu samosa.jpeg", category: "snacks", description: "Classic triangular pastry filled with spiced potatoes and peas.", status: "available" },
        { id: "chicken-pasta-samosa", name: "Chicken Pasta Samosa", quantity: "12pcs", price: 300, image: "chicken pasta.jpeg", category: "snacks", description: "A modern twist on the classic, filled with cheesy chicken pasta.", status: "unavailable" },
        { id: "chicken-veg-samosa", name: "Chicken Veg Samosa", quantity: "12pcs", price: 350, image: "chicken veg.jpeg", category: "snacks", description: "A savory mix of minced chicken and fresh vegetables in a crispy pastry.", status: "available" },
        { id: "burger-pattie", name: "Burger Pattie", quantity: "6pcs", price: 600, image: "Burger pattie.jpeg", category: "snacks", description: "Perfectly seasoned patties, ready to be grilled or fried for your homemade burgers.", status: "available" },
        { id: "croquettes", name: "Croquettes", quantity: "8pcs", price: 400, image: "croquettes.jpeg", category: "snacks", description: "Creamy potato and chicken filling, breaded and deep-fried to golden perfection.", status: "available" },
        { id: "cheese-balls", name: "Cheese Balls", quantity: "8pcs", price: 400, image: "Cheese Balls.jpeg", category: "snacks", description: "A delightful snack with a molten cheese center and a crispy outer layer.", status: "available" },
        { id: "mini-pizzas", name: "Mini Pizzas", quantity: "4pcs", price: 1000, image: "mini pizza.jpeg", category: "snacks", description: "Bite-sized pizzas with delicious toppings, perfect for parties and snacks.", status: "available" },
        { id: "chicken-popcorn", name: "Chicken Popcorn", quantity: "1 KG", price: 1200, image: "chicken popcorn.jpeg",category: "snacks", description: "Bite-sized, crispy chicken popcorn, perfect for snacking.", status: "available" },
        { id: "momos", name: "Momos", quantity: "1 dozen", price: 500, image: "momos.jpeg", category: "snacks", description: "Steamed dumplings filled with a savory chicken or vegetable filling, served with a spicy dipping sauce.", status: "available" },
        { id: "kachori", name: "Kachori", quantity: "1 dozen", price: 1100, image: "kachori.jpeg", category: "snacks", description: "A flaky, deep-fried pastry filled with a spicy mixture of lentils and spices.", status: "available" },

        // Seafood
        { id: "marinated-fish", name: "Marinated Fish", quantity: "1KG", price: 1200, image: "marinated fish.jpeg", category: "seafood", description: "Fresh fish fillets marinated in a blend of herbs and spices, ready for the grill or pan.", status: "available" },

        // Desi (New Items)
        { id: "beef-haleem", name: "Beef Haleem", quantity: "1 KG", price: 1300, image: "beef haleem.jpeg", category: "desi", description: "A rich and hearty slow-cooked stew of beef, lentils, and wheat.", status: "available" },
        { id: "saag", name: "Saag", quantity: "1 KG", price: 600, image: "saag.jpeg", category: "desi", description: "Traditional spiced mustard greens, a classic Punjabi dish.", status: "available" },
        { id: "pickle", name: "Mixed Pickle", quantity: "1 KG", price: 800, image: "pickle.jpeg", category: "desi", description: "A tangy and spicy mix of pickled vegetables and fruits.", status: "available" }
    ];

    let shoppingList = [];

    // --- DOM ELEMENTS ---
    const body = document.body;
    const menuGrid = document.getElementById('menu-grid');
    const searchBar = document.getElementById('search-bar');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const darkModeCheckbox = document.getElementById('dark-mode-checkbox');
    const allProductCards = document.querySelector('.popular-products .product-grid');
    // ... (rest of the DOM elements are the same as before)
    const modal = document.getElementById('product-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');
    const listContainer = document.getElementById('shopping-list');
    const listItemsContainer = document.getElementById('list-items');
    const openListBtn = document.getElementById('open-list-btn');
    const closeListBtn = document.querySelector('.close-list-btn');
    const listOverlay = document.getElementById('list-overlay');
    const subtotalPriceEl = document.getElementById('subtotal-price');
    const listItemCountEl = document.getElementById('list-item-count');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');


    // --- RENDER FUNCTIONS ---
    function renderMenu(itemsToRender) {
        menuGrid.innerHTML = '';
        if (itemsToRender.length === 0) {
            menuGrid.innerHTML = '<p class="no-results" style="text-align:center; width:100%;">No items match your search.</p>';
            return;
        }
        itemsToRender.forEach(item => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="images/${item.image}" alt="${item.name}" class="product-image" data-product-id="${item.id}">
                <div class="product-card-content">
                    <h3 class="product-name">${item.name}</h3>
                    <p class="product-details">${item.quantity} - ${item.price}rs</p>
                    <button class="btn-secondary add-to-list-btn-card" data-product-id="${item.id}" ${item.status === 'unavailable' ? 'disabled' : ''}>
                        ${item.status === 'unavailable' ? 'Out of Stock' : 'Add to List'}
                    </button>
                </div>
            `;
            menuGrid.appendChild(card);
        });
    }
    
    // ... (renderShoppingList function is the same as before)
    function renderShoppingList() {
        listItemsContainer.innerHTML = '';
        if (shoppingList.length === 0) {
            listItemsContainer.innerHTML = '<p class="empty-list-msg">Your list is empty. Add items from the menu!</p>';
        } else {
            shoppingList.forEach(item => {
                const listItem = document.createElement('div');
                listItem.className = 'list-item';
                listItem.dataset.productId = item.id;
                listItem.innerHTML = `
                    <img src="images/${item.image}" alt="${item.name}" class="list-item-img">
                    <div class="list-item-details">
                        <div class="list-item-name">${item.name}</div>
                        <div class="list-item-price">${item.price}rs</div>
                    </div>
                    <div class="list-item-controls">
                        <button class="quantity-btn decrease-qty">-</button>
                        <span class="item-quantity">${item.quantityInList}</span>
                        <button class="quantity-btn increase-qty">+</button>
                        <button class="remove-item-btn">&times;</button>
                    </div>
                `;
                listItemsContainer.appendChild(listItem);
            });
        }
        updateSubtotal();
        updateListItemCount();
    }


    // --- UPDATE FUNCTIONS ---
    // ... (updateSubtotal and updateListItemCount functions are the same as before)
     function updateSubtotal() {
        const subtotal = shoppingList.reduce((total, item) => total + (item.price * item.quantityInList), 0);
        subtotalPriceEl.textContent = `${subtotal}rs`;
    }

    function updateListItemCount() {
        const totalItems = shoppingList.reduce((total, item) => total + item.quantityInList, 0);
        listItemCountEl.textContent = totalItems;
    }

    // --- MODAL FUNCTIONS ---
    // ... (openModal and closeModal functions are the same as before)
    function openModal(productId) {
        const product = menuItems.find(item => item.id === productId);
        if (!product) return;

        modalBody.innerHTML = `
            <img src="images/${product.image}" alt="${product.name}" class="modal-img">
            <div class="modal-details">
                <h3>${product.name}</h3>
                <p class="price">${product.quantity} - ${product.price}rs</p>
                <p class="status ${product.status}">${product.status.charAt(0).toUpperCase() + product.status.slice(1)}</p>
                <p class="description">${product.description}</p>
                <button class="btn-primary add-to-list-btn" data-product-id="${product.id}" ${product.status === 'unavailable' ? 'disabled' : ''}>
                    ${product.status === 'unavailable' ? 'Out of Stock' : 'Add to List'}
                </button>
            </div>
        `;
        modal.classList.add('visible');
        modalOverlay.classList.add('visible');
    }

    function closeModal() {
        modal.classList.remove('visible');
        modalOverlay.classList.remove('visible');
    }

    // --- SHOPPING LIST FUNCTIONS ---
    // ... (openShoppingList, closeShoppingList, addItemToList, updateItemQuantity, removeItemFromList are the same as before)
    function openShoppingList() {
        listContainer.classList.add('open');
        listOverlay.classList.add('visible');
    }

    function closeShoppingList() {
        listContainer.classList.remove('open');
        listOverlay.classList.remove('visible');
    }

    function addItemToList(productId) {
        const product = menuItems.find(item => item.id === productId);
        if (!product || product.status === 'unavailable') return;

        const existingItem = shoppingList.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantityInList++;
        } else {
            shoppingList.push({ ...product, quantityInList: 1 });
        }
        renderShoppingList();
    }
    
    function updateItemQuantity(productId, action) {
        const item = shoppingList.find(item => item.id === productId);
        if (!item) return;

        if (action === 'increase') {
            item.quantityInList++;
        } else if (action === 'decrease') {
            item.quantityInList--;
            if (item.quantityInList === 0) {
                removeItemFromList(productId);
            }
        }
        renderShoppingList();
    }
    
    function removeItemFromList(productId) {
        shoppingList = shoppingList.filter(item => item.id !== productId);
        renderShoppingList();
    }
    
    // --- DARK MODE FUNCTIONALITY ---
    function setDarkMode(isDark) {
        if (isDark) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    }

    // --- EVENT LISTENERS ---
    
    // Dark Mode
    darkModeCheckbox.addEventListener('change', () => {
        setDarkMode(darkModeCheckbox.checked);
    });

    // Filter and Search
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const activeCategory = document.querySelector('.filter-btn.active').dataset.filter;
        let itemsToRender = menuItems;

        if (activeCategory !== 'all') {
            itemsToRender = itemsToRender.filter(item => item.category === activeCategory);
        }
        
        itemsToRender = itemsToRender.filter(item => item.name.toLowerCase().includes(searchTerm));
        renderMenu(itemsToRender);
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.filter;
            searchBar.value = '';
            if (category === 'all') {
                renderMenu(menuItems);
            } else {
                const filteredItems = menuItems.filter(item => item.category === category);
                renderMenu(filteredItems);
            }
        });
    });

    // Modal Opening (from Menu Grid Images and Popular Items Images)
    menuGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('product-image')) {
            openModal(e.target.dataset.productId);
        }
        if (e.target.classList.contains('add-to-list-btn-card')) {
             addItemToList(e.target.dataset.productId);
        }
    });
    
    allProductCards.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        if (card) {
            openModal(card.dataset.productId);
        }
    });

    // ... (Rest of event listeners are the same as before)
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-list-btn')) {
            addItemToList(e.target.dataset.productId);
            closeModal();
            openShoppingList();
        }
        if (e.target.classList.contains('close-modal-btn')) {
            closeModal();
        }
    });

    modalOverlay.addEventListener('click', closeModal);

    openListBtn.addEventListener('click', openShoppingList);
    closeListBtn.addEventListener('click', closeShoppingList);
    listOverlay.addEventListener('click', closeShoppingList);

    listItemsContainer.addEventListener('click', (e) => {
        const target = e.target;
        const parentItem = target.closest('.list-item');
        if (!parentItem) return;
        const productId = parentItem.dataset.productId;

        if (target.classList.contains('increase-qty')) {
            updateItemQuantity(productId, 'increase');
        } else if (target.classList.contains('decrease-qty')) {
            updateItemQuantity(productId, 'decrease');
        } else if (target.classList.contains('remove-item-btn')) {
            removeItemFromList(productId);
        }
    });
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 90) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    
    mobileNavToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });

    // --- INITIALIZATION ---
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        darkModeCheckbox.checked = true;
        setDarkMode(true);
    }
    
    renderMenu(menuItems);
    renderShoppingList();
});