import {Link} from 'react-router-dom';

import {Container, Paper, Button, Typography, Box} from '@mui/material';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@mui/icons-material';

import Carousel from 'react-material-ui-carousel';

function Home() {
	// Carousel slide information
	const carouselItems = [
		{
			name: 'Wedding Sale!',
			text: "50% Off All Men's Suits",
			img: 'https://marvel-b1-cdn.bc0a.com/f00000000192484/stitchandtie.com/content/images/thumbs/0001753_slate-blue-suit-by-allure-men.png',
			bg: '#DBE2FF'
		},
		{
			name: 'Autumn Discounts!',
			text: 'Buy 2 Get 1 Free on All Dresses',
			img: 'https://d1fufvy4xao6k9.cloudfront.net/images/landing/sumissura/home/main_products_block/7.woman_dress_evening.webp',
			bg: '#FFE9ED'
		},
		{
			name: 'Black Friday!',
			text: "Children's Clothing Marked Down",
			img: 'https://www.bubblegumcasting.com.au/wp-content/uploads/elementor/thumbs/how-much-does-teens-child-modeling-pay-pes9b0l7oaxny1spj82mipw9fiz50bnxohayy7f5aq.png',
			bg: '#FFFFED'
		}
	];

	return (
		<Container maxWidth='xl' sx={{minWidth: '98vw', minHeight: '100vh'}}>
			{/* Image Carousel */}
			<Carousel
				NextIcon={<KeyboardArrowRight />}
				PrevIcon={<KeyboardArrowLeft />}
				sx={{display: {xs: 'none', md: 'block'}}}
			>
				{carouselItems.map((item, idx) => (
					<Paper
						key={idx}
						elevation={0}
						sx={{
							height: '70vh',
							display: {xs: 'none', md: 'flex'},
							background: item.bg
						}}
					>
						<img
							src={item.img}
							alt='carousel-img'
							style={{width: '40%', objectFit: 'contain'}}
						/>
						<Box
							sx={{
								width: '60%',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-evenly'
							}}
						>
							<Typography variant='h1' component='p'>
								{item.name}
							</Typography>
							<Typography variant='h3' component='p'>
								{item.text}
							</Typography>
							<Button
								variant='outlined'
								component={Link} // The MUI Button component also acts as a react-router-dom Link
								to='/items'
								sx={{width: {md: '30%', lg: '25%', xl: '20%'}}}
							>
								View Deals
							</Button>
						</Box>
					</Paper>
				))}
			</Carousel>
		</Container>
	);
}

export default Home;
