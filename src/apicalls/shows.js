import {axiosInstance} from './index'

export const createShow = async (show) => {
    const response = await axiosInstance.post('/api/shows/add-shows', show)
    return response.data
}

export const getAllShows = async () => {
    const response = await axiosInstance.get('/api/shows/get-all-shows')
    return response.data
}

export const editShow = async (show,showId) => {
    console.log(showId,show)
    const response = await axiosInstance.put(`/api/shows/edit-show/${showId}`, show)
    return response.data
}

export const getShowsByTheatre = async (theatreId) => {
    const response = await axiosInstance.get(`/api/shows/get-shows-by-theatre/${theatreId}`)
    return response.data
}

export const deleteShow = async (showId) => {
    const response = await axiosInstance.delete(`/api/shows/delete-show/${showId}`)
    return response.data
}







