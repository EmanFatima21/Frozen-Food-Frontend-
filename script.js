// Import the official Sanity client library
import { createClient } from 'https://esm.sh/@sanity/client';

// =================================================================
// 1. CONFIGURATION: Connect to your Sanity database
// =================================================================
const client = createClient({
  // You can find these in your sanity.config.js file
  projectId: 'tipt9u3l', // Your Project ID
  dataset: 'production',
  apiVersion: '2024-03-11', 
  useCdn: false, // Use false for instant updates during development
});

// A helper function to build image URLs from Sanity image data
function imageUrlFor(source) {
    if (!source || !source.asset) {
        return 'images/placeholder.jpg'; // A fallback image
    }
    // A simplified image URL builder
    const ref = source.asset._ref;
    // Example format: image-ASSET_ID-WIDTHxHEIGHT-FORMAT
    // We'll extract the core parts
    const match = ref.match(/^image-(.*?)-(\d+x\d+)-(\w+)$/);
    if (!match) {
         return 'images/placeholder.jpg';
    }
    const [_, assetId, dimensions, format] = match;
    return `https://cdn.sanity.io/images/${client.config().projectId}/${client.config().dataset}/${assetId}-${dimensions}.${format}`;
}


// =================================================================
// 2. FETCH & DISPLAY: Get the data and build the HTML
// =================================================================

// Get elements from the DOM
const menuGrid = document.getElementById('menu-grid');
const popularGrid = document.querySelector('.popular-products .product-grid');

// This is the "question" we ask the database in a language called GROQ
const productQuery = '*[_type == "product"]';

// A function to create the HTML for a single product card
function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${imageUrlFor(product.image)}?w=300&fit=crop" alt="${product.name}" class="product-image">
            <div class="product-card-content">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-details">${product.quantity || ''} - ${product.price || 0}rs</p>
                <button 
                  class="btn-secondary add-to-list-btn-card" 
                  data-product-name="${product.name}"
                  ${product.status === 'unavailable' ? 'disabled' : ''}
                >
                    ${product.status === 'unavailable' ? 'Out of Stock' : 'Add to List'}
                </button>
            </div>
        </div>
    `;
}

// The main function to fetch data and render it
async function fetchAndDisplayProducts() {
  if (!menuGrid || !popularGrid) return; // Stop if the elements aren't on the page

  try {
    const products = await client.fetch(productQuery);
    
    // Clear any old placeholder content
    menuGrid.innerHTML = '';
    popularGrid.innerHTML = '';

    // Loop through the products and add them to the page
    products.forEach((product, index) => {
      const productCardHTML = createProductCard(product);
      
      // Add every product to the main menu grid
      if (menuGrid) {
        menuGrid.innerHTML += productCardHTML;
      }

      // Add the first 4 products to the "Popular" section
      if (popularGrid && index < 4) {
        popularGrid.innerHTML += productCardHTML;
      }
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    if (menuGrid) menuGrid.innerHTML = '<p>Could not load products at this time.</p>';
  }
}

// Run the function when the page loads
fetchAndDisplayProducts();


// NOTE: All your other functions for dark mode, shopping cart, etc., would go below this line.
// For now, we are just focusing on getting the products to display correctly.