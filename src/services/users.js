import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/users'

const getFirstPage = async () => {
  const response = await axios.get(baseUrl)
  return response.data.results
}

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

export default { getFirstPage, getAll, create, update, remove }
