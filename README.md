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
### Cloning the Code
1. Open your terminal and type git clone https://github.com/christiandeandemesa/MERN-ecommerce.git
2. Cd into MERN-ecommerce, then type git checkout e46ca8a166a to get commit before deployment.
3. To download the backend dependencies, stay in the root folder (MERN-ecommerce) and type npm install.
4. To download the frontend dependencies, cd into the client folder and type npm install.

### Connecting to MongoDB
1. Create an account or login to [MongoDB Atlas](https://account.mongodb.com/account/login).
2. Click New Project, name your project, click Next, then Create Project.

![mongo-1](https://user-images.githubusercontent.com/85912934/214934048-4337c703-af47-4256-960c-b6043ac4550b.png)
![mongo-2](https://user-images.githubusercontent.com/85912934/214934087-982ae57b-8f36-40d2-bd7c-970161f9639f.png)
![mongo-3](https://user-images.githubusercontent.com/85912934/214934111-a393d093-dd2f-4de7-a9e5-8a9a685a15c2.png)

3. Click Build a Database, and choose the free option.

![mongo-4](https://user-images.githubusercontent.com/85912934/214934176-4c6d5942-3c14-413f-9f9d-96de5c32f14e.png)
![mongo-5](https://user-images.githubusercontent.com/85912934/214934182-f5a8cb4c-1235-4697-a951-54494b19e2e5.png)

4. Leave AWS as the Cloud Provider & Region, the region closest to where you are, and click Create Cluster.

![mongo-6](https://user-images.githubusercontent.com/85912934/214934268-7c7b1990-119a-4e74-8626-0686b9fdb2f9.png)

5. Type in a username and password, click Create User, leave it on My Local Environment, click Add My Current IP Address, then Finish and Close.

![mongo-7](https://user-images.githubusercontent.com/85912934/214934328-dc5ddf58-d9b0-4cfa-9f5b-47893806b33a.png)
![mongo-8](https://user-images.githubusercontent.com/85912934/214934354-dd442577-c84d-4021-9029-a3dddf284513.png)

6. Click Connect, Connect your application, then copy the connection string.

![mongo-9](https://user-images.githubusercontent.com/85912934/214934413-6af4411b-9ff0-4f86-a0ba-ff3461dd9e5e.png)
![mongo-10](https://user-images.githubusercontent.com/85912934/214934424-2bc5e182-874d-44e1-9b25-213a5504eaa8.png)
![mongo-11](https://user-images.githubusercontent.com/85912934/214934429-77723285-54db-4595-9477-0b9922ee72d5.png)

7. Create a .env in your root folder and add the following:
```
PORT = 5000
MONGO_URI = MongoDB connection string (Note: Don't forget to replace <password> with your password)
JWT_SECRET = Any Text Here
STRIPE_SECRET_KEY = Below Section
```

### Add Stripe Keys
1. Create an account or login to [Stripe](https://dashboard.stripe.com/login).
2. Click Developers then API Keys.

![stripe-1](https://user-images.githubusercontent.com/85912934/214936915-bea7861d-67ff-4060-bdcd-72dc09687c5e.png)
![stripe-2](https://user-images.githubusercontent.com/85912934/214936953-4433eec9-6184-4a21-aacb-3c05bff5a242.png)

3. Copy the Secret Key and put it in the .env's STRIPE_SECRET_KEY.

![stripe-3](https://user-images.githubusercontent.com/85912934/214936978-35758342-bae5-4741-9fe9-52ad6027bb8c.png)

### Creating Products with Postman
1. Download [Postman](https://www.postman.com/downloads/), and open your terminal and type npm start to start the server.
2. Open Postman, copy the below POST route, fill in the fields, make sure isAdmin is set to true, then create your admin user account.

![postman-2](https://user-images.githubusercontent.com/85912934/205422070-0588de7e-c705-47a1-aefc-b347cbd739a0.png)

3. Copy the below POST route, make sure your form is set to form-data, fill in the fields, fill in the fields, make sure Auth is set to bearer token and your token should have shown when you created your admin user account, then create a product (Note: You can find png images in the server's assets sub-folder).

![postman-3](https://user-images.githubusercontent.com/85912934/205422084-afa3c012-c13d-46b4-b1b7-412a997cc784.png)
![postman-4](https://user-images.githubusercontent.com/85912934/205422087-b48adf74-975c-4af9-895f-01f38fa1ba65.png)
![postman-5](https://user-images.githubusercontent.com/85912934/205422093-b42ba1cd-8349-4bb4-acb4-8d639f4f818b.png)

4. Type ctrl + c to start the server, then type npm run dev to run both the client and server.

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

### Cart Bug
https://user-images.githubusercontent.com/85912934/205463354-03726745-1992-493b-9200-44f568434999.mp4

### Stepper Bug
https://user-images.githubusercontent.com/85912934/205463365-b5ce3431-3514-4172-9a4a-65c45e8ad880.mp4

## [MERN E-commerce Demo](https://mern-e-commerce-frontend.onrender.com/)

## Author
- Christian Demesa: https://github.com/christiandeandemesa
