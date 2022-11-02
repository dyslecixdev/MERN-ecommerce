import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

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
	Paper
} from '@mui/material';
import {ShoppingCart} from '@mui/icons-material';

function SingleProduct() {
	const user = useSelector(state => state.user.currentUser);

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

	return (
		<div style={{padding: '0 1rem 2rem'}}>
			<Box sx={{display: 'flex'}}>
				{/* Product image */}
				<img
					src='https://cdn11.bigcommerce.com/s-3vdgh6wtox/images/stencil/650x650/products/146/1767/50500-901__18401.1646928274.png?c=3'
					alt='product name'
					style={{width: '50%'}}
				/>

				{/* Product details */}
				<Container sx={{width: '50%'}}>
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
									primary='Description: VERY LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG PRODUCT DESCRIPTION'
									primaryTypographyProps={{fontSize: '2rem'}}
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
							alignItems: 'center'
						}}
					>
						<Box sx={{minWidth: 120, marginRight: '1rem'}}>
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
						<Box sx={{minWidth: 120, marginRight: '1rem'}}>
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
			<Divider />

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
						// todo
						<Paper
							sx={{marginTop: '1.5rem', padding: '1rem', border: '1px solid black'}}
						>
							<Typography variant='h5'>Write a Customer Review</Typography>
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
