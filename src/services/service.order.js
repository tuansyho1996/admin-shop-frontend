import axios from '../utils/axios'

const getOrders = async (id = 'all') => {
    try {
        const res = await axios.get(`/api/order/${id}`)
        return res.data.metadata
    } catch (error) {
        console.log(error)
    }
}

export {
    getOrders
}