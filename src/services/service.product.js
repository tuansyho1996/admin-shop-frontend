import axios from '../utils/axios'

const getProduct = async (id = 'all') => {
  try {
    const response = await axios.get(`/api/product/${id}`)
    return response.data.metadata
  } catch (error) {
    console.log(error)
  }
}
const getProductsByCategory = async (category, page = 1) => {
  try {
    const query = new URLSearchParams({ page }).toString();
    const response = await axios.get(`/api/product-category/${category}?${query}`)
    if (!response.status === 200) {
      return null
    }
    return response.data.metadata
  } catch (error) {
    console.error(error)
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
const convertPricesToEth = async () => {
  try {
    const response = await axios.get('/api/product/convert-prices-to-eth')
    return response.data
  } catch (error) {
    console.error('Error converting prices:', error)
    throw error
  }
}

export {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductShop,
  convertPricesToEth,
  getProductsByCategory
}