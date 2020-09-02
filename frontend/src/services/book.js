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
      })
    }
}

export default new BookService()