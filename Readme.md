# Dukaan - Full Stack MERN eCommerce App

Dukaan is a full-stack MERN (MongoDB, Express.js, React, Node.js) eCommerce application that allows users to buy and sell products. The frontend is built with Vite React, providing a fast and efficient user experience. Users can browse products, select size and color options, add items to their cart, and seamlessly make purchases.

## Features

- Product Selection: Users can choose product sizes and colors.
- Shopping Cart: Add and remove items from the cart.
- User Authentication: Users can become admins, allowing them to sell their products.
- Admin Dashboard: Manage products, including updating and deleting items.

## Installation

### Prerequisites

- Node.js and npm installed globally.
- MongoDB instance.
- Stripe account for payment integration.

## Backend Setup

1. Clone the repository:
   git clone https://github.com/your-username/your-repo.git

2. Navigate to the project directory:
   cd your-repo

3. Install dependencies:
   npm install
4. Create a .env file in the backend directory and add the following variables:

- MONGODB_URL=your_mongodb_connection_url
- SECRET_KEY=your_secret_key
- STRIPE_KEY=your_stripe_api_key
- PORT=your_preferred_port_number

5. Start the backend server:npm start

## Frontend Setup

1. Navigate to the frontend directory:
   cd dukaan/frontend

2. Install dependencies: npm install

3. Create a .env file in the frontend directory and add the following variable:
   VITE_STRIPE_KEY=stripe secret key

4. Start the frontend development server:npm run dev

## Usage

- Open your browser and go to http://localhost:your_frontend_port.

- Replace your_frontend_port with the port number specified in the frontend setup.

- Explore the Dukaan app, browse products, and make purchases.

- To become an admin, register an account and update your user role in the database to 'admin'.

- As an admin, you can access the admin dashboard, add products for sale, and manage your inventory.

Happy shopping on Dukaan! 🛍️
