import { axiosInstance } from "./index"

export const addTheatre = async (theatreData) => {
    const response = await axiosInstance.post('/api/theatres/add-theatre', theatreData)
    return response.data
}

export const getAllTheatres = async () => {
    const response = await axiosInstance.get('/api/theatres/get-all-theatres')
    return response.data
}

export const updateTheatre = async (theatreId, theatreData) => {
    const response = await axiosInstance.put(`/api/theatres/update-theatre/${theatreId}`, theatreData)
    return response.data
}

export const deleteTheatre = async (theatreId) => {
    const response = await axiosInstance.delete(`/api/theatres/delete-theatre/${theatreId}`)
    return response.data
}






