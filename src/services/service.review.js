import axios from '../utils/axios'

const getReviews = async (id = 'all') => {
  try {
    const res = await axios.get(`/api/review/${id}`)
    return res.data.metadata
  } catch (error) {
    console.log(error)
  }
}
//     const res = await axios.delete(`/api/category/top-category/${_id}`)
const deleteReview = async (_id) => {
  try {
    const res = await axios.delete(`/api/review/${_id}`)
    return res
  } catch (error) {
    console.log(error)
  }
}
export { getReviews, deleteReview }