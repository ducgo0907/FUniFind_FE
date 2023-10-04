import React, { useEffect, useState } from 'react';
import NewsFeed from '../News Feed/NewsFeed';
import { Link } from 'react-router-dom';

const Home = ({ user, socket }) => {
	const [admin, setAdmin] = useState(false);

	useEffect(() => {
		if (user && user.isAdmin) {
			setAdmin(true)
		}
	}, []);
	return (
		<div className="container mt-5">
			<p>{user && "Welcome, " + user.name}</p>
			{admin ? (<Link className='btn btn-success' to='/admin'>Go to dashboard</Link>) : (<div></div>)}

			<NewsFeed user={user} socket={socket} />
		</div>
	);
};

export default Home;
