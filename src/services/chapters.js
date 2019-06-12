import axios from 'axios'

import { getConfig } from '../helpers/helpers'

const baseUrl = 'http://localhost:8000/api/chapters'

const getAll = async () => {
  const config = getConfig()
  const response = await axios.get(baseUrl, config)
  return response.data.results
}

const getOne = async (id) => {
  const config = getConfig()
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

const create = async (newObject) => {
  const config = getConfig()
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = getConfig()
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const remove = async (id) => {
  const config = getConfig()
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, getOne, create, update, remove }
