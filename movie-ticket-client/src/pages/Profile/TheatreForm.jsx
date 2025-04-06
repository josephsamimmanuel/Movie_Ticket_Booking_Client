import { Button, Form, Input, message, Modal } from 'antd'
import React from 'react'
import { addTheatre, updateTheatre } from '../../apicalls/theatre'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setAddTheatre, setEditTheatre, setGetAllTheatresByUserId } from '../../redux/theatreListSlice'
import { showLoader, hideLoader } from '../../redux/loader'

function TheatreForm({ showTheatreFormModel, setShowTheatreFormModel, selectedTheatre, setSelectedTheatre, formType, setFormType }) {
  const dispatch = useDispatch()
  const user = useSelector(state => state?.users)
  const handleCancel = () => {
    setShowTheatreFormModel(false)
    setSelectedTheatre(null)
  }
  const handleSubmit = async (values) => {
    values.createdBy = user._id
    try {
      dispatch(showLoader())
      if (formType === 'add') {
        const response = await addTheatre(values)
        if (response.success) {
          dispatch(hideLoader())
          dispatch(setAddTheatre(response))
          dispatch(setGetAllTheatresByUserId(response?.theatreList))
          message.success(response.message)
          setShowTheatreFormModel(false)
          setSelectedTheatre(null)
          setFormType('add')
        }
        else{
          dispatch(hideLoader())
          message.error(response.message)
        }
      } else {
        const response = await updateTheatre(selectedTheatre._id, values)
        if (response.success) {
          dispatch(hideLoader())
          dispatch(setEditTheatre(response))
          dispatch(setGetAllTheatresByUserId(response?.theatreList))
          message.success(response.message)
          setShowTheatreFormModel(false)
          setSelectedTheatre(null)
          setFormType('edit')
        }
        else{
          dispatch(hideLoader())
          message.error(response.message)
        }
      }
    } catch (error) {
      dispatch(hideLoader())
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
