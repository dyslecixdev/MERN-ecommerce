const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');

// Creates a cart for the logged in user
const createCart = asyncHandler(async (req, res) => {
	const {userId, cart} = req.body;
	const {products, quantity, totalPrice} = cart;

	const existingCart = await Cart.findOne({userId});
	let updatedCart;
	let newCart;

	if (existingCart) {
		updatedCart = await Cart.findOneAndUpdate(
			{userId},
			{
				$push: {products}, // $set overwrites the value while $push adds values
				// $inc increases the value's number
				$inc: {
					quantity,
					totalPrice
				}
			},
			{new: true}
		);
	} else
		newCart = await Cart.create({
			userId,
			products: products.length > 0 ? products : [],
			quantity: quantity > 0 ? quantity : 0,
			totalPrice: totalPrice > 0 ? totalPrice : 0
		});

	if (updatedCart) res.status(201).json(updatedCart);
	else if (newCart) res.status(201).json(newCart);
	else res.status(400).json('Invalid cart data');
});

// ! Not sure if below methods work correctly
// Gets the logged in user's cart
const getCart = asyncHandler(async (req, res) => {
	const existingCart = await Cart.findOne({userId: req.user.id});
	if (!existingCart) {
		res.status(401).json('Cart not found');
		return;
	}

	res.status(200).json(existingCart);
});

// Gets all the users' carts
const getAllCarts = asyncHandler(async (req, res) => {
	const existingCarts = await Cart.find();
	if (!existingCarts) {
		res.status(404).json('Carts not found');
		return;
	}

	if (req.user.isAdmin) res.status(200).json(existingCarts);
	else res.status(403).json("Only an administrator can get all the users' carts");
});

// Updates the logged in user's cart
const updateCart = asyncHandler(async (req, res) => {
	const existingCart = await Cart.findOne({userId: req.user.id});
	if (!existingCart) {
		res.status(404).json('Cart not found');
		return;
	}

	try {
		const updatedCart = await Cart.updateOne(
			{userId: req.user.id},
			{$set: req.body},
			{new: true}
		);
		res.status(201).json(updatedCart);
	} catch (err) {
		console.log(err.message.white.bgRed);
		res.status(400).json('Invalid updated cart data');
	}
});

// Deletes the logged in user's cart
const deleteCart = asyncHandler(async (req, res) => {
	try {
		await Cart.findByIdAndDelete(req.params.id);
		res.status(200).json('Cart has been deleted...');
	} catch (err) {
		res.status(500).json(err);
	}

	const existingCart = await Cart.findOne({userId: req.user.id});
	if (!existingCart) {
		res.status(404).json('Cart not found');
		return;
	} else {
		await Cart.deleteOne({userId: req.user.id});
		res.status(200).json('Deleted cart');
	}
});

module.exports = {createCart, getCart, getAllCarts, updateCart, deleteCart};
