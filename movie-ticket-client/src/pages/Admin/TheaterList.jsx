import { Button, message, Table } from 'antd'
import React, { useEffect } from 'react'
import { getAllTheatres } from '../../apicalls/theatre'
import { useDispatch, useSelector } from 'react-redux'
import { setGetAllTheatres } from '../../redux/theatreListSlice'
import { acceptTheatre, ignoreTheatre } from '../../apicalls/theatre'
import { showLoader, hideLoader } from '../../redux/loaderSlice'

function TheaterList() {
  const dispatch = useDispatch()
  const theatres = useSelector((state) => state.theatreList.getAllTheatres)

  useEffect(() => {
    fetchTheatres()
  }, [])

  const fetchTheatres = async () => {
    try {
      dispatch(showLoader())
      const response = await getAllTheatres()
      if (response.success) {
        dispatch(hideLoader())
        dispatch(setGetAllTheatres(response.data))
        message.success(response.message)
      } else {
        dispatch(hideLoader())
        message.error(response.message)
      }
    } catch (error) {
      dispatch(hideLoader())
      console.log(error)
    }
  }

  const handleAcceptTheatre = async (theatreId, isActive) => {
    try {
      dispatch(showLoader())
      const response = await acceptTheatre(theatreId, isActive)
      if (response.success) {
        dispatch(hideLoader())
        message.success(response.message)
        fetchTheatres()
      } else {
        dispatch(hideLoader())
        message.error(response.message)
      }
    } catch (error) {
      dispatch(hideLoader())
      console.log(error)
    }
  }

  const handleIgnoreTheatre = async (theatreId, isActive) => {
    try {
      dispatch(showLoader())
      const response = await ignoreTheatre(theatreId, isActive)
      if (response.success) {
        dispatch(hideLoader())
        message.success(response.message)
        fetchTheatres()
      } else {
        dispatch(hideLoader())
        message.error(response.message)
      }
    } catch (error) {
      dispatch(hideLoader())
      console.log(error)
    }
  }

  const columns = [
    {
      title: <span className="uppercase">Theatre Name</span>,
      dataIndex: 'theatreName',
      key: 'theatreName',
    },
    {
      title: <span className="uppercase">Address</span>,
      dataIndex: 'address',
      key: 'address',
    },
    { 
      title: <span className="uppercase">Phone Number</span>,
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: <span className="uppercase">Email</span>,
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: <span className="uppercase">Is Active</span>,
      dataIndex: 'isActive',
      key: 'isActive',
      render: (_, record) => (
        <span className={`${record.isActive ? 'text-green-500' : 'text-red-500'}`}>
          {(record.status === 'Rejected' && record.isActive === false) ? 'Rejected' : (record.isActive === true) ? 'Active' : 'Pending/Blocked'}
        </span>
      ),
    },
    {
      title: <span className="uppercase">Actions</span>,
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) =>  (
          record.isActive || (record.status === 'Rejected' && record.isActive === false) ? (
            <div className="flex gap-2">
            <span>{record.status}</span>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button type="primary" onClick={() => handleAcceptTheatre(record._id, true)}>Accept</Button>
            <Button type="danger" onClick={() => handleIgnoreTheatre(record._id, false)}>Ignore</Button>
          </div>
        )
      ),
    },
  ]
  return (
    <div>
      <Table columns={columns} dataSource={theatres} />
    </div>
  )
}

export default TheaterList
