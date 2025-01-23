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
const uploadManyImage = async (files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));
  const response = await axios.post('/api/media/many', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
const getImgs = async () => {
  try {
    const res = await axios.get('/api/media')
    return res.data
  } catch (error) {
    console.error(error)
  }
}
const deleteImg = async (name) => {
  try {
    const res = await axios.delete(`/api/media/${name}`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}
const deleteMultipleImages = async (name) => {
  try {
    const res = await axios.delete(`/api/media/multiple`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export {
  uploadManyImage,
  uploadImageToS3,
  getImgs,
  deleteImg
}