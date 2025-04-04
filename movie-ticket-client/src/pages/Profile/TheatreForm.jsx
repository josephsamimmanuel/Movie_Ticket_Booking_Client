import { Button, Form, Input, message, Modal } from 'antd'
import React, { useEffect } from 'react'
import { addTheatre, getAllTheatres, updateTheatre } from '../../apicalls/theatre'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setAddTheatre, setEditTheatre, setGetAllTheatres } from '../../redux/theatreListSlice'

function TheatreForm({ showTheatreFormModel, setShowTheatreFormModel, selectedTheatre, setSelectedTheatre, formType, setFormType }) {

  const redux = useSelector(state => state)
  console.log(redux)
  const dispatch = useDispatch()

  const handleCancel = () => {
    setShowTheatreFormModel(false)
    setSelectedTheatre(null)
  }

  useEffect(() => {
    fetchTheatres()
  }, [])

  const fetchTheatres = async () => {
    const response = await getAllTheatres()
    if (response.success) {
      dispatch(setGetAllTheatres(response.data))
    }
  }
  const handleSubmit = async (values) => {
    try {
      if (formType === 'add') {
        const response = await addTheatre(values)
        if (response.success) {
          dispatch(setAddTheatre(response))
          // Refresh the theatre list after addition
          fetchTheatres()
          message.success(response.message)
          setShowTheatreFormModel(false)
          setSelectedTheatre(null)
          setFormType('add')
        }
      } else {
        const response = await updateTheatre(selectedTheatre._id, values)
        if (response.success) {
          dispatch(setEditTheatre(response))
          // Refresh the theatre list after editing
          fetchTheatres()
          message.success(response.message)
          setShowTheatreFormModel(false)
          setSelectedTheatre(null)
          setFormType('edit')
        }
      }
    } catch (error) {
      message.error(error.message)
    }
  }



  return (
    <div>
      <Modal title={formType === 'add' ? 'Add Theatre' : 'Edit Theatre'} open={showTheatreFormModel} onCancel={() => setShowTheatreFormModel(false)} footer={false}>
        <Form layout='vertical' initialValues={{ ...selectedTheatre }} onFinish={handleSubmit}>
          <Form.Item  label='Theatre Name' name='theatreName' rules={[{ required: true, message: 'Theatre Name is required' }]}>
            <Input />
          </Form.Item>
          <Form.Item label='Address' name='address' rules={[{ required: true, message: 'Address is required' }]}>
            <textarea rows={4} />
          </Form.Item>
          <Form.Item label='Phone Number' name='phoneNumber' rules={[{ required: true, message: 'Phone Number is required' }]}>
            <Input />
          </Form.Item>
          <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Email is required' }]}>
            <Input />
          </Form.Item>
          <div className='flex justify-end gap-2'>
            <Button type='default' onClick={() => handleCancel()}>Cancel</Button>
            <Button type='primary' htmlType='submit'>{formType === 'add' ? 'Add Theatre' : 'Edit Theatre'}</Button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default TheatreForm
