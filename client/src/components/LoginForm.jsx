import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {TextField, Button, Paper, Typography} from '@mui/material';

import axios from 'axios';

import {loginStart, loginSuccess, loginFailure} from '../redux/userRedux';

function LoginForm({route}) {
	// const cart = useSelector(state => state.cart);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	// const [userId, setUserId] = useState('example');

	const dispatch = useDispatch();
	const {isFetching} = useSelector(state => state.user);

	const navigate = useNavigate();

	// Executes two async functions
	const handleSubmit = async e => {
		await loginUser(e);
		// await createCart(e);
		if (route) navigate(route);
	};

	// Logs a user into the app
	const loginUser = async e => {
		e.preventDefault();
		dispatch(loginStart());
		try {
			const res = await axios.post('http://localhost:5000/users/login', {
				email,
				password
			});
			dispatch(loginSuccess(res.data));
		} catch (err) {
			setErrorMessage(err.response.data);
			dispatch(loginFailure());
		}
	};

	// bug Cannot get userId with setting useState
	// const createCart = async e => {
	// 	e.preventDefault();
	// 	try {
	// 		await axios.post('http://localhost:5000/carts', {userId, cart});
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	return (
		<Paper
			elevation={3}
			component='form'
			onSubmit={handleSubmit}
			sx={{
				width: {
					xs: '100%',
					sm: '90%',
					md: '75%',
					lg: '50%',
					xl: '40%'
				},
				padding: '1rem',
				display: 'flex',
				flexDirection: 'column',
				gap: '2rem'
			}}
		>
			{errorMessage && (
				<Typography color='error' sx={{textAlign: 'center'}}>
					{errorMessage}
				</Typography>
			)}
			<TextField
				label='Email'
				type='email'
				required
				value={email}
				onChange={e => setEmail(e.target.value)}
			/>
			<TextField
				label='Password'
				type='password'
				required
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<Button type='submit' variant='contained' disabled={isFetching}>
				Login
			</Button>
			<Typography variant='p'>
				Don't have an account? Click{' '}
				<Link to='/register' style={{color: '#CD32CD', textDecoration: 'none'}}>
					here
				</Link>
				.
			</Typography>
		</Paper>
	);
}

export default LoginForm;
