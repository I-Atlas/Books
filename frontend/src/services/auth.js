import axios from "axios"

const API_URL = "http://localhost:5000/"

class AuthService {
  register(username, email, password) {
      return axios
      .post(API_URL + "register", {
        username,
        email,
        password
      })
  }

  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data))
        }
        if (response.data.message) {
          console.log(response.data.message)
        }
        // console.log(response.data.token)
        return response.data
      })
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))
  }
}

export default new AuthService()