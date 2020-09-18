import axios from "axios"

const API_URL = "http://localhost:5000/books/"

class BookService {
  async create(name, description, price, example, author, category, rating, image) {
    const formData = new FormData();
    debugger
    if (image) {
      formData.append('image', image, image.name)
    }
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('example', example)
    formData.append('author', author)
    formData.append('category', category)
    formData.append('rating', rating)

    const response = await axios
      .post(API_URL + "create", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
    if (response.data) {
      return response.data
    }
    if (response.data.message) {
      console.log(response.data.message)
    }
  }

  async getAllBooks(params) {
    const response = await axios
      .get(API_URL + "", {
        params
      })

    if (response.data) {
      console.log(response.data.books)
      return response.data
    }

    if (response.data.message) {
      console.log(response.data.message)
    }
  }

  async getBookPage(id) {
    const response = await axios
      .get(API_URL + `books/${id}`, {})

    if (response.data) {
      return response.data
    }

    if (response.data.message) {
      console.log(response.data.message)
    }
  }

  async update() {
    const response = await axios
      .get(API_URL + "all", {})

    if (response.data) {
      return response.data
    }

    if (response.data.message) {
      console.log(response.data.message)
    }
  }

  async delete(id) {
    const response = await axios
      .post(API_URL + `delete?id=${id}`, {})

    if (response.data) {
      return response.data
    }

    if (response.data.message) {
      console.log(response.data.message)
    }
  }
}

export default new BookService()