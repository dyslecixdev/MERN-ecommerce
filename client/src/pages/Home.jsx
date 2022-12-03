import {Link} from 'react-router-dom';

import {styled} from '@mui/material/styles';
import {Paper, Button, Typography, Box} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@mui/icons-material';

import Carousel from 'react-material-ui-carousel';

import Footer from '../components/Footer';

import Men from '../assets/men.jpg';
import Women from '../assets/women.jpg';
import Children from '../assets/children.jpg';
import Accesories from '../assets/accesories.jpg';
import Clothing from '../assets/clothing.jpg';

// Each individual category in the categories image list
const Item = styled(Paper)(({theme}) => ({
	height: '20rem',
	...theme.typography.heading1,
	padding: theme.spacing(1),
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundPosition: 'center center',
	backgroundSize: 'cover',
	objectFit: 'cover',
	overflow: 'hidden',
	cursor: 'pointer',
	transition: 'all 1s ease',
	'&:hover': {
		transform: 'scale(1.03)',

		'&::after': {
			padding: '1rem',
			fontSize: '2rem',
			background: 'rgba(0, 0, 0, 0.4)',
			color: 'white',
			border: '1px solid white'
		}
	}
}));

const carouselItems = [
	{
		name: 'Wedding Sale!',
		text: "50% Off All Men's Suits",
		img: 'https://marvel-b1-cdn.bc0a.com/f00000000192484/stitchandtie.com/content/images/thumbs/0001753_slate-blue-suit-by-allure-men.png',
		bg: '#DBE2FF',
		link: '/products/men',
		color: 'info'
	},
	{
		name: 'Autumn Discounts!',
		text: 'Buy 2 Get 1 Free on All Dresses',
		img: 'https://d1fufvy4xao6k9.cloudfront.net/images/landing/sumissura/home/main_products_block/7.woman_dress_evening.webp',
		bg: '#FFE9ED',
		link: '/products/women',
		color: 'error'
	},
	{
		name: 'Black Friday!',
		text: "Children's Clothing Marked Down",
		img: 'https://www.bubblegumcasting.com.au/wp-content/uploads/elementor/thumbs/how-much-does-teens-child-modeling-pay-pes9b0l7oaxny1spj82mipw9fiz50bnxohayy7f5aq.png',
		bg: '#FFFFED',
		link: '/products/children',
		color: 'warning'
	}
];

