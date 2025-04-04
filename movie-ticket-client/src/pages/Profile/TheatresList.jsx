import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import TheatreForm from './TheatreForm'
import { message, Table } from 'antd'
import { deleteTheatre, getAllTheatres as getAllTheatresAPI } from '../../apicalls/theatre'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setGetAllTheatres } from '../../redux/theatreListSlice'

function TheatresList() {
  const [showTheatreFormModel, setShowTheatreFormModel] = useState(false)
  const [selectedTheatre, setSelectedTheatre] = useState(null)
  const [formType, setFormType] = useState('add')
  const dispatch = useDispatch()
  const theatreList = useSelector(state => state?.theatreList?.getAllTheatres)

  // const redux = useSelector(state => state?.theatreList?.getAllTheatres)
  // console.log(redux)
  const navigate = useNavigate()

  const handleAddTheatre = () => {
    setShowTheatreFormModel(true)
    setSelectedTheatre(null)
    setFormType('add')
  }

  const handleEditTheatre = (record) => {
    setSelectedTheatre(record)
    setFormType('edit')
    setShowTheatreFormModel(true)
  }

  const handleDeleteTheatre = async (theatreId) => {
    try {
      const response = await deleteTheatre(theatreId)
      if (response.success) {
        message.success(response.message)
        // Refresh the theatre list after deletion
        fetchTheatres()
      } else {
        message.error(response.message)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  useEffect(() => {
    fetchTheatres()
  }, [])

  // get all theatres
  const fetchTheatres = async () => {
    try {
      const response = await getAllTheatresAPI()
      if (response.success) {
        dispatch(setGetAllTheatres(response.data))
        message.success(response.message)
      } else {
        message.error(response.message)
      }
    } catch (error) {
      message.error(error.message)
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
      title: <span className="uppercase">Actions</span>,
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <div className='flex gap-2'>
          <Button variant='outlined' title='Edit' onClick={() => handleEditTheatre(record)} />
          <Button variant='outlined' title='Delete' onClick={() => handleDeleteTheatre(record._id)} />
        </div>
      )
    }
  ]

  return (
    <div>
      <div className='flex justify-end'>
        <Button variant='outlined' title='Add Theatre' onClick={handleAddTheatre} />
      </div>

      <Table dataSource={theatreList} columns={columns} />

      {showTheatreFormModel && <TheatreForm
        showTheatreFormModel={showTheatreFormModel}
        setShowTheatreFormModel={setShowTheatreFormModel}
        selectedTheatre={selectedTheatre}
        setSelectedTheatre={setSelectedTheatre}
        formType={formType}
        setFormType={setFormType}
      />}
    </div>
  )
}

export default TheatresList
