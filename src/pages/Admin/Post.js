// src/components/Post.js
import React from 'react';

const Post = ({ post, approvePost, rejectPost }) => {
	return (
		<div className="row">
			<div className='col-sm-9'>
				<h2>{post.content}</h2>
			</div>
			<div className="col-sm-2">
				<button className='actions btn btn-success' onClick={() => approvePost(post._id)}>Approve</button>
				<button className='actions btn btn-danger' onClick={() => rejectPost(post._id)}>Reject</button>
			</div>
		</div>
	);
};

export default Post;
