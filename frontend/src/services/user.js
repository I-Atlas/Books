import axios from 'axios'
import authHeader from './header'

const API_URL = 'http://localhost:5000/'

class UserService {
  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'))
  }
  

  async update(username, first_name, last_name, avatar) {
    return axios
    .put(API_URL + `update/${this.user.id}`, {
      username,
      first_name,
      last_name,
      avatar
    })
  }

  getUserContent() {
    return axios.get(API_URL + 'profile', { headers: authHeader() })
  }
}

export default new UserService()