import axios from 'axios';

const API_URL = 'http://localhost:8080/users/'

class UserService {
	getUserById(id) {
		return axios.get(API_URL + id)
	}
}

export default new UserService();
