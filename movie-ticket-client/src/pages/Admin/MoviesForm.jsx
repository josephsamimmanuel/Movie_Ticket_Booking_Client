import React from 'react'
import { Button, Col, Form, message, Modal, Row, Select } from 'antd'
import { useDispatch } from 'react-redux'
import { hideLoader, showLoader } from '../../redux/loaderSlice'
import { addMovie, getAllMovies, updateMovie } from '../../apicalls/movies'
import moment from 'moment'
import { setAddMovie, setEditMovie, setGetAllMovies } from '../../redux/moviesSlice'
function MoviesForm({ showMovieFormModel, setShowMovieFormModel, selectedMovie, setSelectedMovie, formType }) {
    const dispatch = useDispatch()
    const [form] = Form.useForm()

    if(selectedMovie){
        form.setFieldsValue({
            ...selectedMovie,
            releaseDate: moment(selectedMovie.releaseDate).format('YYYY-MM-DD')
        })
    }

    const fetchMovies = async () => {
        const response = await getAllMovies()
        dispatch(setGetAllMovies(response.data))
    }

    const handleSubmit = async (values) => {
        try{
            let response = null;
            dispatch(showLoader())
            
            const formattedValues = {
                ...values,
                releaseDate: values.releaseDate.split('T')[0]
            }
            console.log(formattedValues)

            if(formType === 'add'){
                response = await addMovie(formattedValues)
                console.log(response)
                fetchMovies()
                dispatch(setAddMovie(response.data))
            }
            else{
                response = await updateMovie(selectedMovie._id, formattedValues)
                console.log(response)
                fetchMovies()
                dispatch(setEditMovie(response.data))
            }
            if(response.success){
                dispatch(hideLoader())
                message.success(response.message)
                setShowMovieFormModel(false)
                setSelectedMovie(null)
                form.resetFields()
            }
            else{
                dispatch(hideLoader())
                message.error(response.message)
            }
        }catch(error){
            dispatch(hideLoader())
            message.error(error.message)
        }
    }

    return (
        <div>
            <Modal
                title={formType === 'add' ? 'Add Movie' : 'Edit Movie'}
                open={showMovieFormModel}
                onCancel={() => {
                    setShowMovieFormModel(false)
                    setSelectedMovie(null)
                    form.resetFields()
                }}
                footer={null}
                width={800}
            >
                <Form 
                    layout='vertical' 
                    onFinish={handleSubmit}
                    form={form}
                    initialValues={{
                        language: 'English',
                        genre: 'Comedy',
                        ...selectedMovie
                    }}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label='Title' name='title' rules={[{ required: true, message: 'Please enter movie title' }]}>
                                <input placeholder='Enter Movie Title' type='text' />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label='Description' name='description' rules={[{ required: true, message: 'Please enter movie description' }]}>
                                <textarea placeholder='Enter Movie Description' type='text' />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label='Duration' name='duration' rules={[{ required: true, message: 'Please enter movie duration' }]}>
                                <input placeholder='Enter Movie Duration' type='text' />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label='Language' name='language' rules={[{ required: true, message: 'Please select language' }]}>
                                <Select>
                                    <Select.Option value='English'>English</Select.Option>
                                    <Select.Option value='Hindi'>Hindi</Select.Option>
                                    <Select.Option value='Kannada'>Kannada</Select.Option>
                                    <Select.Option value='Tamil'>Tamil</Select.Option>
                                    <Select.Option value='Telugu'>Telugu</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label='Genre' name='genre' rules={[{ required: true, message: 'Please select genre' }]}>
                                <Select>
                                    <Select.Option value='Action'>Action</Select.Option>
                                    <Select.Option value='Comedy'>Comedy</Select.Option>
                                    <Select.Option value='Drama'>Drama</Select.Option>
                                    <Select.Option value='Horror'>Horror</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label='Movie Release Date' name='releaseDate' rules={[{ required: true, message: 'Please enter release date' }]}>
                                <input placeholder='Enter Movie Release Date' type='date' />
                            </Form.Item>
                        </Col>
                        <Col span={16}>
                            <Form.Item label='Poster URL' name='posterUrl' rules={[{ message: 'Please enter poster URL' }]}>
                                <input placeholder='Enter Movie Poster URL' type='text' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className='flex justify-end gap-2'>
                        <Button type='default' onClick={() => {
                            setShowMovieFormModel(false)
                            setSelectedMovie(null)
                            form.resetFields()
                        }}>
                            Cancel
                        </Button>
                        <Button type='primary' htmlType='submit'>
                            {formType === 'add' ? 'Add Movie' : 'Edit Movie'}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default MoviesForm
