import {Link} from 'react-router-dom';

import {Card, CardActions, CardMedia, CardContent, Typography, Button} from '@mui/material';

const months = [
	'',
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
];

function OrderCard({address, products, totalPrice, date, orderId}) {
	const month = months[date.split('T')[0].split('-')[1]];
	const day = date.split('T')[0].split('-')[2];
	const year = date.split('T')[0].split('-')[0];

	return (
		<Card sx={{maxWidth: 345}}>
			<CardMedia
				component='img'
				alt={products[0].name}
				image={`https://mern-e-commerce-backend.onrender.com/static/${products[0].image}`}
			/>
			<CardContent>
				<Typography gutterBottom variant='h5' component='div'>
					{month} {day}, {year}
				</Typography>
				<Typography gutterBottom variant='h6' component='div'>
					${totalPrice.toFixed(2)}
				</Typography>
				<Typography gutterBottom variant='h6' component='div'>
					{address}
				</Typography>
			</CardContent>
			<CardActions sx={{display: 'flex', justifyContent: 'center'}}>
				<Button size='small' color='secondary' component={Link} to={`/orders/${orderId}`}>
					View Ordered Products
				</Button>
			</CardActions>
		</Card>
	);
}

export default OrderCard;
