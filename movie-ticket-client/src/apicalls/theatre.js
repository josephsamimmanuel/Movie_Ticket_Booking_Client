import { axiosInstance } from "./index"

export const addTheatre = async (theatreData) => {
    const response = await axiosInstance.post('/api/theatres/add-theatre', theatreData)
    return response.data
}

export const getAllTheatres = async () => {
    const response = await axiosInstance.get('/api/theatres/get-all-theatres')
    return response.data
}

export const getAllTheatresByUserId = async (userId) => {
    const response = await axiosInstance.get(`/api/theatres/get-all-theatres-by-user-id/${userId}`)
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

export const acceptTheatre = async (theatreId, isActive) => {
    const response = await axiosInstance.put(`/api/theatres/accept-theatre/${theatreId}`, { isActive })
    return response.data
}

export const ignoreTheatre = async (theatreId, isActive) => {
    const response = await axiosInstance.put(`/api/theatres/ignore-theatre/${theatreId}`, { isActive })
    return response.data
}

export const getAllUniqueTheatresForAMovieOnADate = async (movie, date) => {
    const response = await axiosInstance.get(`/api/theatres/get-all-unique-theatres-for-a-movie/${movie}/${date}`)
    return response.data
}

export const getShowDetails = async (showId, date) => {
    const response = await axiosInstance.get(`/api/theatres/get-show-details/${showId}/${date}`)
    return response.data
}














