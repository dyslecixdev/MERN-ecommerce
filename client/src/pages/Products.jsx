import {useState} from 'react';
import {useParams} from 'react-router-dom';

import {Typography, Box, FormControl, InputLabel, Select, MenuItem} from '@mui/material';

import ProductCard from '../components/ProductCard';

function Items() {
	const catName = useParams();

	const [size, setSize] = useState(null);
	const [color, setColor] = useState(null);
	const [priceFilter, setPriceFilter] = useState(null);

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

	return (
		<div style={{padding: '0 1rem'}}>
			<Typography variant='h3' component='div' sx={{marginBottom: '2rem'}}>
				{catName.category.toUpperCase()}
			</Typography>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between'
				}}
			>
				{/* Filter Products */}
				<Box
					sx={{
						width: '25%',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					<Typography variant='h6' sx={{display: {xs: 'none', md: 'block'}}}>
						Filter Products:{' '}
					</Typography>
					<Box sx={{minWidth: 120}}>
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
					<Box sx={{minWidth: 120}}>
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
				</Box>

				{/* Sort Products */}
				<Box
					sx={{
						width: '16%',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					<Typography variant='h6' sx={{display: {xs: 'none', md: 'block'}}}>
						Sort Products:{' '}
					</Typography>
					<Box sx={{minWidth: 120}}>
						<FormControl fullWidth>
							<InputLabel>Price</InputLabel>
							<Select
								value={priceFilter}
								label='Price'
								onChange={e => setPriceFilter(e.target.value)}
							>
								<MenuItem value='Price (asc.)'>Price (asc.)</MenuItem>
								<MenuItem value='Price (desc.)'>Price (asc.)</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</Box>
			</Box>

			{/* Container to hold all Product cards */}
			<Box
				sx={{
					padding: '1rem 0',
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'space-between'
				}}
			>
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
			</Box>
		</div>
	);
}

export default Items;
