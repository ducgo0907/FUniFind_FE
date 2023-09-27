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


function App() {
	const [user, setUser] = useState(AuthService.getCurrentUser());
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		// Check user is logged in or not?
		if (user && user !== null) {
			setIsLogged(true);
		}
	}, [user])

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
						<Route path='/:id' element={<Profile />} />
						<Route path='/admin' element={<AdminDashboard user={user} />}/>
						<Route path='*' element={<NotFound />} />
					</Routes>
				</main>
				<footer className="bg-dark text-light py-3 sticky-footer">
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
