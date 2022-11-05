import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {TextField, Button, Paper, Typography} from '@mui/material';

import axios from 'axios';

import {loginStart, loginSuccess, loginFailure} from '../redux/userRedux';

function Register() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const dispatch = useDispatch();
	const {isFetching} = useSelector(state => state.user);

	const navigate = useNavigate();

	// Registers a user then logs into the app
	const handleSubmit = async e => {
		e.preventDefault();
		dispatch(loginStart());
		try {
			const res = await axios.post('http://localhost:5000/users/register', {
				firstName,
				lastName,
				email,
				password,
				confirmPassword,
				isAdmin: false
			});
			dispatch(loginSuccess(res.data)); // Sends the data as an action payload to the reducer function
			navigate('/');
		} catch (err) {
			setErrorMessage(err.response.data); // Sets the error message from the server side
			dispatch(loginFailure());
		}
	};

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '2rem 0'
			}}
		>
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
					gap: '2rem',
					background: '#F1F1F1'
				}}
			>
				{errorMessage && (
					<Typography color='error' sx={{textAlign: 'center'}}>
						{errorMessage}
					</Typography>
				)}
				<TextField
					label='First Name'
					type='text'
					required
					value={firstName}
					onChange={e => setFirstName(e.target.value)}
				/>
				<TextField
					label='Last Name'
					type='text'
					required
					value={lastName}
					onChange={e => setLastName(e.target.value)}
				/>
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
				<TextField
					label='Confirm Password'
					type='password'
					required
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
				/>
				<Button
					type='submit'
					variant='contained'
					disabled={isFetching}
					sx={{background: '#DAA520', '&:hover': {background: '#E4BA4D'}}}
				>
					Register
				</Button>
			</Paper>
		</div>
	);
}

export default Register;
