import {useState} from 'react';
import {useSelector} from 'react-redux';

import {Rating, Typography, Paper, Box, ButtonGroup, Button} from '@mui/material';

const months = [
	'',
	'Jan.',
	'Feb.',
	'Mar.',
	'Apr.',
	'May',
	'Jun.',
	'Jul.',
	'Aug.',
	'Sep.',
	'Oct.',
	'Nov.',
	'Dec.'
];

function Review({review}) {
	const user = useSelector(state => state.user.currentUser);

	const [editMode, setEditMode] = useState(false);

	return (
		<Paper sx={{padding: '1rem', display: 'flex', border: '1px solid black'}}>
			<Box sx={{flex: 5}}>
				<Typography variant='h4'>{review.userName}</Typography>
				<Rating value={review.userRating} readOnly />
				<Typography variant='h5'>
					{`
					${months[review.updatedAt.slice(0, 10).split('-')[1]]} 
					${review.updatedAt.slice(0, 10).split('-')[2]}, 
					${review.updatedAt.slice(0, 10).split('-')[0]}
				`}
				</Typography>
				<Typography variant='h5'>{review.userReview}</Typography>
			</Box>
			{user.id === review.userId && (
				<ButtonGroup
					disableElevation
					variant='contained'
					sx={{
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-evenly'
					}}
				>
					<Button>Edit</Button>
					<Button sx={{background: 'red'}}>Delete</Button>
				</ButtonGroup>
			)}
		</Paper>
	);
}

export default Review;
