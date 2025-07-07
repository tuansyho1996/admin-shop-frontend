import axios from '../utils/axios'

const getProduct = async (id = 'all') => {
  try {
    const response = await axios.get(`/api/product/${id}`)
    return response.data.metadata
  } catch (error) {
    console.log(error)
  }
}
const getProductShop = async (page = 1) => {
  try {
    const query = new URLSearchParams({ page }).toString();
    const response = await axios.get(`/api/product/shop?${query}`)
    if (!response.status === 200) {
      return null
    }
    return response.data.metadata
  } catch (error) {
    console.error(error)
  }
}
const createProduct = async (data) => {
  try {
    const response = await axios.post('/api/product', data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
const updateProduct = async (data, _id) => {
  try {
    const response = await axios.post(`/api/product/update/${_id}`, data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`api/product/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductShop
}