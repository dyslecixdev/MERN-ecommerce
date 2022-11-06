import {Link} from 'react-router-dom';

import {Card, CardMedia, CardContent, Typography, CardActions, Button} from '@mui/material';

function ProductCard({productData}) {
	return (
		<Card sx={{width: 310, margin: '1rem 0', padding: '1rem', background: '#DBE2FF'}}>
			<CardMedia
				component='img'
				image={`http://localhost:5000/static/${productData.image}`}
				alt={productData.name}
				sx={{height: 200, objectFit: 'contain'}}
			/>
			<CardContent>
				<Typography gutterBottom variant='h5' component='div'>
					{productData.name}
				</Typography>
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
			<CardActions sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
				<Button variant='outlined' size='small'>
					Add to Cart
				</Button>
				<Button
					variant='outlined'
					size='small'
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
