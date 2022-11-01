import {Link} from 'react-router-dom';

import {Card, CardMedia, CardContent, Typography, CardActions, Button} from '@mui/material';

function ProductCard() {
	return (
		<Card sx={{width: 300, margin: '1rem 0', background: '#DBE2FF'}}>
			<CardMedia
				component='img'
				image='https://cdn11.bigcommerce.com/s-3vdgh6wtox/images/stencil/650x650/products/146/1767/50500-901__18401.1646928274.png?c=3'
				alt='product name'
				sx={{height: 200, objectFit: 'contain'}}
			/>
			<CardContent>
				<Typography gutterBottom variant='h5' component='div'>
					Rancher Cap
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
					For those seriously cold conditions, you need a serious hat. So we took all the
					goodness of the Original and added an extra long, fleece-lined earband and
					Thinsulate™ insulation in the crown. Whether you're shoveling snow, ice fishing,
					or walking from your office to the car, you'll thank your Rancher.
				</Typography>
			</CardContent>
			<CardActions>
				<Button variant='outlined' size='small'>
					Add to Cart
				</Button>
				<Button variant='outlined' size='small' component={Link} to='/product/rancher-hat'>
					Learn More
				</Button>
			</CardActions>
		</Card>
	);
}

export default ProductCard;
