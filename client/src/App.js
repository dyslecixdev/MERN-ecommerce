import {Routes, Route, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {ThemeProvider, createTheme} from '@mui/material';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import Orders from './pages/Orders';
import SingleOrder from './pages/SingleOrder';

import './App.css';

function App() {
	const user = useSelector(state => state.user.currentUser); // Logged in user from redux

	// Custom MUI theme
	const theme = createTheme({
		palette: {
			primary: {
				main: '#32CD32',
				light: '#6CDB6C',
				dark: '#249324',
				contrastText: '#000'
			},
			secondary: {
				main: '#CD32CD',
				light: '#DB6CDB',
				dark: '#932493'
			}
		},
		typography: {
			h1: {
				fontFamily: "'Yeseva One', cursive"
			},
			h2: {
				fontFamily: "'Yeseva One', cursive"
			},
			h3: {
				fontFamily: "'Yeseva One', cursive"
			},
			h4: {
				fontFamily: "'Yeseva One', cursive"
			},
			h5: {
				fontFamily: "'Yeseva One', cursive"
			},
			h6: {
				fontFamily: "'Yeseva One', cursive"
			},
			subtitle1: {
				fontFamily: "'Josefin Sans', sans-serif"
			},
			subtitle2: {
				fontFamily: "'Josefin Sans', sans-serif"
			},
			body1: {
				fontFamily: "'Josefin Sans', sans-serif"
			},
			body2: {
				fontFamily: "'Josefin Sans', sans-serif"
			},
			button: {
				fontFamily: "'Josefin Sans', sans-serif"
			}
		}
	});

	return (
		// Applying custom theme to app
		<ThemeProvider theme={theme}>
			<div className='backgroundContainer'>
				<Routes>
					<Route path='/' element={<Navbar />}>
						<Route index element={<Home />} />
						<Route
							path='/register'
							element={user ? <Navigate to='/' /> : <Register />}
						/>
						<Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
						<Route
							path='/profile'
							element={user ? <Profile /> : <Navigate to='/login' />}
						/>
						<Route path='/checkout' element={<Checkout />} />
						<Route path='/products/:category' element={<Products />} />
						<Route path='/product/:id' element={<SingleProduct />} />
						<Route
							path='/orders'
							element={user ? <Orders /> : <Navigate to='/login' />}
						/>
						<Route
							path='/orders/:id'
							element={user ? <SingleOrder /> : <Navigate to='/login' />}
						/>
					</Route>
				</Routes>
			</div>
		</ThemeProvider>
	);
}

export default App;
