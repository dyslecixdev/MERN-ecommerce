import {Link} from 'react-router-dom';

import {Typography, Box} from '@mui/material';

function CheckoutLoginError() {
	return (
		<Box
			sx={{
				minHeight: '58vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '2rem'
			}}
		>
			<Typography variant='h4'>Uh oh! You are not logged in.</Typography>
			<Typography variant='h4'>
				Click{' '}
				<Link to='/login' style={{textDecoration: 'none', color: 'black'}}>
					here
				</Link>{' '}
				to log in.
			</Typography>
		</Box>
	);
}

export default CheckoutLoginError;
