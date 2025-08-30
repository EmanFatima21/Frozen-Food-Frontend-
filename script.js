// =================================================================
// SANITY.IO CONFIGURATION & DATA FETCHING
// =================================================================

// Import the official Sanity client library
import { createClient } from 'https://esm.sh/@sanity/client';

const client = createClient({
  projectId: 'tipt9u3l', // Your Project ID
  dataset: 'production',
  apiVersion: '2024-03-11',
  useCdn: false,
});

const productQuery = '*[_type == "product"]';

// Helper function to build image URLs from Sanity image data
function imageUrlFor(source) {
    if (!source || !source.asset) {
        return 'images/placeholder.jpg';
    }
    const ref = source.asset._ref;
    const match = ref.match(/^image-(.*?)-(\d+x\d+)-(\w+)$/);
    if (!match) {
         return 'images/placeholder.jpg';
    }
    const [_, assetId, dimensions, format] = match;
    const projectId = client.config().projectId;
    const dataset = client.config().dataset;
    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}-${dimensions}.${format}`;
}

// Global variable to hold all products fetched from Sanity
let allSanityProducts = [];

// =================================================================
// ORIGINAL WEBSITE FUNCTIONALITY (Adapted for Sanity Data)
// =================================================================

document.addEventListener('DOMContentLoaded', () => {

    let shoppingList = [];

    // --- DOM ELEMENTS ---
    const body = document.body;
    const menuGrid = document.getElementById('menu-grid');
    const popularGrid = document.querySelector('.popular-products .product-grid');
    const searchBar = document.getElementById('search-bar');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const darkModeCheckbox = document.getElementById('dark-mode-checkbox');
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
        if (!menuGrid) return;
        menuGrid.innerHTML = '';
        if (itemsToRender.length === 0) {
            menuGrid.innerHTML = '<p class="no-results" style="text-align:center; width:100%;">No items match your search.</p>';
            return;
        }
        itemsToRender.forEach(item => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${imageUrlFor(item.image)}?w=300&fit=crop" alt="${item.name}" class="product-image" data-product-id="${item._id}">
                <div class="product-card-content">
                    <h3 class="product-name">${item.name}</h3>
                    <p class="product-details">${item.quantity || ''} - ${item.price || 0}rs</p>
                    <button class="btn-secondary add-to-list-btn-card" data-product-id="${item._id}" ${item.status === 'unavailable' ? 'disabled' : ''}>
                        ${item.status === 'unavailable' ? 'Out of Stock' : 'Add to List'}
                    </button>
                </div>
            `;
            menuGrid.appendChild(card);
        });
    }
    
    function renderShoppingList() {
        if (!listItemsContainer) return;
        listItemsContainer.innerHTML = '';
        if (shoppingList.length === 0) {
            listItemsContainer.innerHTML = '<p class="empty-list-msg">Your list is empty. Add items from the menu!</p>';
        } else {
            shoppingList.forEach(item => {
                const listItem = document.createElement('div');
                listItem.className = 'list-item';
                listItem.dataset.productId = item._id;
                listItem.innerHTML = `
                    <img src="${imageUrlFor(item.image)}" alt="${item.name}" class="list-item-img">
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
     function updateSubtotal() {
        if (!subtotalPriceEl) return;
        const subtotal = shoppingList.reduce((total, item) => total + (item.price * item.quantityInList), 0);
        subtotalPriceEl.textContent = `${subtotal}rs`;
    }

    function updateListItemCount() {
        if (!listItemCountEl) return;
        const totalItems = shoppingList.reduce((total, item) => total + item.quantityInList, 0);
        listItemCountEl.textContent = totalItems;
    }

    // --- MODAL FUNCTIONS ---
    function openModal(productId) {
        const product = allSanityProducts.find(item => item._id === productId);
        if (!product || !modal || !modalOverlay) return;
        modalBody.innerHTML = `
            <img src="${imageUrlFor(product.image)}" alt="${product.name}" class="modal-img">
            <div class="modal-details">
                <h3>${product.name}</h3>
                <p class="price">${product.quantity} - ${product.price}rs</p>
                <p class="status ${product.status}">${product.status.charAt(0).toUpperCase() + product.status.slice(1)}</p>
                <p class="description">${product.description || ''}</p>
                <button class="btn-primary add-to-list-btn" data-product-id="${product._id}" ${product.status === 'unavailable' ? 'disabled' : ''}>
                    ${product.status === 'unavailable' ? 'Out of Stock' : 'Add to List'}
                </button>
            </div>
        `;
        modal.classList.add('visible');
        modalOverlay.classList.add('visible');
    }

    function closeModal() {
        if (!modal || !modalOverlay) return;
        modal.classList.remove('visible');
        modalOverlay.classList.remove('visible');
    }

    // --- SHOPPING LIST FUNCTIONS ---
    function openShoppingList() {
        if (!listContainer || !listOverlay) return;
        listContainer.classList.add('open');
        listOverlay.classList.add('visible');
    }

    function closeShoppingList() {
        if (!listContainer || !listOverlay) return;
        listContainer.classList.remove('open');
        listOverlay.classList.remove('visible');
    }

    function addItemToList(productId) {
        const product = allSanityProducts.find(item => item._id === productId);
        if (!product || product.status === 'unavailable') return;

        const existingItem = shoppingList.find(item => item._id === productId);
        if (existingItem) {
            existingItem.quantityInList++;
        } else {
            shoppingList.push({ ...product, quantityInList: 1 });
        }
        renderShoppingList();
    }
    
    function updateItemQuantity(productId, action) {
        const item = shoppingList.find(item => item._id === productId);
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
        shoppingList = shoppingList.filter(item => item._id !== productId);
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
    if (darkModeCheckbox) {
        darkModeCheckbox.addEventListener('change', () => {
            setDarkMode(darkModeCheckbox.checked);
        });
    }

    if (searchBar) {
        searchBar.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const activeCategory = document.querySelector('.filter-btn.active').dataset.filter;
            let itemsToRender = allSanityProducts;

            if (activeCategory !== 'all') {
                itemsToRender = itemsToRender.filter(item => item.category === activeCategory);
            }
            
            itemsToRender = itemsToRender.filter(item => item.name.toLowerCase().includes(searchTerm));
            renderMenu(itemsToRender);
        });
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.filter;
            if (searchBar) searchBar.value = '';
            
            if (category === 'all') {
                renderMenu(allSanityProducts);
            } else {
                const filteredItems = allSanityProducts.filter(item => item.category === category);
                renderMenu(filteredItems);
            }
        });
    });

    if (menuGrid) {
        menuGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('product-image')) {
                openModal(e.target.dataset.productId);
            }
            if (e.target.classList.contains('add-to-list-btn-card')) {
                 addItemToList(e.target.dataset.productId);
            }
        });
    }
    
    if (popularGrid) {
        popularGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const image = e.target.closest('.product-image');
            if (card && image) {
                openModal(image.dataset.productId);
            }
        });
    }

    if (modal) {
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
    }
    
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    if (openListBtn) openListBtn.addEventListener('click', openShoppingList);
    if (closeListBtn) closeListBtn.addEventListener('click', closeShoppingList);
    if (listOverlay) listOverlay.addEventListener('click', closeShoppingList);

    if (listItemsContainer) {
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
    }
    
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
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
        });
    }

    // --- INITIALIZATION ---
    async function initializeApp() {
        if (localStorage.getItem('darkMode') === 'enabled') {
            if(darkModeCheckbox) darkModeCheckbox.checked = true;
            setDarkMode(true);
        }
        
        try {
            allSanityProducts = await client.fetch(productQuery);
            renderMenu(allSanityProducts);

            if (popularGrid) {
                popularGrid.innerHTML = '';
                allSanityProducts.slice(0, 4).forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'product-card';
                    card.innerHTML = `
                        <img src="${imageUrlFor(item.image)}?w=300&fit=crop" alt="${item.name}" class="product-image" data-product-id="${item._id}">
                         <div class="product-card-content">
                            <h3 class="product-name">${item.name}</h3>
                            <p class="product-details">${item.quantity} - ${item.price}rs</p>
                            <button class="btn-secondary add-to-list-btn-card" data-product-id="${item._id}" ${item.status === 'unavailable' ? 'disabled' : ''}>
                                ${item.status === 'unavailable' ? 'Out of Stock' : 'Add to List'}
                            </button>
                        </div>
                    `;
                    popularGrid.appendChild(card);
                });
            }
            
            renderShoppingList();
        } catch (error) {
            console.error('Error fetching products:', error);
            if (menuGrid) menuGrid.innerHTML = '<p>Could not load products at this time.</p>';
        }
    }

    initializeApp();
});