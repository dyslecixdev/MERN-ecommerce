import {Link} from 'react-router-dom';

import {Typography, Box} from '@mui/material';

function CheckoutLoginError() {
	return (
		<Box
			sx={{
				minHeight: '58vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<Box
				sx={{
					padding: '1rem',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '2rem',
					background: 'white',
					borderRadius: '10px'
				}}
			>
				<Typography variant='h4'>Uh oh! You are not logged in.</Typography>
				<Typography variant='h4'>
					Click{' '}
					<Link to='/login' style={{textDecoration: 'none', color: '#CD32CD'}}>
						here
					</Link>{' '}
					to log in.
				</Typography>
			</Box>
		</Box>
	);
}

export default CheckoutLoginError;
