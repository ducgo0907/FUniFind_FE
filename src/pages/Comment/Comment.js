// Comment.js
import React, { useEffect } from 'react';
import './Comment.css'
import commentService from '../../services/comment.service';

const Comment = ({ comment, socket, goToProfile }) => {

	const deleteComment = () => {
		if (window.confirm("Are you sure to delete comment?")) {
			commentService.deletePost(comment._id)
				.then(response => {
					const commentDelete = response.data.data;
					socket.emit("deleteComment", { commentId: commentDelete._id, postId: commentDelete.post });
				})
				.catch(error => {
					console.log(error);
				})
		}
	}
	return (
		<div className="comment">
			<div className='col-sm-12'>
				<div className='row'>
					<div className='col-sm-2'>
						<div className='row'>
							<div className='col-sm-2'>
								<img
									src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" // Assuming 'avatar' is the URL of the profile picture
									alt="User Avatar"
									className="user-avatar-comment"
									onClick={() => goToProfile(comment.user._id)}
								/>
							</div>
							<small className='col-sm-8'>{comment.user.name}</small>
						</div>
					</div>
					<div className='col-sm-10'>
						<div className='row'>
							<p className='col-sm-11'>{comment.content}</p>
							<p className='col-sm-1' onClick={deleteComment}>x</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Comment;
