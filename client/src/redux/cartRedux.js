import {createSlice} from '@reduxjs/toolkit';

// bug Cart persists between all users and non-users
const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		products: [],
		quantity: 0,
		totalPrice: 0
	},
	reducers: {
		addProduct: (state, action) => {
			const productToModify = state.products.find(
				product =>
					product._id === action.payload._id &&
					product.size === action.payload.size &&
					product.color === action.payload.color
			); // Checks to see if you previously added a product with the same size and color

			// If you previously added the product, change its object's quantity, and the state's quantity and totalPrice
			if (productToModify) {
				const cartState = state.products.filter(
					product =>
						product._id !== action.payload._id &&
						product.size !== action.payload.size &&
						product.color !== action.payload.color
				);
				productToModify.quantity += action.payload.quantity;
				cartState.push(productToModify);
				state.quantity += action.payload.quantity;
				state.totalPrice += action.payload.price * action.payload.quantity;
			}
			// Otherwise add a new product object
			else {
				state.products.push(action.payload);
				state.quantity += action.payload.quantity;
				state.totalPrice += action.payload.price * action.payload.quantity;
			}
		},
		incrementProduct: (state, action) => {
			const productToModify = state.products.find(
				product =>
					product._id === action.payload._id &&
					product.size === action.payload.size &&
					product.color === action.payload.color
			);

			if (productToModify) {
				const cartState = state.products.filter(
					product =>
						product._id !== action.payload._id &&
						product.size !== action.payload.size &&
						product.color !== action.payload.color
				);
				productToModify.quantity += 1;
				cartState.push(productToModify);
				state.quantity += 1;
				state.totalPrice += action.payload.price * 1;
			} else console.log('Product does not exist');
		},
		decrementProduct: (state, action) => {
			const productToModify = state.products.find(
				product =>
					product._id === action.payload._id &&
					product.size === action.payload.size &&
					product.color === action.payload.color
			);

			if (productToModify) {
				const cartState = state.products.filter(
					product =>
						product._id !== action.payload._id &&
						product.size !== action.payload.size &&
						product.color !== action.payload.color
				);
				productToModify.quantity -= 1;
				state.quantity -= 1;
				state.totalPrice -= action.payload.price * 1;
				cartState.push(productToModify);
			} else console.log('Product does not exist');
		},
		removeProduct: (state, action) => {
			const cartWithoutProduct = state.products.filter(
				product =>
					!(
						product._id === action.payload._id &&
						product.size === action.payload.size &&
						product.color === action.payload.color
					)
			); // Returns a new array while filtering out the object that matches the product's id, size, and color
			state.products = cartWithoutProduct;
			state.quantity -= action.payload.quantity;
			// state.totalPrice = 0;
			if (state.products.length > 0)
				state.totalPrice -= action.payload.price * action.payload.quantity;
			else state.totalPrice = 0;
		},
		logoutUser: state => {
			state.products = [];
			state.quantity = 0;
			state.totalPrice = 0;
		}
	}
});

export const {addProduct, incrementProduct, decrementProduct, removeProduct, logoutUser} =
	cartSlice.actions;

export default cartSlice.reducer;
