import {Routes, Route, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

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

// todo Fix responsive height
// todo Custom theme colors
// todo Include Google fonts
function App() {
	const user = useSelector(state => state.user.currentUser); // Logged in user from redux

	return (
		<div className='backgroundContainer'>
			<Routes>
				<Route path='/' element={<Navbar />}>
					<Route index element={<Home />} />
					<Route path='/register' element={user ? <Navigate to='/' /> : <Register />} />
					<Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
					<Route
						path='/profile'
						element={user ? <Profile /> : <Navigate to='/login' />}
					/>
					<Route path='/checkout' element={<Checkout />} />
					<Route path='/products/:category' element={<Products />} />
					<Route path='/product/:id' element={<SingleProduct />} />
					<Route path='/orders' element={user ? <Orders /> : <Navigate to='/login' />} />
					<Route
						path='/orders/:id'
						element={user ? <SingleOrder /> : <Navigate to='/login' />}
					/>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
