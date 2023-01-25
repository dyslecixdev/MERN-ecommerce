# MERN E-Commerce
A faux e-commerce website where users can "purchase" items of various colors, sizes, and quantities, and view there past orders.

![mern-ecommerce](https://user-images.githubusercontent.com/85912934/214709423-284d627c-9800-4038-91cd-6c14ab260f6e.png)

The backend was built with javascript, node.js, express, mongodb atlas,   
bcryptjs to encrypt and decrypt the users' password, colors to make certain console logs pop out, 
cors tells the browser that the app at its origin has access to resources at another origin, 
dotenv to keep certain information secret, express-async-handler to handle async express route exceptions, 
jsonwebtoken to give each user a unique token, multer to upload the product images, prop-types to declare the type of props for eslint, and stripe to handle payment logic. 

The developer version's backend, which can be cloned in the below section, also features prettier to make the code easier to read, eslint (Airbnb and 
Prettier configurations) to find problems in the code, nodemon to restart the app when a server change is made, and concurrently to run both the client and server simultaneously.

The frontend utilizes Material-UI with Emotion for styling, axios for HTTP requests, react-redux and reduxjs/toolkit to manage the logged in user's state, react-router-dom to 
handle the app's web routing, react-material-ui-carousel for the image carousel, stripe-js and react-stripe-js to handle payment UI, and Google Fonts.

## How to run this project
1. Open your terminal and type: git clone https://github.com/christiandeandemesa/MERN-ecommerce.git
2. Cd into MERN-ecommerce, then type git checkout e46ca8a166a to get commit before deployment.
3. To download the backend dependencies, stay in the root folder (MERN-ecommerce) and type: npm install
3. To download the frontend dependencies, cd into the client folder and type: npm install
4. Cd .. back to the MERN-ecommerce folder, and run this project by typing: npm run dev
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
- The cart is not independent to each user because it is not implemented in the redux yet.
- Changing screen sizes messes with the stepper's text because the text is set to appear or not appear depending on the screen size upon first render.
- Deployed website does not show images for products because multer is saving them in a server/assets folder.

### Cart Bug
https://user-images.githubusercontent.com/85912934/205463354-03726745-1992-493b-9200-44f568434999.mp4

### Stepper Bug
https://user-images.githubusercontent.com/85912934/205463365-b5ce3431-3514-4172-9a4a-65c45e8ad880.mp4

### Product Image Bug
https://user-images.githubusercontent.com/85912934/214709121-ee1985b0-7992-4b96-bfab-ba6f6bae3a6c.mp4

## [MERN E-commerce Demo](https://mern-e-commerce-frontend.onrender.com/)

## Author
- Christian Demesa: https://github.com/christiandeandemesa
