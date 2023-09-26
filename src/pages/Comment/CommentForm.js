// CommentForm.js
import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
	const [commentText, setCommentText] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (commentText.trim() === '') {
			return; // Prevent submitting empty comments
		}
		onSubmit(commentText);
		setCommentText('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<textarea
					className="form-control"
					placeholder="Add a comment..."
					value={commentText}
					onChange={(e) => setCommentText(e.target.value)}
					required
				></textarea>
			</div>
			<button type="submit" className="btn btn-primary">
				Post Comment
			</button>
		</form>
	);
};

export default CommentForm;
