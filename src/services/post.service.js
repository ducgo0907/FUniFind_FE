import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/posts/'

class PostService {
	getAllPost() {
		return axios.get(API_URL + 'all', { headers: authHeader() })
	};

	async createPost(content) {
		try {
			const response = await axios.post(API_URL + 'create', { content }, { headers: authHeader() });
			return response.data;
		} catch (erorr) {
			return erorr;
		}
	}

	deletePost(postID) {
		return axios.delete(API_URL + 'delete', {
			headers: authHeader(),
			params: {
				postID
			},
		})
	}

	getListPostPending() {
		return axios.get(API_URL + 'listApprove', {
			headers: authHeader()
		})
	}

	approve({ isApprove, postID }) {
		return axios.post(API_URL + 'approve', { isApprove, postID }, {
			headers: authHeader()
		})
	}
}

export default new PostService();
