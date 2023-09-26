import React, { useEffect, useState } from 'react';
import postService from '../../services/post.service';
import timestampConverter from '../../utils/ConvertTime';
import './NewsFeed.css'
import Comment from '../Comment/Comment';
import CommentForm from '../Comment/CommentForm';
import commentService from '../../services/comment.service';

const NewsFeed = ({ user }) => {
	const [posts, setPosts] = useState([]); // Store the list of posts

	useEffect(() => {
		postService.getAllPost()
			.then(response => {
				console.log(response.data);
				setPosts(response.data);
			})
			.catch(error => {
				console.log(error);
			})
	}, [])

	const handlePostSubmit = async (e) => {
		e.preventDefault();
		const newPost = e.target.post.value; // Get the new post text from the form
		if (newPost) {
			postService.createPost(newPost)
				.then(response => {
					console.log(response);
					// Add the new post to the list of posts
					setPosts([...posts, response.data]);
					e.target.reset(); // Clear the form
				})
				.catch(error => {
					console.log(error);
				})
		}
	};

	const deletePost = (postID) => {
		if (window.confirm("Are you sure to delete this post? ")) {
			postService.deletePost(postID)
				.then(response => {
					setPosts(oldPost => oldPost.filter(post => post._id !== postID));
				})
				.catch(error => {
					console.log(error);
				})
		}
	}

	const handleCommentSubmit = async (postID, content) => {
		try {
			commentService.createComment({ postID, content })
				.then(response => {
					console.log(response.data);
					setPosts(listPost => listPost.map(post => {
						if (post._id === postID) {
							post.comments.push(response.data)
						}
						return post;
					}))
				})
				.catch(err => {
					console.log(err);
				})
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h1>News Feed</h1>
			{user && <form onSubmit={handlePostSubmit}>
				<div className="form-group">
					<textarea
						name="post"
						className="form-control"
						placeholder="What's on your mind?"
						rows="3"
						required
					></textarea>
				</div>
				<button type="submit" className="btn btn-primary">
					Post
				</button>
			</form>}
			<hr />
			<div className="news-feed">
				{posts.map((post, index) => (
					<div className="post" key={index}>
						<div className="user-info col-sm-12">
							<div className='col-sm-3'>
								<div className='row'>
									<div className='col-sm-2'>
										<img
											src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" // Assuming 'avatar' is the URL of the profile picture
											alt="User Avatar"
											className="user-avatar"
										/>
									</div>
									<div className='col-sm-9'>
										<small className='row'>{post.user.name}</small>
										<small className='row'>{timestampConverter(post.createdAt)}</small>
									</div>
									<div className='col-sm-1' onClick={() => deletePost(post._id)}>
										x
									</div>
								</div>
							</div>
						</div>
						<p>{post.content}</p>
						<div className='comments'>
							<div>Comment: </div>
							{post.comments.map((comment, commentIndex) => (
								<div key={commentIndex} className="comment">
									<Comment comment={comment} />
								</div>
							))}
						</div>
						{user && <CommentForm onSubmit={(commentText) => handleCommentSubmit(post._id, commentText)} />}
					</div>
				))}
			</div>
		</div>
	);
};

export default NewsFeed;
