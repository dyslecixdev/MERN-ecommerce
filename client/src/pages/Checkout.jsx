import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import {Box, Stepper, Step, StepLabel, Button, Typography, Paper, Divider} from '@mui/material';
import {Remove, Add, Delete} from '@mui/icons-material';

import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';

import {incrementProduct, decrementProduct, removeProduct} from '../redux/cartRedux';

const steps = ['Login', 'ConfirmProducts', 'Shipping Details', 'Payment Details', 'Place Order'];

function Checkout() {
	const user = useSelector(state => state.user.currentUser);
	const cart = useSelector(state => state.cart);
	const dispatch = useDispatch();

	const [activeStep, setActiveStep] = useState(0);

	// Allows the Next button to move to the next step
	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	// Allows the Back button to move to the previous step
	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	// Increments a product's quantity by 1
	const handleIncrementProduct = (_id, price, size, color) => {
		dispatch(incrementProduct({_id, price, size, color}));
	};

	// Decrements a product's quantity by 1
	const handleDecrementProduct = (_id, price, size, color, quantity) => {
		console.log(quantity);
		if (quantity > 1) dispatch(decrementProduct({_id, price, size, color}));
		else handleRemoveFromCart(_id, price, size, color, quantity);
	};

	// Removes all copies of a product from the cart
	const handleRemoveFromCart = (_id, price, size, color, quantity) => {
		dispatch(removeProduct({_id, price, size, color, quantity}));
	};

	return (
		<>
			<Box sx={{width: '100%'}}>
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
				{activeStep === 1 && !user && (
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
						<Typography variant='h4'>Uh oh! You are not logged in.</Typography>
						<Typography variant='h4'>
							Click{' '}
							<Link to='/login' style={{textDecoration: 'none'}}>
								here
							</Link>{' '}
							to log in.
						</Typography>
					</Box>
				)}
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
							<Link to='/products/clothing' style={{textDecoration: 'none'}}>
								here
							</Link>
							.
						</Typography>
					</Box>
				)}

				{/* Shipping step 3 */}
				{activeStep === 2 && (
					<Box
						sx={{
							minHeight: '58vh',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Typography>Shipping</Typography>
					</Box>
				)}
				{activeStep === 2 && !user && (
					<Box
						sx={{
							minHeight: '58vh',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Typography>Go back and login.</Typography>
					</Box>
				)}

				{/* Payment step 4 */}
				{activeStep === 3 && (
					<Box
						sx={{
							minHeight: '58vh',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Typography>Payment</Typography>
					</Box>
				)}
				{activeStep === 3 && !user && (
					<Box
						sx={{
							minHeight: '58vh',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Typography>Go back and login.</Typography>
					</Box>
				)}

				{/* Checkout step 5 */}
				{activeStep === 4 && (
					<Box
						sx={{
							minHeight: '58vh',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Typography>Checkout</Typography>
					</Box>
				)}
				{activeStep === 4 && !user && (
					<Box
						sx={{
							minHeight: '58vh',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Typography>Go back and login.</Typography>
					</Box>
				)}

				{/* Confirm order page */}
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
						<Button disabled={!user} onClick={handleNext}>
							{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
						</Button>
					</Box>
				)}
			</Box>

			<Footer />
		</>
	);
}

export default Checkout;
