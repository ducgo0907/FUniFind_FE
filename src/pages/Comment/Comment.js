// Comment.js
import React from 'react';
import './Comment.css'

const Comment = ({ comment }) => {
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
								/>
							</div>
							<small className='col-sm-8'>{comment.user.name}</small>
						</div>
					</div>
					<p className='col-sm-11'>{comment.content}</p>
				</div>
			</div>
		</div>
	);
};

export default Comment;
