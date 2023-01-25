import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import {Typography, Box} from '@mui/material';

import axios from 'axios';

import OrderCard from '../components/OrderCard';
import Footer from '../components/Footer';

function Orders() {
	const user = useSelector(state => state.user.currentUser);

	const [orders, setOrders] = useState([]);
	console.log(orders);

	// Gets all orders that the user made
	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(
					`https://mern-e-commerce-backend.onrender.com/orders?category=${user.id}`,
					{
						headers: {
							Authorization: 'Bearer ' + user.token
						}
					}
				);
				setOrders(res.data);
			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
	}, [user]);

	return (
		<div>
			{/* Container to hold all Order cards */}
			{orders.length !== 0 ? (
				<Box
					sx={{
						padding: '1rem',
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: {xs: 'center', sm: 'flex-start'},
						gap: '1rem'
					}}
				>
					{orders.map(order => (
						<OrderCard
							key={order._id}
							address={order.address}
							products={order.products}
							totalPrice={order.totalPrice}
							date={order.createdAt}
							orderId={order._id}
						/>
					))}
				</Box>
			) : (
				<Box
					sx={{
						minHeight: '61vh',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Box
						sx={{
							padding: '1rem',
							background: 'white',
							borderRadius: '10px'
						}}
					>
						<Typography variant='h4'>
							Sorry, but you currently have no orders.
						</Typography>
					</Box>
				</Box>
			)}

			<Footer />
		</div>
	);
}

export default Orders;
