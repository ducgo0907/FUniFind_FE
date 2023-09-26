import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import socketIOClient from 'socket.io-client'
import LoginForm from './pages/login/Login';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import RegistrationForm from './pages/register/Register';
import AuthService from './services/auth.service';

const host = 'http://localhost:8080/'

function App() {
	// const [socket, setSocket] = useState(null);
	const [user, setUser] = useState(AuthService.getCurrentUser());
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		// Check user is logged in or not?
		if (user && user !== null) {
			setIsLogged(true);
		}


		// const newSocket = socketIOClient.connect(host);
		// setSocket(newSocket);
		// return () => {
		// 	newSocket.disconnect();
		// }
	}, [])

	// useEffect(() => {
	// 	// Listen for events when the socket is available
	// 	if (socket) {
	// 		socket.on('testSocket', data => {
	// 			console.log(data, "hihi");
	// 		});
	// 	}
	// }, [socket])

	const logOut = () => {
		AuthService.logout();
		setUser(null);
		window.location.reload();
	}

	return (
		<Router>
			<div className="App">
				<header>
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
						<div className="container">
							<Link className="navbar-brand" to="/">FUniFind</Link>
							{!isLogged && <Link className='navbar-brand' to="/register">Register</Link>}
							{isLogged ? <div onClick={logOut}>Log out</div> : <Link className='navbar-brand' to="/login">Login</Link>}
							<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
						</div>
					</nav>
				</header>
				<main>
					<Routes>
						<Route path="/" element={<Home user={user} />} />
						<Route path="/login" element={<LoginForm />} />
						<Route path="/register" element={<RegistrationForm />} />
					</Routes>
				</main>
				<footer className="bg-dark text-light py-3 sticky-footer">
					<div className="container text-center">
						&copy; {new Date().getFullYear()} FUniFind.
					</div>
				</footer>
			</div>
		</Router>
	);
}

export default App;
