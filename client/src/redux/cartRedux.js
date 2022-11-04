import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		products: [],
		quantity: 0,
		totalPrice: 0
	},
	reducers: {
		addProduct: (state, action) => {
			state.products.push(action.payload);
			state.quantity += 1;
			state.totalPrice += action.payload.price * action.payload.quantity;
		}
	}
});

export const {addProduct} = cartSlice.actions;

export default cartSlice.reducer;
