import axios from 'axios'
import authHeader from './header'

const API_URL = 'http://localhost:5000/'

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserContent() {
    return axios.get(API_URL + 'user', { headers: authHeader() })
  }
}

export default new UserService();