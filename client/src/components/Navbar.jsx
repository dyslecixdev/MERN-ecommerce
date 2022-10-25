import {useState} from 'react';
import {Outlet, Link} from 'react-router-dom';
import {styled, useTheme, alpha} from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import {
	Box,
	Drawer,
	Toolbar,
	List,
	Typography,
	Divider,
	IconButton,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	InputBase,
	Badge,
	MenuItem,
	Menu,
	Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {
	AccountCircle,
	ChevronLeft,
	ChevronRight,
	MoreVert,
	ShoppingCart,
	Man,
	Woman,
	ChildFriendly,
	Checkroom,
	Watch,
	Info
} from '@mui/icons-material';

const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: prop => prop !== 'open'})(({theme, open}) => ({
	flexGrow: 1,
	padding: theme.spacing(3),
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	marginLeft: `-${drawerWidth}px`,
	...(open && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	})
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: prop => prop !== 'open'
})(({theme, open}) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	})
}));

const DrawerHeader = styled('div')(({theme}) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1), // necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end'
}));

const Search = styled('div')(({theme}) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25)
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto'
	}
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch'
		}
	}
}));

function Navbar() {
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [cartAnchorEl, setCartAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

	const isCartMenuOpen = Boolean(cartAnchorEl);
	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	const user = false; // ! Simulate if a user is logged in or not.

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleProfileMenuOpen = e => {
		setAnchorEl(e.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleCartMenuOpen = e => {
		setCartAnchorEl(e.currentTarget);
	};

	const handleCartMenuClose = () => {
		setCartAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = e => {
		setMobileMoreAnchorEl(e.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const renderCartMenu = (
		<Menu
			anchorEl={cartAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right'
			}}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right'
			}}
			open={isCartMenuOpen}
			onClose={handleCartMenuClose}
		>
			<Button
				variant='contained'
				onClick={handleCartMenuClose}
				component={Link}
				to='/checkout'
			>
				Checkout
			</Button>
		</Menu>
	);

	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right'
			}}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right'
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			{user && <MenuItem onClick={handleMenuClose}>Profile</MenuItem>}
			{!user && (
				<MenuItem onClick={handleMenuClose}>
					<Link to='/register' style={{textDecoration: 'none', color: 'black'}}>
						Register
					</Link>
				</MenuItem>
			)}
			{!user && (
				<MenuItem onClick={handleMenuClose}>
					<Link to='/login' style={{textDecoration: 'none', color: 'black'}}>
						Login
					</Link>
				</MenuItem>
			)}
		</Menu>
	);

	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right'
			}}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right'
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton size='large' onClick={handleCartMenuOpen} color='inherit'>
					<Badge badgeContent={17} color='error'>
						<ShoppingCart />
					</Badge>
				</IconButton>
			</MenuItem>
			<MenuItem>
				<IconButton size='large' onClick={handleProfileMenuOpen} color='inherit'>
					<AccountCircle />
				</IconButton>
			</MenuItem>
		</Menu>
	);

	return (
		<Box sx={{display: 'flex'}}>
			<AppBar position='fixed' open={open}>
				<Toolbar>
					<IconButton
						color='inherit'
						onClick={handleDrawerOpen}
						edge='start'
						sx={{mr: 2, ...(open && {display: 'none'})}}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{display: {xs: 'none', sm: 'block'}}}
					>
						<Link to='/' style={{textDecoration: 'none', color: 'white'}}>
							LOGO
						</Link>
					</Typography>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase placeholder='Search…' />
					</Search>
					<Box sx={{flexGrow: 1}} />
					<Box sx={{display: {xs: 'none', sm: 'flex'}}}>
						<IconButton size='large' onClick={handleCartMenuOpen} color='inherit'>
							<Badge badgeContent={17} color='error'>
								<ShoppingCart />
							</Badge>
						</IconButton>
						<IconButton
							size='large'
							edge='end'
							onClick={handleProfileMenuOpen}
							color='inherit'
						>
							<AccountCircle />
						</IconButton>
					</Box>
					<Box sx={{display: {xs: 'flex', sm: 'none'}}}>
						<IconButton size='large' onClick={handleMobileMenuOpen} color='inherit'>
							<MoreVert />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderCartMenu}
			{renderMenu}
			{renderMobileMenu}
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box'
					}
				}}
				variant='persistent'
				anchor='left'
				open={open}
			>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					<ListItem disablePadding>
						<ListItemButton onClick={handleDrawerClose} component={Link} to='/items'>
							<ListItemIcon>
								<Man />
							</ListItemIcon>
							<ListItemText primary='Men' />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton onClick={handleDrawerClose} component={Link} to='/items'>
							<ListItemIcon>
								<Woman />
							</ListItemIcon>
							<ListItemText primary='Women' />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton onClick={handleDrawerClose} component={Link} to='/items'>
							<ListItemIcon>
								<ChildFriendly />
							</ListItemIcon>
							<ListItemText primary='Children' />
						</ListItemButton>
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem disablePadding>
						<ListItemButton onClick={handleDrawerClose} component={Link} to='/items'>
							<ListItemIcon>
								<Checkroom />
							</ListItemIcon>
							<ListItemText primary='Clothing' />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton onClick={handleDrawerClose} component={Link} to='/items'>
							<ListItemIcon>
								<Watch />
							</ListItemIcon>
							<ListItemText primary='Accesories' />
						</ListItemButton>
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<Info />
							</ListItemIcon>
							<ListItemText>
								<a
									href='https://github.com/christiandeandemesa'
									target='_blank'
									rel='noreferrer'
									style={{textDecoration: 'none', color: 'black'}}
								>
									About
								</a>
							</ListItemText>
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
			<Main open={open}>
				<DrawerHeader />
				<Outlet />
			</Main>
		</Box>
	);
}

export default Navbar;
