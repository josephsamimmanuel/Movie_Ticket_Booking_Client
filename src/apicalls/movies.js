import { axiosInstance } from './index'

export const addMovie = async (movieData) => {
    const response = await axiosInstance.post('/api/movies/add-movie', movieData)
    return response.data
}

export const getAllMovies = async () => {
    const response = await axiosInstance.get('/api/movies/get-all-movies')
    return response.data
}

export const autoSearch = async (movieName) => {
    const response = await axiosInstance.get(`/api/movies/auto-search/${movieName}`)
    return response.data
}

export const getMovieById = async (movieId) => {
    const response = await axiosInstance.get(`/api/movies/get-movie/${movieId}`)
    return response.data
}

export const updateMovie = async (movieId, movieData) => {
    const response = await axiosInstance.put(`/api/movies/update-movie/${movieId}`, movieData)
    return response.data
}

export const deleteMovie = async (movieId) => {
    const response = await axiosInstance.delete(`/api/movies/delete-movie/${movieId}`)
    return response.data
}













