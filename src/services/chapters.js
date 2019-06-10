import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/chapters'

let token = null

const setToken = newToken => {
  token = `Token ${newToken}`
}

const resetToken = () => {
  token = null
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config)
  return response.data.results
}

const getOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, getOne, create, update, remove, setToken, resetToken }
