# MERN E-Commerce
A faux e-commerce website where users can "purchase" items of various colors, sizes, and quantities, and view there past orders.

![mern-ecommerce](https://user-images.githubusercontent.com/85912934/205430778-f8206612-b2ee-4da9-bf35-50b535847a14.png)


The backend was built with JavaScript, Node.js, Express, MongoDB, Prettier to make the code easier 
to read, Eslint (Airbnb and Prettier configurations) to find problems in the code, nodemon to 
restart the app when a server change is made, concurrently to run both the client and server 
simultaneously, bcryptjs to encrypt and decrypt the users' password, colors to make certain 
console logs pop out, cors tells the browser that the app at its origin (e.g. localhost:5000) has 
access to resources at another origin (e.g. localhost:3000), dotenv to keep certain information 
secret, express-async-handler to handle async express route exceptions, jsonwebtoken to give each 
user a unique token, and stripe to handle payment logic. 

The frontend utilizes Material-UI with Emotion for styling, axios for HTTP requests, react-redux, 
redux-persist, and reduxjs/toolkit to manage the logged in user's state and cart, react-router-dom to 
handle the app's web routing, Google Fonts, react-material-ui-carousel for the image carousel, and stripe-js and react-stripe-js to handle payment UI.

## How to run this project
1. Open your terminal and type: git clone https://github.com/christiandeandemesa/MERN-ecommerce.git
2. To download the backend dependencies, cd into the mern-ecommerce folder and type: npm install
3. To download the frontend dependencies, cd into the client folder and type: npm install
4. Cd .. back to the mern-ecommerce folder, and run this project by typing: npm run dev
5. Start your server, open Postman, copy the below POST route, fill in the fields, make sure isAdmin is set to true, then create your admin user account.

![postman-2](https://user-images.githubusercontent.com/85912934/205422070-0588de7e-c705-47a1-aefc-b347cbd739a0.png)

6. Copy the below POST route, make sure your form is set to form-data, fill in the fields, fill in the fields, make sure Auth is set to bearer token and your token should have shown when you created your admin user account, then create a product (p.s. you can find images in the server's assets sub-folder).

![postman-3](https://user-images.githubusercontent.com/85912934/205422084-afa3c012-c13d-46b4-b1b7-412a997cc784.png)
![postman-4](https://user-images.githubusercontent.com/85912934/205422087-b48adf74-975c-4af9-895f-01f38fa1ba65.png)
![postman-5](https://user-images.githubusercontent.com/85912934/205422093-b42ba1cd-8349-4bb4-acb4-8d639f4f818b.png)

7. Stop the server with ctrl + c, then restart it with npm run dev to populate your website with your newly made products.

## Features
- User can register and log in to their account.
- Logged in user can view, edit, and delete their profile.
- User can filter all the items by category (e.g. men, clothing, etc.), size, color, name, price, and rating.
- User can add items to their cart.
- Logged in user can increase or decrease the quantity of items in their cart.
- Logged in user can "purchase" their items using Stripe (Note: Please view the Stripe Payment video to see the testing card used).
- Logged in user can view their past orders.
- Logged in user can write, edit, or delete their review for each product.
- Responsive web design for all portrait and landscape devices.
- Browser support for Edge/Internet Explorer.

## Upcoming Features
- Cross browser support for Chrome, Firefox, Opera, and Safari.
- User will have the ability to type a product's name in a search field to filter all the products.
- User will have the ability to type in their email in the footer to get an email notification about joining the fake newsletter.
- [Admin panel](https://github.com/christiandeandemesa/react-admin) for admin users to view and handle all products, users, their carts, and their orders.

## Bugs
- The cart is not independent to each user (Note: Please view the Cart Bug video for elaboration).
- Changing screen sizes messes with the stepper's text (Note: Please view the Stepper Bug video for elaboration).

## Demos
### Register and Login a User

https://user-images.githubusercontent.com/85912934/205462559-5a46c477-5309-460b-a3ff-f5a4109ec006.mp4

### Profile Functionality

https://user-images.githubusercontent.com/85912934/205462634-a1b5eb8a-00a6-4a6d-8c0c-ccbd6e2860aa.mp4

### Filtering Products

https://user-images.githubusercontent.com/85912934/205462717-05f16e05-c446-4fe8-924d-d674d4710da9.mp4

### Cart Functionality

https://user-images.githubusercontent.com/85912934/205462784-f2fd1e8f-3c5c-465d-8259-ab6240258fc4.mp4

### Stripe Payment

https://user-images.githubusercontent.com/85912934/205462975-680fe381-cc84-440b-ae93-bfff935db3c5.mp4

### Viewing the User's Orders

https://user-images.githubusercontent.com/85912934/205463067-04975682-c586-4482-8459-028da1b35231.mp4

### Review Functionality

https://user-images.githubusercontent.com/85912934/205463478-fdc67614-042e-4b96-9bb2-b32092e7c944.mp4

https://user-images.githubusercontent.com/85912934/205463485-5fb80fc2-6700-4b6d-9ccb-edc0b0c899a8.mp4

### Responsive Design Showcase

https://user-images.githubusercontent.com/85912934/205463568-bcc3d47b-fa78-40d4-8c11-f4a5694138f8.mp4

https://user-images.githubusercontent.com/85912934/205463732-fb0df2f5-6fe4-47ee-9050-43f26498657a.mp4

### Cart Bug

https://user-images.githubusercontent.com/85912934/205463354-03726745-1992-493b-9200-44f568434999.mp4

### Stepper Bug

https://user-images.githubusercontent.com/85912934/205463365-b5ce3431-3514-4172-9a4a-65c45e8ad880.mp4

## Author
- Christian Demesa: https://github.com/christiandeandemesa
