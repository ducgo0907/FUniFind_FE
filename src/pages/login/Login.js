import React, { useState } from 'react';
import AuthService from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const nav = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		AuthService.login(formData)
			.then(() => {
				nav('/');
				window.location.reload();
			})
			.catch(error => {
				console.log("error: ", error);
			})
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<h2 className="mb-4">Login</h2>
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								className="form-control"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								className="form-control"
								id="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								required
							/>
						</div>
						<button type="submit" className="btn btn-primary">
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
