import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import {
	Box,
	Stepper,
	Step,
	StepLabel,
	Button,
	Typography,
	Paper,
	Divider,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem
} from '@mui/material';
import {Remove, Add, Delete} from '@mui/icons-material';

import axios from 'axios';

import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

import LoginForm from '../components/LoginForm';
import CheckoutLoginError from '../components/CheckoutLoginError';
import CheckoutForm from '../components/CheckoutForm';
import Footer from '../components/Footer';

import {incrementProduct, decrementProduct, removeProduct} from '../redux/cartRedux';

const steps = ['Login', 'Confirm Products', 'Shipping Details', 'Payment Details'];
const states = [
	'AL',
	'AK',
	'AZ',
	'AR',
	'CA',
	'CO',
	'CT',
	'DE',
	'FL',
	'GA',
	'HI',
	'ID',
	'IL',
	'IN',
	'IA',
	'KS',
	'KY',
	'LA',
	'ME',
	'MD',
	'MA',
	'MI',
	'MN',
	'MS',
	'MO',
	'MT',
	'NE',
	'NV',
	'NH',
	'NJ',
	'NM',
	'NY',
	'NC',
	'ND',
	'OH',
	'OK',
	'OR',
	'PA',
	'RI',
	'SC',
	'SD',
	'TN',
	'TX',
	'UT',
	'VT',
	'VA',
	'WA',
	'WV',
	'WI',
	'WY'
];
const stripePromise = loadStripe(
	'pk_test_51LPYFsAcIpIPNisxPRtQfYkq6Qze3auQWuq1AbUvhQYZ6QDB6qZKSICnn2kknJyHh2B9oHyuEbhZBeAGwFtZv7vv00csXKyoHf'
);
const appearance = {
	theme: 'stripe',
	variables: {
		colorPrimary: '#e10505',
		colorBackground: '#28ffff',
		colorText: '#757a43'
	}
};

