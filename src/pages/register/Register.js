import React, { useState } from 'react';
import authService from '../../services/auth.service';

const RegistrationForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		phoneNumber: '',
		address: '',
	});
	const [errors, setErrors] = useState([]);
	const [success, setSuccess] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Add your registration logic here
		console.log(formData);
		authService.register(formData)
			.then(response => {
				setSuccess(response.data.message);
				setErrors([])
			})
			.catch(err => {
				if (err.response.data) {
					setErrors(errors => [err.response.data.message]);
					setSuccess("")
				}
			})
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<h2 className="mb-4">Registration</h2>
					<div>
						{errors.map(error => (
							<div className='alert alert-danger'>{error}</div>
						))}
						{success !== "" ? (<div className='alert alert-success'>{success}</div>) : (<div></div>)}
					</div>
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								className="form-control"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</div>
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
						<div className="form-group">
							<label htmlFor="phoneNumber">Phone Number</label>
							<input
								type="tel"
								className="form-control"
								id="phoneNumber"
								name="phoneNumber"
								value={formData.phoneNumber}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="address">Address</label>
							<input
								type="text"
								className="form-control"
								id="address"
								name="address"
								value={formData.address}
								onChange={handleChange}
								required
							/>
						</div>
						<button type="submit" className="btn btn-primary">
							Register
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default RegistrationForm;