function Home() {
	return (
		<>
			{/* Image Carousel for medium or larger */}
			<Carousel
				NextIcon={<KeyboardArrowRight />}
				PrevIcon={<KeyboardArrowLeft />}
				sx={{marginBottom: '3rem', display: {xs: 'none', md: 'block'}}}
			>
				{carouselItems.map((item, idx) => (
					<Paper
						key={idx}
						elevation={0}
						sx={{
							height: '80vh',
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
								to={item.link}
								color={item.color}
								sx={{width: {md: '30%', lg: '25%', xl: '20%'}}}
							>
								View Deals
							</Button>
						</Box>
					</Paper>
				))}
			</Carousel>

			{/* Image for smaller than medium */}
			<Paper
				elevation={0}
				sx={{
					padding: '1rem',
					display: {xs: 'block', md: 'none'},
					background: carouselItems[2].bg
				}}
			>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'flex-between',
						alignItems: 'center'
					}}
				>
					<Typography
						component='p'
						sx={{
							fontSize: {
								xs: '2.5rem',
								sm: '5.5rem'
							}
						}}
					>
						{carouselItems[2].name}
					</Typography>
					<img
						src={carouselItems[2].img}
						alt='carousel-img'
						style={{width: '100%', objectFit: 'contain'}}
					/>
					<Button
						variant='outlined'
						component={Link} // The MUI Button component also acts as a react-router-dom Link
						to={carouselItems[2].link}
						color='warning'
						sx={{width: '50%'}}
					>
						View Deals
					</Button>
				</Box>
			</Paper>

			{/* Categories Image List */}
			<Grid
				container
				spacing={3}
				sx={{
					width: '100%',
					margin: 'auto',
					marginBottom: '5vh',
					borderRadius: '5px'
				}}
			>
				<Grid
					xs={12}
					sm={12}
					md={4}
					component={Link}
					to='/products/men'
					sx={{textDecoration: 'none'}}
				>
					<Item
						text='MEN'
						sx={{
							backgroundImage: `url(${Men})`,
							'&:hover': {
								'&::after': {
									content: '"MEN"' // Wasn't able to pass the text as props to Item
								}
							}
						}}
					>
						<Typography
							component='p'
							sx={{
								display: {md: 'none'},
								padding: '1rem',
								fontSize: '2rem',
								background: 'rgba(0, 0, 0, 0.4)',
								color: 'white',
								border: '1px solid white'
							}}
						>
							MEN
						</Typography>
					</Item>
				</Grid>
				<Grid
					xs={12}
					sm={6}
					md={4}
					component={Link}
					to='/products/women'
					sx={{textDecoration: 'none'}}
				>
					<Item
						text='WOMEN'
						sx={{
							backgroundImage: `url(${Women})`,
							'&:hover': {
								'&::after': {
									content: '"WOMEN"'
								}
							}
						}}
					>
						<Typography
							component='p'
							sx={{
								display: {md: 'none'},
								padding: '1rem',
								fontSize: '2rem',
								background: 'rgba(0, 0, 0, 0.4)',
								color: 'white',
								border: '1px solid white'
							}}
						>
							WOMEN
						</Typography>
					</Item>
				</Grid>
				<Grid
					xs={12}
					sm={6}
					md={4}
					component={Link}
					to='/products/children'
					sx={{textDecoration: 'none'}}
				>
					<Item
						text='CHILDREN'
						sx={{
							backgroundImage: `url(${Children})`,
							'&:hover': {
								'&::after': {
									content: '"CHILDREN"'
								}
							}
						}}
					>
						<Typography
							component='p'
							sx={{
								display: {md: 'none'},
								padding: '1rem',
								fontSize: '2rem',
								background: 'rgba(0, 0, 0, 0.4)',
								color: 'white',
								border: '1px solid white'
							}}
						>
							CHILDREN
						</Typography>
					</Item>
				</Grid>
				<Grid
					xs={12}
					sm={6}
					md={6}
					component={Link}
					to='/products/accesories'
					sx={{textDecoration: 'none'}}
				>
					<Item
						text='ACCESORIES'
						sx={{
							backgroundImage: `url(${Accesories})`,
							'&:hover': {
								'&::after': {
									content: '"ACCESORIES"'
								}
							}
						}}
					>
						<Typography
							component='p'
							sx={{
								display: {md: 'none'},
								padding: '1rem',
								fontSize: '2rem',
								background: 'rgba(0, 0, 0, 0.4)',
								color: 'white',
								border: '1px solid white'
							}}
						>
							ACCESORIES
						</Typography>
					</Item>
				</Grid>
				<Grid
					xs={12}
					sm={6}
					md={6}
					component={Link}
					to='/products/clothing'
					sx={{textDecoration: 'none'}}
				>
					<Item
						text='CLOTHING'
						sx={{
							backgroundImage: `url(${Clothing})`,
							'&:hover': {
								'&::after': {
									content: '"CLOTHING"'
								}
							}
						}}
					>
						<Typography
							component='p'
							sx={{
								display: {md: 'none'},
								padding: '1rem',
								fontSize: '2rem',
								background: 'rgba(0, 0, 0, 0.4)',
								color: 'white',
								border: '1px solid white'
							}}
						>
							CLOTHING
						</Typography>
					</Item>
				</Grid>
			</Grid>

			<Footer />
		</>
	);
}

export default Home;
