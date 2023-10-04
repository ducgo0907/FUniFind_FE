import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './pages/Login/Login';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import RegistrationForm from './pages/Register/Register';
import AuthService from './services/auth.service';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './pages/Admin/DashBoard';
import socketIOClient from 'socket.io-client';
import ChatBox from './pages/Profile/ChatBox';

const host = 'http://localhost:8080';

function App() {
	const [user, setUser] = useState(AuthService.getCurrentUser());
	const [isLogged, setIsLogged] = useState(false);
	const [socket, setSocket] = useState(null);
	const [isChatOpen, setChatOpen] = useState(false);
	const [userProfile, setUserProfile] = useState({});

	const toggleChat = () => {
		setChatOpen(!isChatOpen);
	};

	useEffect(() => {
		const newSocket = socketIOClient.connect(host);
		setSocket(newSocket);

		newSocket.emit('storeUserId', user.email);

		return () => {
			newSocket.disconnect();
		}
	}, [])

	useEffect(() => {
		// Check user is logged in or not?
		if (user && user !== null) {
			setIsLogged(true);
		}
	}, [user])

	useEffect(() => {
		if (socket) {
			socket.on('privateMessage', data => {
				if (data) {
					setChatOpen(true);
					setUserProfile({ email: data.sender, name: data.userName });
				}
			})
		}
	}, [socket])

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
						<Route path="/" element={<Home user={user} socket={socket} />} />
						<Route path="/login" element={<LoginForm />} />
						<Route path="/register" element={<RegistrationForm />} />
						<Route path='/:id' element={<Profile currentUser={user} socket={socket} />} />
						<Route path='/admin' element={<AdminDashboard user={user} />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</main>
				<footer className="bg-dark text-light py-3 sticky-footer">
					<ChatBox isOpen={isChatOpen} user={user} onClose={toggleChat} userProfile={userProfile} socket={socket} />
					<div className="container text-center">
						&copy; {new Date().getFullYear()} FUniFind.
					</div>
				</footer>
				<ToastContainer />
			</div>
		</Router>
	);
}

export default App;
