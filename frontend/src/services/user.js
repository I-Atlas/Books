import axios from 'axios'
import authHeader from './header'

const API_URL = 'http://localhost:5000/'

class UserService {
  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'))
  }
  

  async update(username, first_name, last_name, password, avatar ) {
    const formData = new FormData();
    debugger
    if (avatar) {
      formData.append('avatar', avatar, avatar.name)
    }
    formData.append('username', username)
    formData.append('first_name', first_name)
    formData.append('last_name', last_name)
    formData.append('password', password)
    const response = await axios
    .patch(API_URL + `users/${this.user.id}`, formData, {
      // username,
      // first_name,
      // last_name,
      // password,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${this.user.token}`
      }
    })
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data))
      return response.data
    }
    if (response.data.message) {
      console.log(response.data.message)
    }
  }

  getUserContent() {
    return axios.get(API_URL + 'users/', { headers: authHeader() })
  }
}

export default new UserService()