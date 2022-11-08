const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

// Creates product
const createProduct = asyncHandler(async (req, res) => {
	const {name, desc, price, category, size, color, countInStock} = req.body;

	const productExists = await Product.findOne({name});
	if (productExists) {
		res.status(409).json('Product already exists');
		return;
	}

	if (!name || !desc || !price || !category || !size || !color || !countInStock) {
		res.status(400).json(
			'Name, description, price, category, size, color, and stock count required'
		);
		return;
	}

	let filePath;
	if (req.file) {
		if (
			req.file.mimetype === 'image/png' ||
			req.file.mimetype === 'image/jpg' ||
			req.file.mimetype === 'image/jpeg' ||
			req.file.mimetype === 'image/webp'
		)
			filePath = req.file.filename;
		else res.status(409).json('The only accepted image files are .png, .jpg, and .jpeg');
	} else {
		res.status(400).json('Image required');
		return;
	}

	const newProduct = await Product.create({
		name,
		desc,
		rating: 0,
		price,
		image: filePath,
		category,
		size,
		color,
		countInStock,
		numReviews: 0,
		reviews: []
	});

	if (!req.user.isAdmin) {
		res.status(403).json('Only an administrator can create a product');
		return;
	}

	if (newProduct) res.status(201).json(newProduct);
	else res.status(400).json('Invalid product data');
});

// Gets one product
const getOneProduct = asyncHandler(async (req, res) => {
	const existingProduct = await Product.findById(req.params.id);
	if (!existingProduct) {
		res.status(401).json('Product not found');
		return;
	}

	res.status(200).json(existingProduct);
});

// Gets all the products
const getAllProducts = asyncHandler(async (req, res) => {
	const category = req.query.category;
	const size = req.query.size;
	const color = req.query.color;
	const filter = req.query.filter;

	// Each if-else statement handles a different combination of queries
	let existingProducts;
	if (category && size && color && filter === 'Price (Highest to Lowest)')
		existingProducts = await Product.find({category, size, color}).sort({
			price: -1
		});
	else if (category && size && color && filter === 'Price (Lowest to Highest)')
		existingProducts = await Product.find({category, size, color}).sort({
			price: 1
		});
	else if (category && size && color && filter === 'Rating (Highest to Lowest)')
		existingProducts = await Product.find({category, size, color}).sort({
			rating: -1
		});
	else if (category && size && color && filter === 'Rating (Lowest to Highest)')
		existingProducts = await Product.find({category, size, color}).sort({
			rating: 1
		});
	else if (category && size && filter === 'Price (Highest to Lowest)')
		existingProducts = await Product.find({category, size}).sort({
			price: -1
		});
	else if (category && size && filter === 'Price (Lowest to Highest)')
		existingProducts = await Product.find({category, size}).sort({
			price: 1
		});
	else if (category && color && filter === 'Price (Highest to Lowest)')
		existingProducts = await Product.find({category, color}).sort({
			price: -1
		});
	else if (category && color && filter === 'Price (Lowest to Highest)')
		existingProducts = await Product.find({category, color}).sort({
			price: 1
		});
	else if (category && size && filter === 'Rating (Highest to Lowest)')
		existingProducts = await Product.find({category, size}).sort({
			rating: -1
		});
	else if (category && size && filter === 'Rating (Lowest to Highest)')
		existingProducts = await Product.find({category, size}).sort({
			rating: 1
		});
	else if (category && color && filter === 'Rating (Highest to Lowest)')
		existingProducts = await Product.find({category, color}).sort({
			rating: -1
		});
	else if (category && color && filter === 'Rating (Lowest to Highest)')
		existingProducts = await Product.find({category, color}).sort({
			rating: 1
		});
	else if (category && size && color)
		existingProducts = await Product.find({category, size, color});
	else if (category && size) existingProducts = await Product.find({category, size});
	else if (category && color) existingProducts = await Product.find({category, color});
	else if (category && filter === 'Price (Highest to Lowest)')
		existingProducts = await Product.find({category}).sort({
			price: -1
		});
	else if (category && filter === 'Price (Lowest to Highest)')
		existingProducts = await Product.find({category}).sort({
			price: 1
		});
	else if (category && filter === 'Rating (Highest to Lowest)')
		existingProducts = await Product.find({category}).sort({
			rating: -1
		});
	else if (category && filter === 'Rating (Lowest to Highest)')
		existingProducts = await Product.find({category}).sort({
			rating: 1
		});
	else if (category) existingProducts = await Product.find({category});
	else if (size) existingProducts = await Product.find({size});
	else if (color) existingProducts = await Product.find({color});
	else if (filter === 'Price (Highest to Lowest)')
		existingProducts = await Product.find().sort({
			price: -1
		});
	else if (filter === 'Price (Lowest to Highest)')
		existingProducts = await Product.find().sort({
			price: 1
		});
	else if (filter === 'Rating (Highest to Lowest)')
		existingProducts = await Product.find().sort({
			rating: -1
		});
	else if (filter === 'Rating (Lowest to Highest)')
		existingProducts = await Product.find().sort({
			rating: 1
		});
	else existingProducts = await Product.find();

	res.status(200).json(existingProducts);
});

