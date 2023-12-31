import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../../services/user.service';
import ChatBox from './ChatBox';
import './Profile.css';

const Profile = ({ currentUser, socket }) => {
	const { id } = useParams();
	const [user, setUser] = useState({});
	const [isChatOpen, setChatOpen] = useState(false);

	const toggleChat = () => {
		setChatOpen(!isChatOpen);
	};

	// Fetch user data using the 'id' parameter (replace with your API call)
	useEffect(() => {
		// Simulate a fetch request with setTimeout (replace with actual fetch)
		userService.getUserById(id)
			.then(res => {
				setUser(res.data.data)
			})
			.catch(err => {

			})
	}, [id]);

	return (
		<div>
			<h1>User Profile</h1>
			<img src={user.avatar} alt={user.name} />
			<h2>{user.name}</h2>
			<p>{user.email}</p>
			<button onClick={toggleChat} className={`message-button ${currentUser && currentUser.id === user._id ? 'hide' : ''}`}>
				Message
			</button>
			<ChatBox isOpen={isChatOpen} user={currentUser} onClose={toggleChat} userProfile={user} socket={socket} />
		</div>
	);
};

export default Profile;
