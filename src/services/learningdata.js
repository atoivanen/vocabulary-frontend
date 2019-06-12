import axios from 'axios'

import { getConfig } from '../helpers/helpers'

const baseUrl = 'http://localhost:8000/api/learningdata'

const create = async (newObject) => {
  const config = getConfig()
  const response = await axios.post(`${baseUrl}/`, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = getConfig()
  const response = await axios.put(`${baseUrl}/${id}/`, newObject, config)
  return response.data
}

const remove = async (id) => {
  const config = getConfig()
  const response = await axios.delete(`${baseUrl}/${id}/`, config)
  return response.data
}

export default { create, update, remove }
