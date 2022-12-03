const asyncHandler = require('express-async-handler');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/orderModel');

// Create an order
const createOrder = asyncHandler(async (req, res) => {
	const {products, address, totalPrice} = req.body;

	if (products.length < 1 || !address || !totalPrice)
		return res.status(400).json('Products, address, and totalPrice are required');

	const newOrder = await Order.create({
		userId: req.user.id,
		products,
		address,
		totalPrice
	});

	if (newOrder) res.status(201).json(newOrder);
	else res.status(400).json('Invalid order data');
});

// Get one order
const getOneOrder = asyncHandler(async (req, res) => {
	const existingOrder = await Order.findById(req.params.id);
	if (!existingOrder) return res.status(401).json('Order not found');

	if (req.user.id === existingOrder.userId || req.user.isAdmin)
		res.status(200).json(existingOrder);
	else res.status(401).json("Only an administrator or the order's user can get this order");
});

// Gets all the orders
const getAllOrders = asyncHandler(async (req, res) => {
	const userId = req.query.category;

	let existingOrders;
	if (userId) existingOrders = await Order.find({userId});
	else {
		if (req.user.isAdmin) existingOrders = await Order.find();
		else res.status(403).json('Only an administrator can get all the orders');
	}

	res.status(200).json(existingOrders);
});

// Updates an order
const updateOrder = asyncHandler(async (req, res) => {
	// const {products, address, payment, totalPrice} = req.body;

	const existingOrder = await Order.findById(req.params.id);
	if (!existingOrder) return res.status(404).json('Order not found');

	let updatedOrder;
	try {
		updatedOrder = await Order.findOneAndUpdate(
			{userId: req.user.id},
			{
				$set: req.body
			},
			{new: true}
		);
	} catch (err) {
		console.log(err.message.white.bgRed);
		res.status(400).json('Invalid updated product data');
	}

	if (req.user.isAdmin) res.status(201).json(updatedOrder);
	else res.status(403).json('Only an administrator can update an order');
});

// Deletes an order
const deleteOrder = asyncHandler(async (req, res) => {
	const existingOrder = await Order.findById(req.params.id);
	if (!existingOrder) return res.status(404).json('Order not found');

	if (req.user.isAdmin) {
		await Order.findByIdAndDelete(req.params.id);
		res.status(200).json('Deleted order');
	} else res.status(403).json('Only an administrator can delete an order');
});

// Stripe checkout an order
const checkoutOrder = asyncHandler(async (req, res) => {
	const {userId, totalPrice} = req.body;

	const paymentIntent = await stripe.paymentIntents.create({
		amount: Math.round(totalPrice * 100), // totalPrice comes in as a decimal (e.g. 100.00), but the amount for stripe has to be without decimals (viz. 100.00 should be 10000)
		currency: 'usd',
		automatic_payment_methods: {
			enabled: true
		}
	});

	if (req.user.id === userId || req.user.isAdmin) {
		res.send({clientSecret: paymentIntent.client_secret});
	} else res.status(401).json("Only an administrator or the order's user can get this order");
});

module.exports = {createOrder, getOneOrder, getAllOrders, updateOrder, deleteOrder, checkoutOrder};
