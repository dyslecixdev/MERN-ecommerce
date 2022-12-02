import {useState} from 'react';
import {Outlet, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

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
	Menu
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
	Info,
	Home
} from '@mui/icons-material';

import {logoutStart, logoutSuccess, logoutFailure} from '../redux/userRedux';
// import {logoutUser} from '../redux/cartRedux';

const drawerWidth = 240;

// Example usage of MUI styled components
// Example of using props (viz. open)
const Main = styled('main', {shouldForwardProp: prop => prop !== 'open'})(({theme, open}) => ({
	flexGrow: 1,
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	paddingTop: '1rem',
	marginLeft: `-${drawerWidth}px`,
	...(open && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	})
}));

const AppBar = styled(MuiAppBar, {shouldForwardProp: prop => prop !== 'open'})(({theme, open}) => ({
	background: 'black',
	zIndex: 98,
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
	padding: theme.spacing(0, 1), // necessary for content (viz. Main) to be below app bar
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
	const user = useSelector(state => state.user.currentUser);
	const cartQuantity = useSelector(state => state.cart.quantity);
	const dispatch = useDispatch();

	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	// Opens the drawer
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	// Closes the drawer
	const handleDrawerClose = () => {
		setOpen(false);
	};

	// Opens the vertical ellipsis menu for mobile devices
	const handleMobileMenuOpen = e => {
		setMobileMoreAnchorEl(e.currentTarget);
	};

	// Closes the vertical ellipsis menu for mobile devices
	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	// Opens the profile menu
	const handleProfileMenuOpen = e => {
		setAnchorEl(e.currentTarget);
	};

	// Closes the profile menu
	const handleProfileMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	// Logs out of the app
	const handleLogout = async () => {
		dispatch(logoutStart());
		try {
			// dispatch(logoutUser());
			dispatch(logoutSuccess());
		} catch (err) {
			console.log(err);
			dispatch(logoutFailure());
		}
	};

	// Profile menu
	const renderProfileMenu = (
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
			onClose={handleProfileMenuClose}
			sx={{zIndex: 100}}
		>
			{user && (
				<MenuItem onClick={handleProfileMenuClose} component={Link} to='/profile'>
					Profile
				</MenuItem>
			)}
			{user && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
			{!user && (
				<MenuItem onClick={handleProfileMenuClose}>
					<Link to='/register' style={{textDecoration: 'none', color: 'black'}}>
						Register
					</Link>
				</MenuItem>
			)}
			{!user && (
				<MenuItem onClick={handleProfileMenuClose}>
					<Link to='/login' style={{textDecoration: 'none', color: 'black'}}>
						Login
					</Link>
				</MenuItem>
			)}
		</Menu>
	);

	// Vertical ellipsis menu for mobile devices
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
			sx={{zIndex: 99}}
		>
			<MenuItem>
				<IconButton
					size='large'
					color='inherit'
					component={Link}
					to='/checkout'
					onClick={handleMobileMenuClose}
				>
					<Badge badgeContent={cartQuantity} color='error'>
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
			{/* Navbar */}
			<AppBar position='fixed' open={open}>
				<Toolbar>
					{/* Hamburger menu icon */}
					<IconButton
						color='inherit'
						onClick={handleDrawerOpen}
						edge='start'
						sx={{mr: 2, ...(open && {display: 'none'})}}
					>
						<MenuIcon />
					</IconButton>

					{/* LOGO */}
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

					{/* Search field */}
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase placeholder='Currently not functional' />
					</Search>

					{/* Space between search field and icons */}
					<Box sx={{flexGrow: 1}} />

					{/* Shopping cart and Profile icons for non-mobile devices */}
					<Box sx={{display: {xs: 'none', sm: 'flex'}}}>
						<IconButton
							size='large'
							color='inherit'
							component={Link}
							to='/checkout'
							onClick={handleMobileMenuClose}
						>
							<Badge badgeContent={cartQuantity} color='error'>
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

					{/* Vertical ellipsis for mobile devices */}
					<Box sx={{display: {xs: 'flex', sm: 'none'}}}>
						<IconButton size='large' onClick={handleMobileMenuOpen} color='inherit'>
							<MoreVert />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>

			{/* Menu popups for the profile and vertical ellipsis */}
			{renderProfileMenu}
			{renderMobileMenu}

			{/* Left-side drawer */}
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
						{/* If the webpage is read from left to right, use a different icon */}
						{theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{/* Home */}
					<ListItem disablePadding>
						<ListItemButton onClick={handleDrawerClose} component={Link} to='/'>
							<ListItemIcon>
								<Home />
							</ListItemIcon>
							<ListItemText primary='Home' />
						</ListItemButton>
					</ListItem>
					<Divider />

					{/* Men, Women, and Children */}
					<ListItem disablePadding>
						<ListItemButton
							onClick={handleDrawerClose}
							component={Link}
							to='/products/men'
						>
							<ListItemIcon>
								<Man />
							</ListItemIcon>
							<ListItemText primary='Men' />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton
							onClick={handleDrawerClose}
							component={Link}
							to='/products/women'
						>
							<ListItemIcon>
								<Woman />
							</ListItemIcon>
							<ListItemText primary='Women' />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton
							onClick={handleDrawerClose}
							component={Link}
							to='/products/children'
						>
							<ListItemIcon>
								<ChildFriendly />
							</ListItemIcon>
							<ListItemText primary='Children' />
						</ListItemButton>
					</ListItem>
				</List>
				<Divider />

				{/* Clothing and Accessories */}
				<List>
					<ListItem disablePadding>
						<ListItemButton
							onClick={handleDrawerClose}
							component={Link}
							to='/products/accesories'
						>
							<ListItemIcon>
								<Watch />
							</ListItemIcon>
							<ListItemText primary='Accesories' />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton
							onClick={handleDrawerClose}
							component={Link}
							to='/products/clothing'
						>
							<ListItemIcon>
								<Checkroom />
							</ListItemIcon>
							<ListItemText primary='Clothing' />
						</ListItemButton>
					</ListItem>
				</List>
				<Divider />

				{/* About */}
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

			{/* Whitespace under the Navbar*/}
			<Main open={open}>
				<DrawerHeader />
				<Outlet />
			</Main>
		</Box>
	);
}

export default Navbar;
