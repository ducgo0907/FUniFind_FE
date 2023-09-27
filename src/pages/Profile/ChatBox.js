// ChatBox.js
import React, { useState } from 'react';
import './ChatBox.css'
const ChatBox = ({ isOpen, onClose, userProfile }) => {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');

	const handleInputChange = (e) => {
		setNewMessage(e.target.value);
	};

	const handleSendMessage = () => {
		if (newMessage.trim() !== '') {
			setMessages([...messages, { text: newMessage }]);
			setNewMessage('');
		}
	};

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
						<div key={index} className="message">
							{message.text}
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
