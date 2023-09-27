import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/comments/'

class CommentService {

	async createComment({ content, postID }) {
		try {
			const response = await axios.post(API_URL + 'create', { content, postID }, { headers: authHeader() });
			return response.data;
		} catch (erorr) {
			return erorr;
		}
	}

	deletePost(commentID) {
		return axios.delete(API_URL + 'delete', {
			headers: authHeader(),
			params: {
				commentID
			},
		})
	}
}

export default new CommentService();
