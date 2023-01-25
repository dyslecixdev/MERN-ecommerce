import {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import {
	Box,
	Container,
	Stack,
	List,
	ListItem,
	ListItemText,
	Rating,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Typography,
	Divider,
	Paper,
	TextField
} from '@mui/material';
import {ShoppingCart} from '@mui/icons-material';

import axios from 'axios';

import Review from '../components/Review';
import Footer from '../components/Footer';

import {addProduct} from '../redux/cartRedux';

function SingleProduct() {
	const user = useSelector(state => state.user.currentUser);
	const productId = useParams();
	const dispatch = useDispatch();

	const [product, setProduct] = useState([]);
	const [productRating, setProductRating] = useState(0);
	const [productPrice, setProductPrice] = useState(0);
	const [productSize, setProductSize] = useState(['', 'XS', 'S', 'M', 'L', 'XL']);
	const [productColor, setProductColor] = useState([
		'',
		'Pink',
		'Red',
		'Orange',
		'Yellow',
		'Green',
		'Blue',
		'Purple',
		'Black',
		'Gray',
		'White',
		'Brown'
	]);
	const [productReviews, setProductReviews] = useState([]);

	const [rating, setRating] = useState(0);
	const [review, setReview] = useState('');
	const [topErrorMessage, setTopErrorMessage] = useState('');
	const [botErrorMessage, setBotErrorMessage] = useState('');

	const [size, setSize] = useState('');
	const [color, setColor] = useState('');
	const [quantity, setQuantity] = useState('');

	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	// Gets one product from MongoDB
	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(
					`https://mern-e-commerce-backend.onrender.com/products/${productId.id}`
				);
				setProduct(res.data);
			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
	}, [productId, product.rating]);

	// Second useEffect to seperate the data from the product object because it is still being fetched in the above useEffect
	useEffect(() => {
		if (product.rating) setProductRating(product.rating);
		if (product.price) setProductPrice(product.price);
		if (product.size) setProductSize(product.size);
		if (product.color) setProductColor(product.color);
		if (product.reviews) setProductReviews(product.reviews);
	}, [
		product.rating,
		product.price,
		product.size,
		product.color,
		product.reviews,
		productReviews
	]);

	// Adds a product to the cart
	const handleAddToCart = () => {
		if (size && color && quantity > 0)
			dispatch(addProduct({...product, size, color, quantity}));
		else setTopErrorMessage('Color, size, and quantity required');
	};

	// Creates a review for the product
	const handleSubmit = async e => {
		e.preventDefault();
		try {
			await axios.put(
				`https://mern-e-commerce-backend.onrender.com/products/${productId.id}/reviews`,
				{userRating: rating, userReview: review},
				{headers: {Authorization: 'Bearer ' + user.token}}
			);
			window.location.reload(false); // Reloads the window to update the information on the page
		} catch (err) {
			setBotErrorMessage(err.response.data);
		}
	};

	return (
		<>
			<div style={{width: '98.5vw', padding: '0 1rem'}}>
				<Box
					sx={{
						width: '100%',
						marginBottom: {xs: '6rem', lg: 'none'},
						display: 'flex',
						flexDirection: {xs: 'column', lg: 'row'},
						alignItems: {xs: 'center', lg: 'flex-start'}
					}}
				>
					{/* Product image */}
					<img
						src={`https://mern-e-commerce-backend.onrender.com/static/${product.image}`}
						alt={product.name}
						style={{
							width: '100%',
							maxHeight: '88vh',
							padding: '2rem',
							objectFit: 'contain',
							borderRadius: '5px'
						}}
					/>

					{/* Product details */}
					<Container
						sx={{
							width: {xs: '100%', lg: '50%'},
							paddingBottom: '1rem',
							background: 'white',
							borderRadius: '5px',
							boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.5)'
						}}
					>
						<Stack
							direction='column'
							justifyContent='flex-start'
							alignItems='stretch'
							spacing={0.5}
						>
							<List>
								<ListItem divider>
									<ListItemText
										primary={`Product: ${product.name}`}
										primaryTypographyProps={{fontSize: '2rem'}} // Used to change ListItemText's font-size
									/>
								</ListItem>
								<ListItem divider>
									<ListItemText
										primary={`Price: $${productPrice.toFixed(2)}`}
										primaryTypographyProps={{fontSize: '1.5rem'}}
									/>
								</ListItem>
								<ListItem divider sx={{display: 'flex', alignItems: 'center'}}>
									<Rating
										precision={0.1}
										value={productRating}
										readOnly
										sx={{marginRight: '1rem'}}
									/>
									<ListItemText
										primary={`${product.numReviews} Review(s)`}
										primaryTypographyProps={{fontSize: '1.5rem'}}
									/>
								</ListItem>
								<ListItem divider sx={{overflowWrap: 'break-word'}}>
									<ListItemText
										primary={`Description: ${product.desc}`}
										primaryTypographyProps={{fontSize: '1.5rem'}}
									/>
								</ListItem>
							</List>
						</Stack>

						{/* Product size, color, and quantity, and Cart button */}
						{topErrorMessage && (
							<Typography color='error' sx={{textAlign: 'center'}}>
								{topErrorMessage}
							</Typography>
						)}
						<Box
							sx={{
								minHeight: '55px',
								marginTop: '0.5rem',
								display: 'flex',
								alignItems: 'flex-start',
								flexWrap: 'wrap'
							}}
						>
							<Box
								sx={{
									width: 100,
									marginRight: '1rem',
									marginBottom: {xs: '1rem', lg: 'none'}
								}}
							>
								<FormControl fullWidth>
									<InputLabel>Size</InputLabel>
									<Select
										value={size}
										label='Size'
										onChange={e => setSize(e.target.value)}
									>
										{productSize.map((size, idx) => (
											<MenuItem key={idx} value={size}>
												{size}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>
							<Box
								sx={{
									width: 100,
									marginRight: '1rem',
									marginBottom: {xs: '1rem', lg: 'none'}
								}}
							>
								<FormControl fullWidth>
									<InputLabel>Color</InputLabel>
									<Select
										value={color}
										label='Color'
										onChange={e => setColor(e.target.value)}
									>
										{productColor.map((color, idx) => (
											<MenuItem key={idx} value={color}>
												{color}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>
							<Box sx={{width: 100, marginRight: '1rem'}}>
								<FormControl fullWidth>
									<InputLabel>Quantity</InputLabel>
									<Select
										value={quantity}
										label='Quantity'
										onChange={e => setQuantity(e.target.value)}
									>
										{numbers.map((number, idx) => (
											<MenuItem key={idx} value={number}>
												{number}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>
							<Button
								variant='outlined'
								startIcon={<ShoppingCart />}
								color='secondary'
								sx={{
									minHeight: '50px'
								}}
								onClick={handleAddToCart}
							>
								Add to Cart
							</Button>
						</Box>
					</Container>
				</Box>

				{/* Reviews */}
				<Container sx={{marginTop: '2rem'}}>
					<Divider />
					<Stack
						direction='column'
						justifyContent='flex-start'
						alignItems='stretch'
						spacing={0}
					>
						{productReviews.length !== 0 ? (
							productReviews.map((review, idx) => (
								<Review key={idx} review={review} />
							))
						) : (
							<Paper sx={{padding: '1rem', border: '1px solid black'}}>
								<Typography variant='h5'>
									There are no reviews for this product.
								</Typography>
							</Paper>
						)}

						{/* Review form */}
						{user ? (
							<Paper
								elevation={3}
								component='form'
								onSubmit={handleSubmit}
								sx={{
									marginTop: '1.5rem',
									marginBottom: '2rem',
									padding: '1rem',
									display: 'flex',
									flexDirection: 'column',
									gap: '1rem',
									border: '1px solid black'
								}}
							>
								{botErrorMessage && (
									<Typography color='error' sx={{textAlign: 'center'}}>
										{botErrorMessage}
									</Typography>
								)}
								<Rating
									size='large'
									value={rating}
									onChange={(e, newRating) => setRating(newRating)}
								/>
								<TextField
									label='Write a review'
									type='text'
									multiline
									rows={6}
									required
									value={review}
									onChange={e => setReview(e.target.value)}
								/>
								<Button
									type='submit'
									variant='outlined'
									color='secondary'
									sx={{
										width: {xs: '100%', sm: '30%', md: '25%', lg: '20%'}
									}}
								>
									Publish
								</Button>
							</Paper>
						) : (
							<Paper
								sx={{
									marginTop: '1.5rem',
									marginBottom: '2rem',
									padding: '1rem',
									border: '1px solid black'
								}}
							>
								<Typography variant='h6'>
									Please{' '}
									<Typography
										variant='h6'
										component={Link}
										to='/login'
										sx={{textDecoration: 'none', color: '#CD32CD'}}
									>
										Login
									</Typography>{' '}
									to write a review
								</Typography>
							</Paper>
						)}
					</Stack>
				</Container>
			</div>

			<Footer />
		</>
	);
}

export default SingleProduct;
