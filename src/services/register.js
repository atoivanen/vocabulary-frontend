import axios from 'axios'
const baseUrl = 'http://localhost:8000/api/register/'

const register = async (newObject) => {
  const response = await axios.post(`${baseUrl}`, newObject)
  return response.data
}

export default { register }
