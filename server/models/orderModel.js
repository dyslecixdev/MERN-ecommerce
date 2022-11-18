const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
	{
		userId: {
			type: String,
			required: true
		},
		products: [
			{
				_id: {
					type: String,
					required: true,
					unique: true
				},
				name: {
					type: String,
					required: true,
					unique: true
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
				size: {
					type: Array,
					required: true
				},
				color: {
					type: Array,
					required: true
				},
				quantity: {
					type: Number,
					default: 1
				}
			}
		],
		address: {
			type: String,
			required: true
		},
		payment: {
			cardNumer: {
				type: String,
				required: true
			},
			cardDate: {
				type: String,
				required: true
			},
			ccv: {
				type: String,
				required: true
			}
		},
		totalPrice: {
			type: Number,
			required: true
		}
	},
	{timestamps: true}
);

module.exports = mongoose.model('Order', orderSchema);
