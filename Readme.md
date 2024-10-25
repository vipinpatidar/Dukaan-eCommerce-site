# Dukaan - Full Stack MERN eCommerce App

## Live Preview here

Dukaan - https://dukaan-ecommerce-vipin.netlify.app

Dukaan is a full-stack MERN (MongoDB, Express.js, React, Node.js) eCommerce application that allows users to buy and sell products. The frontend is built with Vite React, providing a fast and efficient user experience. Users can browse products, select size and color options, add items to their cart, and seamlessly make purchases.

## Features

- Product Selection: Users can choose product sizes and colors.
- Shopping Cart: Add and remove items from the cart.
- User Authentication: Users can become admins, allowing them to sell their products.
- Admin Dashboard: Manage products, including updating and deleting items.

## Installation

### Using Docker

<details>
<summary><code>client/Dockerfile</code></summary>

```Dockerfile

    ARG NODE_VERSION=20.11.0

   # Use the official Node.js 20-alpine as a base image
   FROM node:${NODE_VERSION}-alpine

   # Create app directory
   WORKDIR /app

   # Copy package.json and package-lock.json to take advantage of caching
   COPY package*.json ./

   # Install dependencies
   RUN npm install

   # Copy the rest of the application code
   COPY . .

   # Build the Vite app for production
   # RUN npm run build

   # Expose the port that Vite will use
   EXPOSE 5173

   # Start the Vite development server
   CMD ["npm", "run", "dev"]

```

</details>
<details>
<summary><code>api/Dockerfile</code></summary>

```Dockerfile


   ARG NODE_VERSION=20.11.0

   FROM node:${NODE_VERSION}-alpine

   # Set working directory
   WORKDIR /app

   # Copy package.json and package-lock.json
   COPY package*.json ./

   # Install dependencies
   RUN npm install

   # Copy the rest of the application code
   COPY . .

   # Expose the application port
   EXPOSE 8080

   # Start the backend server
   CMD ["npm", "start"]

```

</details>

#### add a .env file in client root with environment variables like

      #VITE_SERVER_URL=http://localhost:8080
      #VITE_FIREBASE_API_KEY=your firebase api key
      #VITE_FIREBASE_APP_ID=your firebase app id
      #VITE_MESSAGING_SENDER_ID=your firebase messaging sender id

#### add a .env file in api root with environment variables like

         #PORT=8080
         #MONGODB_URL=your mongodb url
         #SECRET_KEY=jwt secret key
         #STRIPE_KEY=stripe secret key

<details>
<summary><code>docker-compose.yaml</code></summary>

```dockerfile

# specify the version of docker-compose
version: "3.8"

# define the services/containers to be run

services:

# define the frontend service

# we can use any name for the service. A standard naming convention is to use "web" for the frontend

   web:
   # we use depends_on to specify that service depends on another service
   # in this case, we specify that the web depends on the api service # this means that the api service will be started before the web service
      depends_on: - api
      # specify the build context for the web service # this is the directory where the Dockerfile for the web service is located
      build: ./client
      # specify the ports to expose for the web service # the first number is the port on the host machine # the second number is the port inside the container
      ports: - 5173:5173
      # specify the environment variables for the web service # these environment variables will be available inside the container
      env_file: - ./client/.env

      # add a .env file with envrioment variables like
      #VITE_SERVER_URL=http://localhost:8080
      #VITE_FIREBASE_API_KEY=your firebase api key
      #VITE_FIREBASE_APP_ID=your firebase app id
      #VITE_MESSAGING_SENDER_ID=your firebase messaging sender id

      # this is for docker compose watch mode
      # anything mentioned under develop will be watched for changes by docker compose watch and it will perform the action mentioned
      develop:
         # we specify the files to watch for changes
         watch:
         # it'll watch for changes in package.json and package-lock.json and rebuild the container if there are any changes
         - path: ./client/package.json
            action: rebuild
         - path: ./client/package-lock.json
            action: rebuild
         # it'll watch for changes in the client directory and sync the changes with the container real time
         - path: ./client
            target: /app
            action: sync

   # define the api service/container

   api: # api service depends on the db service so the db service will be started before the api service
   depends_on: - db

      # specify the build context for the api service
      build: ./api

      # specify the ports to expose for the api service
      # the first number is the port on the host machine
      # the second number is the port inside the container
      ports:
         - 8080:8080

      # specify environment variables for the api service
      # for demo purposes, we're using a local mongodb instance
      env_file:
         - ./api/.env

         # add a .env file with envrioment variables like
         #PORT=8080
         #MONGODB_URL=your mongodb url
         #SECRET_KEY=jwt secret key
         #STRIPE_KEY=stripe secret key

      # establish docker compose watch mode for the api service
      develop:
         # specify the files to watch for changes
         watch:
         # it'll watch for changes in package.json and package-lock.json and rebuild the container and image if there are any changes
         - path: ./api/package.json
            action: rebuild
         - path: ./api/package-lock.json
            action: rebuild

         # it'll watch for changes in the api directory and sync the changes with the container real time
         - path: ./api
            target: /app
            action: sync

   # define the db service

   db:
   # specify the image to use for the db service from docker hub. If we have a custom image, we can specify that in this format # In the above two services, we're using the build context to build the image for the service from the Dockerfile so we specify the image as "build: ./frontend" or "build: ./backend". # but for the db service, we're using the image from docker hub so we specify the image as "image: mongo:latest" # you can find the image name and tag for mongodb from docker hub here: https://hub.docker.com/_/mongo
   image: mongo:latest

      # specify the ports to expose for the db service
      # generally, we do this in api service using mongodb atlas. But for demo purposes, we're using a local mongodb instance
      # usually, mongodb runs on port 27017. So we're exposing the port 27017 on the host machine and mapping it to the port 27017 inside the container
      ports:
         - 27017:27017

      # specify the volumes to mount for the db service
      # we're mounting the volume named "anime" inside the container at /data/db directory
      # this is done so that the data inside the mongodb container is persisted even if the container is stopped
      volumes:
         - eCommerceDB:/data/db

   # define the volumes to be used by the services

   volumes:
   eCommerceDB:
```

</details>

#### Creating Images and container from .yaml file

1.  Running in watch mode

    docker-compose watch

2.  Without watch mode

    docker-compose up

3.  Stop and Remove containers

    docker-compose down

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
   VITE_SERVER_URL=backend server URL
   VITE_FIREBASE_API_KEY
   VITE_FIREBASE_APP_ID
   VITE_MESSAGING_SENDER_ID

4. Start the frontend development server:npm run dev

## Usage

- Open your browser and go to http://localhost:your_frontend_port.

- Replace your_frontend_port with the port number specified in the frontend setup.

- Explore the Dukaan app, browse products, and make purchases.

- To become an admin, register an account and update your user role in the database to 'admin'.

- As an admin, you can access the admin dashboard, add products for sale, and manage your inventory.

Happy shopping on Dukaan! 🛍️
