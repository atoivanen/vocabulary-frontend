import axios from 'axios'

import { getConfig } from '../helpers/helpers'

const baseUrl = 'http://localhost:8000/api/chapters'

const getAll = async () => {
  const config = getConfig()
  const response = await axios.get(baseUrl, config)
  return response.data
}

const getOne = async (id) => {
  const config = getConfig()
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

const create = async (newObject) => {
  const config = getConfig()
  const response = await axios.post(`${baseUrl}/`, newObject, config)
  return response.data
}

const update = async (id, updatedObject) => {
  const config = getConfig()
  const response = await axios.patch(`${baseUrl}/${id}`, updatedObject, config)
  return response.data
}

const remove = async (id) => {
  const config = getConfig()
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const removeMany = async (ids) => {
  const config = getConfig()
  let promises = []
  ids.forEach(id => {promises.push(axios.delete(`${baseUrl}/${id}`, config))})
  const responses = await Promise.all(promises)
  return responses.map(response => response.data)
}

export default { getAll, getOne, create, update, remove, removeMany }