// Updates product
const updateProduct = asyncHandler(async (req, res) => {
	const existingProduct = await Product.findById(req.params.id);
	if (!existingProduct) {
		res.status(400).json('Product not found');
		return;
	}

	let filePath;
	if (req.file) {
		if (
			req.file.mimetype === 'image/png' ||
			req.file.mimetype === 'image/jpg' ||
			req.file.mimetype === 'image/jpeg' ||
			req.file.mimetype === 'image/webp'
		)
			filePath = req.file.filename;
		else res.status(409).json('The only accepted image files are .png, .jpg, and .jpeg');
	}

	let updatedProduct;
	try {
		updatedProduct = await Product.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
				image: filePath
			},
			{new: true}
		);
	} catch (err) {
		console.log(err.message.white.bgRed);
		res.status(400).json('Invalid updated product data');
	}

	if (req.user.isAdmin) res.status(201).json(updatedProduct);
	else res.status(403).json('Only an administrator can update a product');
});

// Deletes product
const deleteProduct = asyncHandler(async (req, res) => {
	const existingProduct = await Product.findById(req.params.id);
	if (!existingProduct) {
		res.status(404).json('Product not found');
		return;
	}

	if (req.user.isAdmin) {
		await Product.findByIdAndDelete(existingProduct);
		res.status(200).json('Deleted product');
	} else res.status(403).json('Only an administrator can delete a product');
});

// Creates review
const createReview = asyncHandler(async (req, res) => {
	const {userRating, userReview} = req.body;

	const existingProduct = await Product.findById(req.params.id);
	if (!existingProduct) {
		res.status(404).json('Product not found');
		return;
	}

	if (existingProduct.reviews.find(user => user.userId === req.user.id)) {
		res.status(409).json('You have already written a review for this product');
		return;
	}

	if (!userRating || !userReview) {
		res.status(400).json('Rating and review are required');
		return;
	}

	const newReview = {
		userName: `${req.user.firstName} ${req.user.lastName}`,
		userId: req.user.id,
		userRating,
		userReview
	};

	existingProduct.reviews.push(newReview); // Adds the newReview object to the reviews array
	existingProduct.rating =
		existingProduct.reviews.reduce((a, b) => b.userRating + a, 0) /
		existingProduct.reviews.length; // ! Updates the average rating of all the reviews' userRatings
	existingProduct.numReviews = existingProduct.reviews.length;

	const updatedProduct = await existingProduct.save(); // .save() in this case updates the document

	if (updatedProduct)
		res.status(201).json({
			review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
			rating: updatedProduct.rating,
			numReviews: updatedProduct.numReviews
		});
	else res.status(400).json('Invalid review data');
});
// PUT user edit review
// PUT user delete review

module.exports = {
	createProduct,
	getOneProduct,
	getAllProducts,
	updateProduct,
	deleteProduct,
	createReview
};
