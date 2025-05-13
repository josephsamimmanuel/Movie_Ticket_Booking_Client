import { message } from 'antd'
import React, { useEffect } from 'react'
import { GetCurrentUser } from '../apicalls/users'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUsers } from '../redux/usersSlice'
import { useSelector } from 'react-redux'
import { showLoader, hideLoader } from '../redux/loader'

function ProtectedRoute({ children }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { users } = useSelector((state) => state?.users)

    const getCurrentUser = async () => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
            return
        }

        try {
            const response = await GetCurrentUser()
            dispatch(showLoader())
            if (response.success) {
                dispatch(hideLoader())
                dispatch(setUsers(response.data))
            }
            else {
                dispatch(hideLoader())
                dispatch(setUsers(null))
                message.error(response.message)
            }
        } catch (error) {
            dispatch(hideLoader())
            dispatch(setUsers(null))
            message.error(error.message || 'Something went wrong')
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
        }
        getCurrentUser()
    }, [navigate])


    return (
        users && (
            <div className='layout p-1'>
                <div className="header bg-primary flex justify-between items-center p-2">
                    <div>
                        <h1 className='text-white text-2xl font-bold cursor-pointer'
                            onClick={() => {
                                navigate('/')
                            }}
                        >CineBook</h1>
                    </div>
                    <div className='bg-white p-1 rounded-md flex justify-between items-center gap-2'>
                        <i class="ri-shield-user-line text-xl"></i>
                        <h1 className='text-sm underline cursor-pointer'
                            onClick={() => {
                                console.log(users)
                                if (users.isAdmin) {
                                    navigate('/admin')
                                }
                                else {
                                    navigate('/profile')
                                }
                            }}
                        >{users?.name}</h1>
                        <i className="ri-logout-circle-r-line text-xl cursor-pointer"
                            onClick={() => {
                                localStorage.removeItem('token')
                                navigate('/login')
                            }}
                        ></i>
                    </div>
                </div>
                <div className="content mt-1">
                    {children}
                </div>
            </div>
        )
    )
}

export default ProtectedRoute
