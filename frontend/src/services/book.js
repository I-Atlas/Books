import axios from "axios"

const API_URL = "http://localhost:5000/books/"

class BookService {
  async create(name, description, price, example, author, rating) {
      return axios
      .post(API_URL + "create", {
            name,
            description,
            price,
            example,
            author,
            rating
      }
    )
  }

  async getAllBooks() {
    const response = await axios
    .get(API_URL + "all", {})

    if (response.data) {
      return response.data
    }
    
    if (response.data.message) {
      console.log(response.data.message)
    }
  }
}

export default new BookService()