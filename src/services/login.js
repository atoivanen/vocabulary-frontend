import axios from 'axios'
const baseUrl = 'http://localhost:8000/api/token/'

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.withCredentials = true

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
