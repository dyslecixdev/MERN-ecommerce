import {Link} from 'react-router-dom';

import {Card, CardMedia, CardContent, Typography, CardActions, Button, Rating} from '@mui/material';

function ProductCard({productData}) {
	return (
		<Card sx={{width: 310, margin: '1rem 0', padding: '1rem'}}>
			<CardMedia
				component='img'
				image={`https://mern-e-commerce-backend.onrender.com/static/${productData.image}`}
				alt={productData.name}
				sx={{height: 200, objectFit: 'contain'}}
			/>
			<CardContent>
				<Typography gutterBottom variant='h5' component='div'>
					{productData.name}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					${productData.price.toFixed(2)}
				</Typography>
				<Rating name='read-only' value={productData.rating} readOnly />
				<Typography
					variant='body2'
					color='text.secondary'
					// Limits the description to two lines of text
					sx={{
						display: '-webkit-box',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical'
					}}
				>
					{productData.desc}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					variant='outlined'
					size='small'
					color='secondary'
					component={Link}
					to={`/product/${productData._id}`}
				>
					Learn More
				</Button>
			</CardActions>
		</Card>
	);
}

export default ProductCard;
