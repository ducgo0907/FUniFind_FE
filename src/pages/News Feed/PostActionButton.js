import React, { useState } from 'react';
import './PostActionButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown, faLaugh } from '@fortawesome/free-solid-svg-icons';

const PostActionButton = () => {
	const [isHoveredButton, setIsHoveredButton] = useState(false);
	const [showIcons, setShowIcons] = useState(false);
	let hoverTimeout;

	const handleButtonMouseEnter = () => {
		hoverTimeout = setTimeout(() => {
			setIsHoveredButton(true);
			setShowIcons(true);
		}, 1000);
	};

	const handleButtonMouseLeave = () => {
		clearTimeout(hoverTimeout);
		setIsHoveredButton(false);
		setShowIcons(false);
	};

	return (
		<div className="post-action-container">
			<button
				className={`post-action-button btn btn-primary ${isHoveredButton ? 'hovered' : ''}`}
				onMouseEnter={handleButtonMouseEnter}
				onMouseLeave={handleButtonMouseLeave}
			>
				Like
			</button>
			{(showIcons || isHoveredButton) && (
				<div
					className={`post-action-icons ${isHoveredButton ? 'hovered' : ''}`}
					onMouseEnter={() => setIsHoveredButton(true)}
					onMouseLeave={() => setIsHoveredButton(false)}
				>
					<div className='btn btn-success'> <FontAwesomeIcon icon={faThumbsUp} /> Like</div>
					<div className='btn btn-success'><FontAwesomeIcon icon={faLaugh} />Haha</div>
					<div className='btn btn-success'><FontAwesomeIcon icon={faThumbsDown} />Dislike</div>
				</div>
			)}
		</div>
	);
};

export default PostActionButton;
