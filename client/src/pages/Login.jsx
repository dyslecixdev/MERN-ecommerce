import LoginForm from '../components/LoginForm';

function Login() {
	return (
		<div
			style={{
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
