import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import TheatreForm from './TheatreForm'
import { message, Table } from 'antd'
import { deleteTheatre, getAllTheatresByUserId as getAllTheatresAPI } from '../../apicalls/theatre'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setGetAllTheatresByUserId } from '../../redux/theatreListSlice'
import { showLoader, hideLoader } from '../../redux/loader'
import ConfirmationModal from '../../components/ConfirmationModal'
import Shows from './Shows'

function TheatresList() {
  const [showTheatreFormModel, setShowTheatreFormModel] = useState(false)
  const [selectedTheatre, setSelectedTheatre] = useState(null)
  const [formType, setFormType] = useState('add')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [theatreDeleteId, setTheatreDeleteId] = useState(null)
  const [openShowsModel, setOpenShowsModel] = useState(false)
  const dispatch = useDispatch()
  const theatreList = useSelector(state => state?.theatreList?.getAllTheatresByUserId)
  const userId = useSelector(state => state?.users?.users._id)

  const redux = useSelector(state => state)
  console.log(redux)
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

  const handleDeleteClick = (theatreId) => {
    setTheatreDeleteId(theatreId)
    setShowDeleteModal(true)
  }

  const handleShowsClick = (record) => {
    setSelectedTheatre(record)
    setOpenShowsModel(true)
  }

  const handleDeleteConfirm = async () => {
    if (theatreDeleteId) {
      await handleDeleteTheatre(theatreDeleteId)
      setShowDeleteModal(false)
      setTheatreDeleteId(null)
    }
  }

  const handleDeleteTheatre = async (theatreId) => {
    try {
      dispatch(showLoader())
      const response = await deleteTheatre(theatreId)
      if (response.success) {
        dispatch(hideLoader())
        message.success(response.message)
        dispatch(setGetAllTheatresByUserId(response?.theatreList))
      } else {
        dispatch(hideLoader())
        message.error(response.message)
      }
    } catch (error) {
      dispatch(hideLoader())
      message.error(error.message)
    }
  }

  useEffect(() => {
      fetchTheatres()
  }, [])

  // get all theatres
  const fetchTheatres = async () => {
    try {
      dispatch(showLoader())
      const response = await getAllTheatresAPI(userId)
      if (response.success) {
        dispatch(setGetAllTheatresByUserId(response.data))
        dispatch(hideLoader())
        message.success(response.message)
      } else {
        dispatch(hideLoader())
        message.error(response.message)
      }
    } catch (error) {
      dispatch(hideLoader())
      message.error(error.response.data.message)
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
          {(record.status === 'Rejected' && record.isActive === false) ? 'Inactive' : (record.isActive === true) ? 'Active' : 'Pending/Blocked'}
        </span>
      ),
    },
    {
      title: <span className="uppercase">Actions</span>,
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <div className='flex gap-2'>
          {(record.isActive === false && record.status === 'Rejected') ? '' : <Button variant='outlined' title='Edit' onClick={() => handleEditTheatre(record)} /> }
          <Button variant='outlined' title='Delete' onClick={() => handleDeleteClick(record._id)} />
          {record.isActive && <Button variant='outlined' title='Shows' onClick={() => handleShowsClick(record)} />}
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

      {openShowsModel && <Shows 
          openShowsModel={openShowsModel} 
          setOpenShowsModel={setOpenShowsModel} 
          theatre={selectedTheatre} />}

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Theatre"
        message="Are you sure you want to delete this theatre?"
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonType="danger"
      />
    </div>
  )
}

export default TheatresList
