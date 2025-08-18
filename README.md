****🍔 Anaya Frozen Foods: Interactive E-Commerce Website****

An end-to-end frontend project that builds a complete, interactive, and responsive e-commerce website for a local homemade frozen food business. This repository contains the complete static website built with pure HTML, CSS, and JavaScript, designed to provide a professional online presence and a seamless user experience for customers.

💡 The project's core is a dynamic, client-side rendered menu system that allows users to browse, search, filter, and compile an order list in real-time without any backend dependency.

**🌟 Key Features :**

	✨ Dynamic Product Menu: The entire product catalog is rendered dynamically using JavaScript, allowing for easy updates and management directly within the code.
	🛒 Interactive Shopping List: Users can add items to a persistent shopping list, adjust quantities, remove items, and see a running subtotal of their planned order.
	🔍 Real-Time Search & Filtering: Instantly find products with a live search bar and filter the menu by categories (Chicken, Beef, Snacks, etc.) with a single click.
	🎨 Glassmorphism & Modern UI: A stunning hero section with a "frosted glass" effect and a clean, professional layout that enhances the brand's visual appeal.
	🌓 Dark/Light Mode Toggle: A user-friendly toggle switch allows customers to switch between a light and dark theme, with their preference saved in their browser for future visits.
	📱 Fully Responsive Design: The single-page application is built with a mobile-first approach, ensuring a seamless experience on all devices, from smartphones to desktops.
	📋 Product Detail Modal: Clicking on any product image opens a detailed pop-up view with a larger photo, description, price, and availability status.

 **🛠️ Tech Stack & Libraries**
| Category           | Tools & Libraries                            |
| ------------------ | -------------------------------------------- |
| Core Technologies  | HTML5, CSS3, JavaScript (ES6)                |
| Styling            | Flexbox, CSS Grid, Custom CSS Variables      |
| Fonts & Icons      | Google Fonts (Poppins, Lato), Font Awesome   |
| Development        | Visual Studio Code, Live Server              |
| Deployment         | Netlify, GitHub                              |

**📁 Project Structure**
```
├── images/
│   ├── logo.jpeg
│   ├── hero-background.jpg
│   ├── Shami.jpeg
│   ├── Roll.jpeg
│   └── (all other product images...)
├── index.html          # Main HTML structure for the single-page app
├── style.css           # All custom styling, including dark mode and responsiveness
├── script.js           # Core application logic, data management, and DOM manipulation
```

**⚙️ Installation & Setup**

This is a static front-end project and does not require any complex installation or dependencies.

1. Clone the Repository:

https://github.com/EmanFatima21/Frozen-Food-Frontend-.git


2. Place Your Images:

Ensure all your product images, the logo (logo.jpeg), and the hero background (hero-background.jpg) are placed inside the images/ folder.

3. No Dependencies:

There are no external packages to install (like npm or pip). All required libraries (Google Fonts, Font Awesome) are loaded via CDN links in the HTML.

**▶️ How to Run the Project**

Simply open the index.html file in your favorite web browser (like Google Chrome, Firefox, or Edge).

 On Windows, you can use:
start index.html

 On macOS, you can use:
open index.html

Alternatively, you can use a simple web server or the "Live Server" extension in Visual Studio Code for the best experience.

**🧠 Website Functionality Breakdown**

The entire website operates on the client-side using JavaScript to manipulate the DOM.

1-Data Management (script.js):
All product information (name, price, image, category, description) is stored in a single JavaScript array of objects called menuItems. This acts as a client-side database, making it easy to add or update products by simply editing this array.

2-Dynamic Rendering (script.js):
On page load, the renderMenu() function reads the menuItems array and dynamically generates the HTML for each product card, inserting them into the menu grid. This means you don't have to write repetitive HTML for each product.

3-Event Handling (script.js):
The application uses addEventListener to manage all user interactions:

4-Search Bar: Filters the menuItems array based on user input and re-renders the menu.

5-Filter Buttons: Filters the menuItems array by category and re-renders the menu.

6-"Add to List" Buttons: Pushes the selected product into a shoppingList array and re-renders the list sidebar.

7-Shopping List Controls: Modifies the shoppingList array (increasing/decreasing quantity, removing items) and updates the view.

8-Dark Mode Toggle: Adds or removes the .dark-mode class from the <body> tag and saves the user's choice to localStorage.

**🔮 Future Enhancements**

This project provides a solid foundation. The next logical steps to turn this into a full-fledged e-commerce solution are:

1-Headless CMS Integration: Connect the frontend to a Headless CMS (like Sanity.io or Strapi). This would allow the business owner to add, edit, and manage products from a user-friendly admin panel without touching any code.

2-Online Payment Gateway: Integrate a local payment provider (e.g., EasyPaisa, JazzCash) to allow for online pre-payments.

3-Backend & Order Management: Build a simple backend (e.g., with Node.js/Express) to handle incoming orders, which would be displayed in a secure admin dashboard for the owner to track and manage.

4-User Accounts: Allow customers to create accounts to save their details and view their order history.

**📧 Contact**

    Eman Fatima
📫 emanfaima10062003@gmail.com
🌐 LinkedIn: [www.linkedin.com/in/emanfatima12]
