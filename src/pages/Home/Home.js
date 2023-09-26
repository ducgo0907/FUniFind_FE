import React from 'react';
import NewsFeed from '../News Feed/NewsFeed';

const Home = ({ user }) => {
	return (
		<div className="container mt-5">
			<p>{user && "Welcome, " + user.name}</p>
			<NewsFeed user={user} />
		</div>
	);
};

export default Home;
