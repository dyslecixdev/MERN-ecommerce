// User's profile page

import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {TextField, Button, Paper, ButtonGroup, Typography, Modal, Box} from '@mui/material';

import axios from 'axios';

import {
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailure
} from '../redux/userRedux';

import Footer from '../components/Footer';

function Profile() {
	const user = useSelector(state => state.user.currentUser);

	const [editMode, setEditMode] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const dispatch = useDispatch();
	const {isFetching} = useSelector(state => state.user);

	// Updates a user
	const handleSubmit = async e => {
		e.preventDefault();
		dispatch(updateUserStart());
		try {
			const res = await axios.put(
				`https://mern-e-commerce-backend.onrender.com/users/${user.id}`,
				{firstName, lastName, email, password, confirmPassword, isAdmin: user.isAdmin},
				{
					headers: {
						Authorization: 'Bearer ' + user.token
					}
				}
			);
			dispatch(updateUserSuccess(res.data));
			handleReset();
		} catch (err) {
			setErrorMessage(err.response.data);
			dispatch(updateUserFailure());
		}
	};

	// Deletes a user
	const handleDelete = async e => {
		e.preventDefault();
		dispatch(deleteUserStart());
		try {
			await axios.delete(`https://mern-e-commerce-backend.onrender.com/users/${user.id}`, {
				headers: {
					Authorization: 'Bearer ' + user.token
				}
			});
			dispatch(deleteUserSuccess());
			// navigate not needed here because App.js will navigate to the login page
		} catch (err) {
			console.log(err);
			dispatch(deleteUserFailure());
		}
	};

	// Resets the form when Cancel is clicked
	const handleReset = () => {
		setEditMode(false);
		setFirstName(user.firstName);
		setLastName(user.lastName);
		setEmail(user.email);
		setPassword('');
		setConfirmPassword('');
	};

	return (
		<>
			<div
				style={{
					minHeight: '61vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '2rem 0'
				}}
			>
				{/* Either the user's information or a form to edit the user's information */}
				{editMode ? (
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
							background: 'white'
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
						<ButtonGroup
							variant='contained'
							disableElevation
							sx={{
								width: {
									xs: '100%',
									sm: '60%',
									md: '50%'
								},
								display: 'flex',
								justifyContent: 'space-between'
							}}
						>
							<Button
								type='button'
								color='info'
								onClick={handleReset}
								disabled={isFetching}
							>
								Cancel
							</Button>
							<Button type='submit' color='success' disabled={isFetching}>
								Update
							</Button>
							<Button
								type='button'
								color='error'
								onClick={() => setOpenModal(true)}
								disabled={isFetching}
							>
								Delete
							</Button>
						</ButtonGroup>

						{/* Modal is a popup window to confirm if the user wants to delete their account */}
						<Modal open={openModal} onClose={() => setOpenModal(false)}>
							<Box
								sx={{
									width: {
										xs: '100%',
										sm: '75%',
										md: '50%',
										lg: '35%',
										xl: '25%'
									},
									height: '20vh',
									padding: '1rem',
									position: 'absolute',
									top: '50%',
									left: '50%',
									transform: 'translate(-50%, -50%)',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									background: 'white',
									border: '2px solid #000'
								}}
							>
								<Typography variant='h6' component='h2'>
									Are you sure you want to delete your profile?
								</Typography>
								<ButtonGroup
									variant='contained'
									disableElevation
									sx={{
										width: '100%',
										display: 'flex',
										justifyContent: 'space-between'
									}}
								>
									<Button
										type='button'
										color='error'
										onClick={handleDelete}
										disabled={isFetching}
									>
										Yes, I am sure
									</Button>
									<Button
										type='button'
										color='info'
										onClick={() => setOpenModal(false)}
										disabled={isFetching}
									>
										No, I need to think
									</Button>
								</ButtonGroup>
							</Box>
						</Modal>
					</Paper>
				) : (
					<Paper
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
							background: 'white'
						}}
					>
						<Typography variant='h5'>
							Name: {user.firstName} {user.lastName}
						</Typography>
						<Typography variant='h5'>Email: {user.email}</Typography>
						<Button color='secondary' onClick={() => setEditMode(true)}>
							Change Your Information
						</Button>
					</Paper>
				)}
			</div>

			<Footer />
		</>
	);
}

export default Profile;
