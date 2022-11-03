// todo Make page responsive

import {useState} from 'react';
import {Link} from 'react-router-dom';
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

function SingleProduct() {
	const user = useSelector(state => state.user.currentUser);

	const [rating, setRating] = useState(0);
	const [review, setReview] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	// const dispatch = useDispatch();
	// const {isFetching} = useSelector(state => state.???);

	const [size, setSize] = useState('');
	const [color, setColor] = useState('');
	const [quantity, setQuantity] = useState('');

	const sizes = ['XS', 'S', 'M', 'L', 'XL'];
	const colors = [
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
	];
	const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	const handleSubmit = async e => {
		e.preventDefault();
		console.log('Submit');
	};

	return (
		<div style={{width: '100vw', padding: '0 1rem 2rem'}}>
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
					src='https://cdn11.bigcommerce.com/s-3vdgh6wtox/images/stencil/650x650/products/146/1767/50500-901__18401.1646928274.png?c=3'
					alt='product name'
					variant='rounded'
					sx={{
						width: {xs: '100%', lg: '50%'},
						height: '100%',
						padding: '2rem',
						background: '#DBE2FF'
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
									primary='Product: PRODUCT NAME'
									primaryTypographyProps={{fontSize: '2rem'}} // Used to change ListItemText's font-size
								/>
							</ListItem>
							<ListItem divider sx={{overflowWrap: 'break-word'}}>
								<ListItemText
									primary='Description: VERY LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG PRODUCT DESCRIPTION'
									primaryTypographyProps={{fontSize: '1.5rem'}}
								/>
							</ListItem>
							<ListItem divider sx={{display: 'flex', alignItems: 'center'}}>
								<Rating value={2} readOnly sx={{marginRight: '1rem'}} />
								<ListItemText
									primary='10 Reviews'
									primaryTypographyProps={{fontSize: '1.5rem'}}
								/>
							</ListItem>
							<ListItem divider>
								<ListItemText
									primary='Price: PRODUCT PRICE'
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
							alignItems: 'center',
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
									{sizes.map((size, idx) => (
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
									{colors.map((color, idx) => (
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
					<Paper sx={{padding: '1rem', border: '1px solid black'}}>
						<Typography variant='h4'>User's name</Typography>
						<Rating value={2} readOnly />
						<Typography variant='h5'>Review's date</Typography>
						<Typography variant='h5'>Review's text</Typography>
					</Paper>
					<Paper sx={{padding: '1rem', border: '1px solid black'}}>
						<Typography variant='h4'>User's name</Typography>
						<Rating value={2} readOnly />
						<Typography variant='h5'>Review's date</Typography>
						<Typography variant='h5'>Review's text</Typography>
					</Paper>
					<Paper sx={{padding: '1rem', border: '1px solid black'}}>
						<Typography variant='h4'>User's name</Typography>
						<Rating value={2} readOnly />
						<Typography variant='h5'>Review's date</Typography>
						<Typography variant='h5'>Review's text</Typography>
					</Paper>

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