import { axiosInstance } from './index'

// Register a new user
export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/api/users/register', userData)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

// Login a user
export const loginUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/api/users/login', userData)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

// Get current user
export const GetCurrentUser = async () => {
    try {
        const response = await axiosInstance.get('/api/users/get-current-user')
        return response.data
    } catch (error) {
        return error?.response?.data
    }
}

