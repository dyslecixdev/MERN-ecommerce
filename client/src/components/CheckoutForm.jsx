import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {Paper, Button} from '@mui/material';

import axios from 'axios';

import {PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js';

import {emptyCart} from '../redux/cartRedux';

function CheckoutForm({address}) {
	const user = useSelector(state => state.user.currentUser);
	const cart = useSelector(state => state.cart);
	const dispatch = useDispatch();

	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	// Whenever stripe changes, uses the switch statement for each case in the payment process
	useEffect(() => {
		if (!stripe) return;
		const clientSecret = new URLSearchParams(window.location.search).get(
			'payment_intent_client_secret'
		);
		if (!clientSecret) return;
		stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
			switch (paymentIntent.status) {
				case 'succeeded':
					setMessage('Payment succeeded!');
					break;
				case 'processing':
					setMessage('Your payment is processing.');
					break;
				case 'requires_payment_method':
					setMessage('Your payment was not successful, please try again.');
					break;
				default:
					setMessage('Something went wrong.');
					break;
			}
		});
	}, [stripe]);

	// Creates an order, empties the cart, then approves or denies the card transaction
	const handleSubmit = async e => {
		e.preventDefault();
		if (!stripe || !elements) return;
		setIsLoading(true);

		try {
			await axios.post(
				'https://mern-e-commerce-backend.onrender.com/orders',
				{
					products: cart.products,
					address,
					totalPrice: cart.totalPrice
				},
				{
					headers: {
						Authorization: 'Bearer ' + user.token
					}
				}
			);
			dispatch(emptyCart());
			const {error} = await stripe.confirmPayment({
				elements,
				confirmParams: {
					return_url: 'https://mern-e-commerce-frontend.onrender.com/orders'
				}
			});
			if (error.type === 'card_error' || error.type === 'validation_error')
				setMessage(error.message);
			else setMessage('An unexpected error occurred.');
		} catch (err) {
			console.log(err);
		}

		setIsLoading(false);
	};

	const paymentElementOptions = {
		layout: 'tabs'
	};

	return (
		<Paper
			component='form'
			onSubmit={handleSubmit}
			elevation={3}
			sx={{
				width: {
					xs: '100%',
					sm: '90%',
					md: '75%',
					lg: '50%',
					xl: '40%'
				},
				padding: '1rem',
				display: 'flex',
				flexDirection: 'column',
				gap: '2rem',
				background: '#F1F1F1'
			}}
		>
			<PaymentElement options={paymentElementOptions} />
			<Button
				type='submit'
				variant='outlined'
				color='secondary'
				disabled={isLoading || !stripe || !elements}
			>
				{isLoading ? <div className='spinner' id='spinner'></div> : 'Complete Order'}
			</Button>
			{message && <div id='payment-message'>{message}</div>}
		</Paper>
	);
}

export default CheckoutForm;
