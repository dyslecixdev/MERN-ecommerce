import {Routes, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Items from './pages/Items';

import './App.css';

function App() {
	return (
		<div className='backgroundContainer'>
			<Routes>
				<Route path='/' element={<Navbar />}>
					<Route index element={<Home />} />
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='/checkout' element={<Checkout />} />
					<Route path='/items' element={<Items />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
