import {styled} from '@mui/material/styles';
import {Stack, Divider, Box, Typography, Paper, InputBase, IconButton} from '@mui/material';
import {Send, MailOutline, Phone, Room} from '@mui/icons-material';

const Item = styled(Box)(({theme}) => ({
	flex: 1,
	padding: '1rem',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	background: '#F9F0D9'
}));

const Footer = () => {
	return (
		<Stack
			direction='row'
			spacing={2}
			sx={{
				width: '100%',
				height: '25vh',
				marginTop: '5vh',
				display: 'flex',
				justifyContent: 'space-between',
				background: '#F9F0D9'
			}}
		>
			{/* LOGO */}
			<Item display={{xs: 'none', lg: 'flex'}}>
				<Typography variant='h6' noWrap component='div'>
					LOGO
				</Typography>
				<Typography variant='p' component='div' sx={{color: 'gray'}}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto voluptas possimus
					laboriosam mollitia aut animi placeat, a molestiae esse quas. Accusantium,
					laborum deleniti doloribus ducimus magni non enim atque ipsum facilis harum,
					repellat corrupti repudiandae distinctio. Deserunt, reiciendis distinctio veniam
					itaque culpa nulla quas quae, natus quam sequi laborum magnam.
				</Typography>
			</Item>
			<Divider
				orientation='vertical'
				flexItem
				sx={{display: {xs: 'none', sm: 'flex'}, background: '#F9F0D9'}}
			/>

			{/* Newsletter Subscription */}
			<Item display={{xs: 'none', sm: 'block'}}>
				<Typography variant='h6' noWrap component='div' sx={{marginBottom: '2rem'}}>
					Join Our Newsletter
				</Typography>
				<Paper
					component='form'
					sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%'}}
				>
					<InputBase placeholder='Currently not functional' sx={{ml: 1, flex: 1}} />
					<Divider sx={{height: 28, m: 0.5}} orientation='vertical' />
					<IconButton sx={{p: '10px'}}>
						<Send />
					</IconButton>
				</Paper>
			</Item>
			<Divider
				orientation='vertical'
				flexItem
				sx={{display: {xs: 'none', sm: 'block'}, background: '#F9F0D9'}}
			/>

			{/* Contact Information */}
			<Item>
				<Typography variant='h6' noWrap component='div'>
					Contact
				</Typography>
				<Typography
					variant='p'
					component='div'
					sx={{display: 'flex', alignItems: 'center', color: 'gray'}}
				>
					<Room sx={{marginRight: '1rem', color: 'red'}} /> 123 Imaginary Lane, Los
					Angeles, California, 90001
				</Typography>
				<Typography
					variant='p'
					component='div'
					sx={{display: 'flex', alignItems: 'center', color: 'gray'}}
				>
					<Phone sx={{marginRight: '1rem'}} /> 909-909-9009
				</Typography>
				<Typography
					variant='p'
					component='div'
					sx={{display: 'flex', alignItems: 'center', color: 'gray'}}
				>
					<MailOutline sx={{marginRight: '1rem', color: 'blue'}} /> fakeEmail@gmail.com
				</Typography>
			</Item>
		</Stack>
	);
};

export default Footer;
