import axios from 'axios'

import { getConfig } from '../helpers/helpers'

const baseUrl = '/api/words'

const getOnePage = async (pageUrl=baseUrl) => {
  const response = await axios.get(pageUrl)
  return response.data
}

const getAll = async (pageUrl=baseUrl) => {
  let result = await getOnePage(pageUrl)
  if (result) {
    if (result.next) {
      return result.results.concat(await getAll(result.next))
    }
    return result.results
  } else {
    return result.results
  }
}

const getFiltered = async (startswith, source, target) => {
  if (!startswith) {
    return []
  }
  const url = `${baseUrl}/?startswith=${startswith}&source=${source}&target=${target}`
  const result = await getAll(url)
  return result
}

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

export default { getAll, getFiltered, create, update, remove }
