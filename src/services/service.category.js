import axios from '../utils/axios'

const getCategories = async (id = 'all') => {
  try {
    const res = await axios.get(`/api/category/${id}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
const createCategory = async (data) => {
  try {
    const res = await axios.post(`/api/category`, data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}
const updateCategory = async (data, id) => {
  try {
    const res = await axios.put(`/api/category/${id}`, data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}
const deleteCategory = async (id) => {
  try {
    const res = await axios.delete(`api/category/${id}`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}
export {
  getCategories,
  createCategory,
  updateCategory, deleteCategory
}