import {Routes, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import Register from './pages/Register';

import './App.css';

function App() {
	return (
		<div className='backgroundContainer'>
			<Routes>
				<Route path='/' element={<Navbar />}>
					<Route path='/register' element={<Register />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
