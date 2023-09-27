import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/interactions/'

class InteractionService {
	interactWithPost({ postID, typeInteract }) {
		return axios.post(API_URL + 'interact', { postID, typeInteract },{
			headers: authHeader()
		})
	}
}

export default new InteractionService();
