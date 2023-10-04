// ChatBox.js
import React, { useEffect, useState } from 'react';
import './ChatBox.css'

const ChatBox = ({ isOpen, onClose, userProfile, user, socket }) => {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');

	const handleInputChange = (e) => {
		setNewMessage(e.target.value);
	};

	const handleSendMessage = () => {
		if (newMessage.trim() !== '') {
			const message = {
				message: newMessage,
				sender: user.email,
				receiver: userProfile.email,
				userName: user.name
			}
			socket.emit('privateMessage', message);
			setMessages(listMessage => [...listMessage, message]);
			setNewMessage('');
		}
	};

	useEffect(() => {
		// Listen for events when the socket is available
		if (socket) {
			// Người dùng nhận message từ user khác
			// data : { sender: thông tin người người, message: Nội dung tin nhắn }
			socket.on('privateMessage', data => {
				if (data) {
					setMessages(listMessage => [...listMessage, data]);
				}
			})
		}
	}, [socket])


	return (
		<div className={`chat-box ${isOpen ? 'open' : 'hide'}`}>
			<div className="chat-header">
				<div>{userProfile.name}</div>
				<button onClick={onClose} className="close-button">
					X
				</button>
			</div>
			<div className="chat-body">
				<div className="chat-messages">
					{messages.map((message, index) => (
						<div key={index} className={`message ${message.sender === user.email ? 'you' : 'other-user'}`}>
							{message.message}
						</div>
					))}
				</div>
				<div className="chat-input">
					<input
						type="text"
						placeholder="Type your message..."
						value={newMessage}
						onChange={handleInputChange}
					/>
					<button onClick={handleSendMessage} className="send-button">
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChatBox;
