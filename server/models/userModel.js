const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		// todo Change username to firstName and lastName
		firstName: {
			type: String,
			required: true,
			unique: true
		},
		lastName: {
			type: String,
			required: true,
			unique: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		confirmPassword: {
			type: String,
			required: true
		},
		isAdmin: {
			type: Boolean,
			default: false
		}
	},
	{timestamps: true}
);

module.exports = mongoose.model('User', userSchema);
