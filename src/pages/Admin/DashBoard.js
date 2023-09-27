// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import Post from './Post';
import './DashBoard.css'
import postService from '../../services/post.service';
import { toast } from 'react-toastify';

const AdminDashboard = ({ user }) => {
	const [posts, setPosts] = useState([]);
	const [admin, setAdmin] = useState(false);

	const approvePost = (postID) => {
		postService.approve({ postID, isApprove: true })
			.then(res => {
				toast.success('Approve successfully', {
					position: "bottom-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
				setPosts(listPost => listPost.filter(post => post._id !== res.data.data._id));
			})
			.catch(err => {
				console.log(err);
			})
	};

	const rejectPost = (postID) => {
		postService.approve({ postID, isApprove: false })
			.then(res => {
				toast.warn('Reject successfully', {
					position: "bottom-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
				setPosts(listPost => listPost.filter(post => post._id !== res.data.data._id));
			})
			.catch(err => {
				console.log(err);
			})
	};

	useEffect(() => {
		if (user && user.isAdmin) {
			setAdmin(true);
			postService.getListPostPending()
				.then(res => {
					setPosts(res.data.data)
				})
				.catch(err => {
					console.log(err);
				})
		}
	}, []);

	return (
		<div>
			{
				admin ?
					(<div className={`${admin ? 'admin-dashboard container' : 'hide'}`} >
						<h1>Admin Dashboard (List Post Pending)</h1>
						{
							posts.map((post) => (
								<Post
									key={post._id}
									post={post}
									approvePost={approvePost}
									rejectPost={rejectPost}
								/>
							))
						}
					</div >)
					: (<div>You don't have permisson to access</div>)
			}
		</div>

	);
};

export default AdminDashboard;
