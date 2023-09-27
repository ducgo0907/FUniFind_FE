import React, { useEffect, useState } from 'react';
import './PostActionButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faLaugh } from '@fortawesome/free-solid-svg-icons';
import interactionService from '../../services/interaction.service';

const PostActionButton = ({ post, user }) => {
	const [isHoveredButton, setIsHoveredButton] = useState(false);
	const [showIcons, setShowIcons] = useState(false);
	const [liked, setLiked] = useState(false);
	const [contentInteract, setContentInteract] = useState("LIKE");
	const [interaction, setInteraction] = useState({
		like: 0,
		haha: 0,
		dislike: 0,
	});
	let hoverTimeout;

	const INTERACTION_TYPES = {
		LIKE: 'LIKE',
		HAHA: 'HAHA',
		DISLIKE: 'DISLIKE',
	};

	const handleButtonMouseEnter = () => {
		hoverTimeout = setTimeout(() => {
			setShowIcons(true);
		}, 1000);
	};

	const handleButtonMouseLeave = () => {
		clearTimeout(hoverTimeout);
		setShowIcons(false);

	};

	const interactionPost = (type) => {
		interactionService
			.interactWithPost({ typeInteract: type, postID: post._id })
			.then((res) => {
				const interact = res.data.data;
				switch (interact.action) {
					case 'do':
						setLiked(true);
						updateInteraction(interact.type, 1);
						setContentInteract(interact.type);
						break;
					case 'undo':
						setLiked(false);
						setContentInteract(INTERACTION_TYPES.LIKE);
						updateInteraction(interact.type, -1);
						break;
					case 'change':
						setLiked(true);
						setContentInteract(interact.type);
						break;
					default:
						break;
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const updateInteraction = (type, typeAdd) => {
		switch (type) {
			case INTERACTION_TYPES.LIKE:
				setInteraction((oldInteract) => ({ ...oldInteract, like: oldInteract.like + 1 * typeAdd }));
				break;
			case INTERACTION_TYPES.HAHA:
				setInteraction((oldInteract) => ({ ...oldInteract, haha: oldInteract.haha + 1 * typeAdd }));
				break;
			case INTERACTION_TYPES.DISLIKE:
				setInteraction((oldInteract) => ({ ...oldInteract, dislike: oldInteract.dislike + 1 * typeAdd }));
				break;
			default:
				break;
		}
	}

	useEffect(() => {
		if (post.interactions.length > 0 && user) {
			let like = 0;
			let dislike = 0;
			let haha = 0;
			post.interactions.forEach((interaction) => {
				if (interaction.user._id === user.id) {
					setLiked(true);
					setContentInteract(interaction.type);
				}
				switch (interaction.type) {
					case INTERACTION_TYPES.LIKE:
						like++;
						break;
					case INTERACTION_TYPES.HAHA:
						haha++;
						break;
					case INTERACTION_TYPES.DISLIKE:
						dislike++;
						break;
					default:
						break;
				}
			});
			setInteraction({ like, dislike, haha });
		}
	}, [post.interactions, user]);

	const renderButton = () => {
		switch (contentInteract) {
			case INTERACTION_TYPES.LIKE:
				return (
					<><FontAwesomeIcon icon={faThumbsUp} /> Like</>
				)
			case INTERACTION_TYPES.HAHA:
				return (
					<><FontAwesomeIcon icon={faLaugh} /> Haha</>
				)
			case INTERACTION_TYPES.DISLIKE:
				return (
					<><FontAwesomeIcon icon={faThumbsDown} /> Dislike</>
				)
			default:
				break;
		}
	}

	return (
		<div className="post-action-container">
			<div>
				{interaction.like} people like, {interaction.haha} people haha, {interaction.dislike} people dislike
			</div>
			<button
				className={`post-action-button btn btn-primary ${isHoveredButton ? 'hovered' : ''} ${liked ? contentInteract : ''}`}
				onClick={() => interactionPost(contentInteract)}
				onMouseEnter={handleButtonMouseEnter}
				onMouseLeave={handleButtonMouseLeave}
			>
				{renderButton()}
			</button>
			{(showIcons || isHoveredButton) && (
				<div className={`post-action-icons ${isHoveredButton ? 'hovered' : ''}`}
					onMouseEnter={() => setIsHoveredButton(true)}
					onMouseLeave={() => setIsHoveredButton(false)}
				>
					<div className="btn btn-success"
						onClick={() => interactionPost(INTERACTION_TYPES.LIKE)}
					>
						<FontAwesomeIcon icon={faThumbsUp} /> Like
					</div>
					<div className="btn btn-success"
						onClick={() => interactionPost(INTERACTION_TYPES.HAHA)}
					>
						<FontAwesomeIcon icon={faLaugh} /> Haha
					</div>
					<div className="btn btn-success"
						onClick={() => interactionPost(INTERACTION_TYPES.DISLIKE)}
					>
						<FontAwesomeIcon icon={faThumbsDown} /> Dislike
					</div>
				</div>
			)}
		</div>
	);
};

export default PostActionButton;
