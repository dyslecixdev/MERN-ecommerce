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

import './App.css';

// todo Include Google fonts
// bug Height of the pages just changes drastically when width changes
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
				</Route>
			</Routes>
		</div>
	);
}

export default App;
