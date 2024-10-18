import axios from '../utils/axios'


const uploadImageToS3 = async (file) => {
  try {
    const formData = new FormData()
    formData.append('image', file)
    const res = await axios.post('/api/media', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}
const getImgs = async () => {
  try {
    const res = await axios.get('api/media')
    console.log('get image service')
    return res.data
  } catch (error) {
    console.error(error)
  }
}
const deleteImg = async (id) => {
  try {
    const res = await axios.delete(`/api/media/${id}`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export {
  uploadImageToS3,
  getImgs,
  deleteImg
}