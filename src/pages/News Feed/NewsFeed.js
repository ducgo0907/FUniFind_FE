import React, { useEffect, useState } from 'react';
import postService from '../../services/post.service';
import timestampConverter from '../../utils/ConvertTime';
import './NewsFeed.css'
import Comment from '../Comment/Comment';
import CommentForm from '../Comment/CommentForm';
import commentService from '../../services/comment.service';
import socketIOClient from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PostActionButton from './PostActionButton';

const host = 'http://localhost:8080';

const NewsFeed = ({ user }) => {
	const [posts, setPosts] = useState([]); // Store the list of posts
	const [socket, setSocket] = useState(null);
	const nav = useNavigate();

	useEffect(() => {
		const newSocket = socketIOClient.connect(host);
		setSocket(newSocket);

		postService.getAllPost()
			.then(response => {
				setPosts(response.data);
			})
			.catch(error => {
				console.log(error);
			})

		return () => {
			newSocket.disconnect();
		}
	}, [])

	useEffect(() => {
		// Listen for events when the socket is available
		if (socket) {
			socket.on('getComment', response => {
				if (response.data) {
					setPosts(listPost => listPost.map(post => {
						if (post._id === response.data.post) {
							const isExisted = post.comments.find(comment => comment._id === response.data._id);
							if (!isExisted)
								post.comments.push(response.data);
						}
						return post;
					}))
				}
			});

			socket.on('deletedComment', data => {
				if (data) {
					setPosts(listPost => listPost.map(post => {
						if (post._id === data.postId) {
							post.comments = post.comments.filter(comment => comment._id !== data.commentId)
						}
						return post;
					}))
				}
			})
		}
	}, [socket])

	const handleShowToast = (message) => {
		toast.success(message, {
			position: "bottom-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
		});
	};

	const handlePostSubmit = async (e) => {
		e.preventDefault();
		const newPost = e.target.post.value; // Get the new post text from the form
		if (newPost) {
			postService.createPost(newPost)
				.then(response => {
					handleShowToast("Post created successfully! Waiting for admin approve.")
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
					socket.emit('sendComment', response.data);
				})
				.catch(err => {
					console.log(err);
				})
		} catch (error) {
			console.error(error);
		}
	};

	const goToProfile = (id) => {
		nav(`/${id}`);
	}

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
											onClick={() => goToProfile(post.user._id)}
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
						<PostActionButton post={post} user={user} />
						<div className='comments'>
							<div>Comment: </div>
							{post.comments.map((comment, commentIndex) => (
								<div key={commentIndex} className="comment">
									<Comment comment={comment} socket={socket} goToProfile={goToProfile} />
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