function Checkout() {
	const user = useSelector(state => state.user.currentUser);
	const cart = useSelector(state => state.cart);
	const dispatch = useDispatch();

	const [street, setStreet] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zipCode, setZipCode] = useState('');

	const [activeStep, setActiveStep] = useState(0);

	const [clientSecret, setClientSecret] = useState('');

	const options = {
		clientSecret,
		appearance
	};

	// Uses stripe to checkout
	useEffect(() => {
		async function checkoutOrder() {
			try {
				const res = await axios.post(
					'http://localhost:5000/orders/checkout',
					{userId: user.id, totalPrice: cart.totalPrice},
					{
						headers: {
							Authorization: 'Bearer ' + user.token
						}
					}
				);
				setClientSecret(res.data.clientSecret);
			} catch (err) {
				console.log(err);
			}
		}
		checkoutOrder();
	}, [user, cart]);

	// Allows the Next button to move to the next step
	const handleNext = e => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	// Allows the Back button to move to the previous step
	const handleBack = () => {
		if (!user) setActiveStep(0);
		else setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	// Increments a product's quantity by 1
	const handleIncrementProduct = (_id, price, size, color) => {
		dispatch(incrementProduct({_id, price, size, color}));
	};

	// Decrements a product's quantity by 1
	const handleDecrementProduct = (_id, price, size, color, quantity) => {
		if (quantity > 1) dispatch(decrementProduct({_id, price, size, color}));
		else handleRemoveFromCart(_id, price, size, color, quantity);
	};

	// Removes all copies of a product from the cart
	const handleRemoveFromCart = (_id, price, size, color, quantity) => {
		dispatch(removeProduct({_id, price, size, color, quantity}));
	};

	return (
		<>
			<Box sx={{width: '100%', minHeight: '67vh'}}>
				{/* Top step progress */}
				<Stepper activeStep={activeStep}>
					{steps.map((label, index) => {
						const stepProps = {};
						const labelProps = {};
						return (
							<Step key={label} {...stepProps}>
								<StepLabel {...labelProps}>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>

				{/* Login step 1 */}
				{activeStep === 0 && !user && (
					<Box
						sx={{
							minHeight: '58vh',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<LoginForm />
					</Box>
				)}
				{activeStep === 0 && user && (
					<Box
						sx={{
							minHeight: '58vh',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '2rem'
						}}
					>
						<Typography variant='h4' component='div'>
							You are logged in.
						</Typography>
						<Typography variant='h4' component='div'>
							Please click Next to continue.
						</Typography>
					</Box>
				)}

				{/* Login step 2 */}
				{activeStep === 1 && user && cart.products.length > 0 && (
					<Box
						sx={{
							minHeight: '56.2vh',
							padding: '1rem 1rem 0',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'flex-start',
							gap: '2rem'
						}}
					>
						<Box
							sx={{
								minHeight: '56.2vh',
								flex: 3,
								padding: '1rem 1rem 0'
							}}
						>
							<Typography variant='h3' component='div' sx={{marginBottom: '1rem'}}>
								Products
							</Typography>
							<Box
								sx={{
									display: 'flex',
									flexWrap: 'wrap',
									justifyContent: {xs: 'center', sm: 'flex-start'},
									gap: '1rem'
								}}
							>
								{cart.products.map((product, idx) => (
									<Paper
										key={idx}
										sx={{
											width: 375,
											height: 300,
											marginBottom: '1rem',
											display: 'flex',
											background: '#DBE2FF'
										}}
									>
										<img
											src={`http://localhost:5000/static/${product.image}`}
											alt={product.name}
											style={{
												width: '60%',
												padding: '1rem',
												objectFit: 'contain'
											}}
										/>
										<Divider orientation='vertical' />
										<Box
											sx={{
												padding: '0 1rem',
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'space-evenly',
												alignItems: 'center'
											}}
										>
											<Typography>
												{product.size} {product.color} {product.name}
											</Typography>
											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
													gap: '0.5rem'
												}}
											>
												<Remove
													onClick={() =>
														handleDecrementProduct(
															product._id,
															product.price,
															product.size,
															product.color,
															product.quantity
														)
													}
													sx={{cursor: 'pointer'}}
												/>
												<Paper
													elevation={0}
													sx={{
														padding: '0.5rem',
														border: '1px solid black'
													}}
												>
													{product.quantity}
												</Paper>
												<Add
													onClick={() =>
														handleIncrementProduct(
															product._id,
															product.price,
															product.size,
															product.color
														)
													}
													sx={{cursor: 'pointer'}}
												/>
											</Box>
											<Delete
												onClick={() =>
													handleRemoveFromCart(
														product._id,
														product.price,
														product.size,
														product.color,
														product.quantity
													)
												}
												sx={{cursor: 'pointer'}}
											/>
										</Box>
									</Paper>
								))}
							</Box>
						</Box>
						<Box sx={{flex: 1, padding: '1rem', border: '1px solid black'}}>
							<Typography variant='h4' component='p'>
								Subtotal: ${cart.totalPrice.toFixed(2)}
							</Typography>
							<Divider sx={{marginBottom: '1rem'}} />
							<Typography variant='h5' component='p'>
								{cart.quantity} item(s)
							</Typography>
						</Box>
					</Box>
				)}
				{activeStep === 1 && !user && <CheckoutLoginError />}
				{activeStep === 1 && user && cart.products.length < 1 && (
					<Box
						sx={{
							minHeight: '58vh',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '2rem'
						}}
					>
						<Typography variant='h4' component='div'>
							You do not have any products in your cart
						</Typography>
						<Typography variant='h4' component='div'>
							Please add some{' '}
							<Link
								to='/products/clothing'
								style={{textDecoration: 'none', color: 'black'}}
							>
								here
							</Link>
							.
						</Typography>
					</Box>
				)}

				{/* Shipping step 3 */}
				{activeStep === 2 && user && (
					<Box
						sx={{
							minHeight: '58vh',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Paper
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
								gap: '2rem'
							}}
						>
							<TextField
								label='Address'
								type='text'
								value={street}
								onChange={e => setStreet(e.target.value)}
							/>
							<TextField
								label='City'
								type='text'
								value={city}
								onChange={e => setCity(e.target.value)}
							/>
							<Box sx={{minWidth: 120}}>
								<FormControl fullWidth>
									<InputLabel>State</InputLabel>
									<Select
										value={state}
										label='State'
										onChange={e => setState(e.target.value)}
									>
										{states.map((state, idx) => (
											<MenuItem key={idx} value={state}>
												{state}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>
							<TextField
								label='Zip Code'
								type='text'
								value={zipCode}
								onChange={e => setZipCode(e.target.value)}
							/>
						</Paper>
					</Box>
				)}
				{activeStep === 2 && !user && <CheckoutLoginError />}

				{/* Payment step 4 */}
				{activeStep === 3 && user && (
					<Box
						sx={{
							minHeight: '58vh',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						{clientSecret && (
							<Elements options={options} stripe={stripePromise}>
								<CheckoutForm
									address={`${street}, ${city}, ${state} ${zipCode} `}
								/>
							</Elements>
						)}
					</Box>
				)}
				{activeStep === 3 && !user && <CheckoutLoginError />}

				{/* Step buttons */}
				{activeStep === steps.length ? (
					<>
						<Box
							sx={{
								minHeight: '58vh',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<Typography>Order</Typography>
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'flex-end',
								pt: 2
							}}
						>
							<Button component={Link} to='/'>
								Home
							</Button>
						</Box>
					</>
				) : (
					<Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
						<Button
							color='inherit'
							disabled={activeStep === 0}
							onClick={handleBack}
							sx={{mr: 1}}
						>
							Back
						</Button>
						<Box sx={{flex: '1 1 auto'}} />
						<Button
							disabled={
								!user ||
								(activeStep === 2 && (!street || !city || !state || !zipCode)) ||
								activeStep === 3
							}
							onClick={handleNext}
						>
							{activeStep !== steps.length - 1 && 'Next'}
						</Button>
					</Box>
				)}
			</Box>

			<Footer />
		</>
	);
}

export default Checkout;
