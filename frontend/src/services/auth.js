import axios from "axios"

const API_URL = "http://localhost:5000/"

class AuthService {
  async timeout(ms) {
    await new Promise(resolve => setTimeout(resolve, ms))
  }

  async register(username, email, password) {
      return axios
      .post(API_URL + "register", {
        username,
        email,
        password
      })
      .then(
        await this.timeout(1000)
      )
  }

  async login(email, password) {
    localStorage.removeItem("user")
    const response = await axios
      .post(API_URL + "login", {
        email,
        password
      })
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data))
    }
    if (response.data.message) {
      console.log(response.data.message)
    }
    return response.data
  }

  async logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))
  }
}

export default new AuthService()