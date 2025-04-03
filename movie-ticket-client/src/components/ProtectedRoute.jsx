import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { GetCurrentUser } from '../apicalls/users'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getCurrentUser = async () => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
            return
        }

        try {
            const response = await GetCurrentUser()
            console.log('response',response)
            if(response.success){
                setUser(response.data)
            }
            else{
                setUser(null)
                message.error(response.message)
            }
        }catch(error){
            setUser(null)
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
    user && (
    <div>
        {user.name}
      {children}
    </div>
    )
  )
}

export default ProtectedRoute
