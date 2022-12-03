import LoginForm from '../components/LoginForm';

function Login() {
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '2rem 0'
			}}
		>
			<LoginForm route={'/'} />
		</div>
	);
}

export default Login;
