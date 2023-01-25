import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {Box} from '@mui/material';

import axios from 'axios';

import RecieptCard from '../components/ReceiptCard';
import Footer from '../components/Footer';

function SingleOrder() {
	const user = useSelector(state => state.user.currentUser);
	const orderId = useParams();

	const [products, setProducts] = useState([]);

	// Gets one order from MongoDB
	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(
					`https://mern-e-commerce-backend.onrender.com/orders/${orderId.id}`,
					{
						headers: {
							Authorization: 'Bearer ' + user.token
						}
					}
				);
				setProducts(res.data.products);
			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
	}, [orderId, user.token]);

	return (
		<>
			<Box sx={{minHeight: '61vh'}}>
				<Box
					sx={{
						width: {xs: '100%', sm: '80%', md: '60%', lg: '40%'},
						margin: 'auto',
						border: '1px solid black'
					}}
				>
					{products.map(product => (
						<RecieptCard key={product._id} productData={product} />
					))}
				</Box>
			</Box>

			<Footer />
		</>
	);
}

export default SingleOrder;
