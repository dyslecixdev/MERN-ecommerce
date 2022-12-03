import {Box, Typography, Divider, Card, CardContent, CardMedia} from '@mui/material';

function ReceiptCard({productData}) {
	return (
		<>
			<Card sx={{padding: '1rem', display: 'flex', borderRadius: 'none'}} elevation={0}>
				<Box
					sx={{
						width: {xs: '40%', sm: '70%'},
						display: 'flex',
						flexDirection: 'column'
					}}
				>
					<CardContent sx={{flex: '1 0 auto'}}>
						<Typography component='div' variant='h5'>
							{productData.name}
						</Typography>
						<Typography variant='subtitle1' color='text.secondary' component='div'>
							${productData.price}
						</Typography>
						<Typography variant='body2' color='text.secondary'>
							Color: {productData.color}
						</Typography>
						<Typography variant='body2' color='text.secondary'>
							Size: {productData.size}
						</Typography>
						<Typography variant='body2' color='text.secondary'>
							Quantity: {productData.quantity}
						</Typography>
					</CardContent>
				</Box>
				<CardMedia
					component='img'
					sx={{width: {xs: '60%', sm: '30%'}}}
					image={`http://localhost:5000/static/${productData.image}`}
					alt={productData.name}
				/>
			</Card>

			<Divider />
		</>
	);
}

export default ReceiptCard;
