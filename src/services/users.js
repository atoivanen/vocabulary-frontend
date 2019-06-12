import axios from 'axios'

import { getConfig } from '../helpers/helpers'

const baseUrl = 'http://localhost:8000/api/users'

const getOne = async (id) => {
  const config = getConfig()
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(`${baseUrl}/`, newObject)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default { getOne, create, update, remove }
