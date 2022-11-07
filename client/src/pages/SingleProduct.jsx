// todo Make page responsive

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
	TextField,
	Avatar
} from '@mui/material';
import {ShoppingCart} from '@mui/icons-material';

import axios from 'axios';

import {addProduct} from '../redux/cartRedux';

function SingleProduct() {
	const user = useSelector(state => state.user.currentUser);
	const productId = useParams();
	const dispatch = useDispatch();

	const [product, setProduct] = useState([]);
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
	const [errorMessage, setErrorMessage] = useState('');

	const [size, setSize] = useState('');
	const [color, setColor] = useState('');
	const [quantity, setQuantity] = useState('');

	const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	// Gets one product from MongoDB
	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(`http://localhost:5000/products/${productId.id}`);
				setProduct(res.data);
			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
	}, [productId, product.rating]);

	// Second useEffect to seperate the data from the product object because it is still being fetched in the above useEffect
	useEffect(() => {
		if (product.rating) setRating(product.rating);
		if (product.price) setProductPrice(product.price);
		if (product.size) setProductSize(product.size);
		if (product.color) setProductColor(product.color);
		if (product.reviews) setProductReviews(product.reviews);
	}, [product.rating, product.price, product.size, product.color, product.reviews]);

	// Adds a product to the cart
	const handleAddToCart = () => {
		if (size && color && quantity > 0)
			dispatch(addProduct({...product, size, color, quantity}));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			console.log('Submit');
		} catch (err) {
			setErrorMessage(err.response.data);
		}
	};

	return (
		<div style={{width: '98.5vw', padding: '0 1rem 2rem'}}>
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
				<Avatar
					src={`http://localhost:5000/static/${product.image}`}
					alt={product.name}
					variant='rounded'
					sx={{
						width: {xs: '100%', lg: '50%'},
						height: '90vh',
						padding: '2rem',
						background: '#DBE2FF'
						// bug Sometimes the image is cut off
					}}
				/>

				{/* Product details */}
				<Container sx={{width: {xs: '100%', lg: '50%'}}}>
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
							<ListItem divider sx={{overflowWrap: 'break-word'}}>
								<ListItemText
									primary={`Description: ${product.desc}`}
									primaryTypographyProps={{fontSize: '1.5rem'}}
								/>
							</ListItem>
							<ListItem divider sx={{display: 'flex', alignItems: 'center'}}>
								<Rating value={rating} readOnly sx={{marginRight: '1rem'}} />
								<ListItemText
									primary={`${product.numReviews} Reviews`}
									primaryTypographyProps={{fontSize: '1.5rem'}}
								/>
							</ListItem>
							<ListItem divider>
								<ListItemText
									primary={`Price: $${productPrice.toFixed(2)}`}
									primaryTypographyProps={{fontSize: '1.5rem'}}
								/>
							</ListItem>
						</List>
					</Stack>

					{/* Product size, color, and quantity, and Cart button */}
					<Box
						sx={{
							height: '55px',
							marginTop: '0.5rem',
							display: 'flex',
							alignItems: 'flex-start',
							flexWrap: 'wrap'
						}}
					>
						<Box
							sx={{
								minWidth: 120,
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
								minWidth: 120,
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
						<Box sx={{minWidth: 120, marginRight: '1rem'}}>
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
							variant='contained'
							startIcon={<ShoppingCart />}
							sx={{height: '100%'}}
							onClick={handleAddToCart}
						>
							Add to Cart
						</Button>
					</Box>
				</Container>
			</Box>

			{/* Reviews */}
			<Container sx={{marginTop: '2rem'}}>
				<Typography variant='h3' component='div'>
					Reviews
				</Typography>
				<Divider />
				<Stack
					direction='column'
					justifyContent='flex-start'
					alignItems='stretch'
					spacing={0}
				>
					{productReviews.length !== 0 ? (
						productReviews.map((review, idx) => (
							<Paper key={idx} sx={{padding: '1rem', border: '1px solid black'}}>
								<Typography variant='h4'>{review.username}</Typography>
								<Rating value={review.userRating} readOnly />
								<Typography variant='h5'>Review's date</Typography>
								<Typography variant='h5'>{review.userReview}</Typography>
							</Paper>
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
								padding: '1rem',
								display: 'flex',
								flexDirection: 'column',
								gap: '1rem',
								border: '1px solid black'
							}}
						>
							{errorMessage && (
								<Typography color='error' sx={{textAlign: 'center'}}>
									{errorMessage}
								</Typography>
							)}
							<Rating
								size='large'
								value={rating}
								onChange={(e, newRating) => setRating(newRating)}
							/>
							<TextField
								label='Review'
								type='text'
								multiline
								rows={6}
								required
								value={review}
								onChange={e => setReview(e.target.value)}
							/>
							<Button
								type='submit'
								variant='contained'
								// disabled={isFetching}
								sx={{
									width: {xs: '100%', sm: '30%', md: '25%', lg: '20%'},
									background: '#DAA520',
									'&:hover': {background: '#E4BA4D'}
								}}
							>
								Publish
							</Button>
						</Paper>
					) : (
						<Paper
							sx={{marginTop: '1.5rem', padding: '1rem', border: '1px solid black'}}
						>
							<Typography variant='h6'>
								Please{' '}
								<Link to='/login' sx={{textDecoration: 'none'}}>
									Login
								</Link>{' '}
								to write a review
							</Typography>
						</Paper>
					)}
				</Stack>
			</Container>
		</div>
	);
}

export default SingleProduct;
