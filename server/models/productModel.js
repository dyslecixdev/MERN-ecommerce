const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
	{
		userName: {
			type: String,
			required: true
		},
		userId: {
			type: String,
			required: true
		},
		userRating: {
			type: Number,
			required: true
		},
		userReview: {
			type: String,
			required: true
		}
	},
	{timestamps: true}
);

const productSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true
		},
		desc: {
			type: String,
			required: true
		},
		rating: {
			type: Number,
			required: true
		},
		price: {
			type: Number,
			required: true
		},
		image: {
			type: String,
			required: true,
			unique: true
		},
		category: {
			type: Array,
			required: true
		},
		size: {
			type: Array,
			required: true
		},
		color: {
			type: Array,
			required: true
		},
		countInStock: {
			type: Number,
			required: true
		},
		numReviews: {
			type: Number,
			required: true
		},
		reviews: [reviewSchema]
	},
	{timestamps: true}
);

module.exports = mongoose.model('Product', productSchema);
