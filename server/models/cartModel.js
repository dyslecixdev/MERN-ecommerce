const mongoose = require('mongoose');

const cartSchema = mongoose.Schema(
	{
		userId: {
			type: String,
			required: true
		},
		products: [
			{
				_id: {
					type: String
				},
				name: {
					type: String
				},
				quantity: {
					type: Number
				}
			}
		],
		quantity: {
			type: Number,
			required: true
		},
		totalPrice: {
			type: Number,
			required: true
		}
	},
	{timestamps: true}
);

module.exports = mongoose.model('Cart', cartSchema);
