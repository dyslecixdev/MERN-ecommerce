import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import {Typography, Box} from '@mui/material';

import axios from 'axios';

import OrderCard from '../components/OrderCard';

function Orders() {
	const user = useSelector(state => state.user.currentUser);

	const [orders, setOrders] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(`http://localhost:5000/orders?category=${user.id}`, {
					headers: {
						Authorization: 'Bearer ' + user.token
					}
				});
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
						/>
					))}
				</Box>
			) : (
				<Box
					sx={{
						height: '50vh',
						padding: '1rem 0',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Typography variant='h4'>Sorry, but you currently have no orders.</Typography>
				</Box>
			)}
		</div>
	);
}

export default Orders;
