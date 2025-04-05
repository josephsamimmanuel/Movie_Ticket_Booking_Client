import { Form, Input, Modal, Row, Col, Table, message, Select } from 'antd'
import React, { useState, useEffect } from 'react'
import Button from '../../../components/Button'
import moment from 'moment'
import { createShow } from '../../../apicalls/shows'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { showLoader, hideLoader } from '../../../redux/loaderSlice'
import { getAllMovies } from '../../../apicalls/movies'
import { getShowsByTheatre, editShow, deleteShow } from '../../../apicalls/shows'
import { setGetShowsByTheatre, setAddShow } from '../../../redux/showsSlice'
import { setGetAllMovies } from '../../../redux/moviesSlice'

function Shows({ openShowsModel, setOpenShowsModel, theatre }) {
    const [view, setView] = useState('table')
    const [show, setShow] = useState('form')
    const [editRecord, setEditRecord] = useState(null)
    const dispatch = useDispatch()
    const shows = useSelector((state) => state?.shows?.getShowsByTheatre)
    const movies = useSelector((state) => state?.movies?.getAllMovies)

    const reduxState = useSelector((state) => state?.movies?.getAllMovies)
    console.log(reduxState)
    console.log('theatre',theatre);
    

    // Fetch movies when the form view is opened
    useEffect(() => {
        if (view === 'table') {
            fetchMovies()
        }
    }, [view])

    const fetchMovies = async () => {
        try {
            dispatch(showLoader())
            const response = await getShowsByTheatre(theatre._id)
            if (response.success) {
                dispatch(setGetShowsByTheatre(response.data))
                dispatch(hideLoader())
            } else {
                message.error(response.message)
                dispatch(hideLoader())
            }
        } catch (error) {
            console.log(error)
            message.error("Failed to fetch movies")
            dispatch(hideLoader())
        }
    }

    useEffect(() => {
        fetchAllMovies()
    }, [])

    const fetchAllMovies = async () => {
        try {
            dispatch(showLoader())
            const response = await getAllMovies()
            if (response.success) {
                dispatch(setGetAllMovies(response.data))
                dispatch(hideLoader())
            } else {
                message.error(response.message)
                dispatch(hideLoader())
            }
        } catch (error) {
            console.log(error)
            message.error("Failed to fetch movies")
            dispatch(hideLoader())
        }
    }

    const handleEditClick = (showId,record) => {
        setEditRecord(record)
        setShow('edit')
        setView('form')
    }
    console.log(editRecord);
    

    const handleDeleteShow = async (showId) => {
        try {
            dispatch(showLoader())
            const response = await deleteShow(showId)
            if (response.success) {
                message.success(response.message || "Show deleted successfully")
                dispatch(setGetShowsByTheatre(response.data))
                setView('table')
                dispatch(hideLoader())
            } else {
                message.error(response.message || "Failed to delete show")
                dispatch(hideLoader())
            }
        } catch (error) {
            console.error("Error deleting show:", error)
            message.error(error.message || "Failed to delete show")
            dispatch(hideLoader())
        }
    }

    const columns = [
        {
            title: 'Show Name',
            dataIndex: 'showName',
            key: 'showName'
        },
        {
            title: 'Show Time',
            dataIndex: 'showTime',
            key: 'showTime'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => moment(date).format('DD-MM-YYYY')
        },
        {
            title: 'Movie',
            dataIndex: 'movie',
            key: 'movie',
            render: (movie) => movie?.title || 'N/A'
        },
        {
            title: 'Ticket Price',
            dataIndex: 'ticketPrice',
            key: 'ticketPrice'
        },
        {
            title: 'Total Seats',
            dataIndex: 'totalSeats',
            key: 'totalSeats'
        },
        {
            title: 'Available Seats',
            dataIndex: 'availableSeats',
            key: 'availableSeats'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <div className='flex gap-2'>
                    <Button variant='outlined' title='Edit' onClick={() => handleEditClick(record._id, record)} />
                    <Button variant='outlined' title='Delete' onClick={() => handleDeleteShow(record._id)} />
                </div>
            )
        }
    ]

    const handleAddEditShow = async (values) => {
        try {
            dispatch(showLoader())
            // Add theatre ID to the show data
            const showData = {
                ...values,
                theatreId: theatre._id
            }
            
            console.log("Submitting show data:", showData)
            
            const response = show === 'edit' ? await editShow(showData, editRecord._id) : await createShow(showData)
            
            if (response.success) {
                message.success(response.message || "Show added successfully")
                dispatch(setAddShow(response.data))
                setView('table')
                dispatch(hideLoader())
            } else {
                message.error(response.message || "Failed to add show")
                dispatch(hideLoader())
            }
        } catch (error) {
            console.error("Error adding show:", error)
            message.error(error.message || "Failed to add show")
            dispatch(hideLoader())
        }
    }

    return (
        <div>
            <Modal
                title="Theatre Shows"
                open={openShowsModel}
                onCancel={() => setOpenShowsModel(false)}
                footer={null}
                width={1400}
            >
                <div className='text-primary text-md mb-4'><span className='font-bold'>Theatre:</span> {theatre?.theatreName}</div>
                <div className='text-primary text-md mb-4'><span className='font-bold'>Address:</span> {theatre?.address}</div>
                <hr />
                <div className='flex justify-between mt-1'>
                    <h1 className='text-md uppercase'>
                        {view === 'table' ? 'Shows' : (view !== 'table' && show === 'edit' ? 'Edit Show' : 'Add Shows')}
                    </h1>
                    {view === 'table' && (
                        <Button variant='outlined' title='Add Shows' onClick={() => setView('form')} />
                    )}
                </div>
                {view === 'table' && (
                    <Table columns={columns} dataSource={shows} />
                )}

                {view === 'form' && (
                    <Form layout='vertical' initialValues={editRecord} onFinish={handleAddEditShow}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label='Show Name' name='showName' rules={[{ required: true, message: 'Show Name is required' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label='Show Time' name='showTime' rules={[{ required: true, message: 'Show Time is required' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label='Date' name='date' rules={[{ required: true, message: 'Date is required' }]}>
                                    <Input type="date" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label='Movie' name='movie' rules={[{ required: true, message: 'Movie is required' }]}>
                                    <Select placeholder="Select a movie">
                                        {movies.map(movie => (
                                            <Select.Option key={movie._id} value={movie._id}>
                                                {movie?.title}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label='Ticket Price' name='ticketPrice' rules={[{ required: true, message: 'Ticket Price is required' }]}>
                                    <Input type="number" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label='Total Seats' name='totalSeats' rules={[{ required: true, message: 'Total Seats is required' }]}>
                                    <Input type="number" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label='Available Seats' name='availableSeats' rules={[{ required: true, message: 'Available Seats is required' }]}>
                                    <Input type="number" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <div className='flex justify-end mt-4 gap-2'>
                                    <Button variant='outlined' title={show === 'edit' ? 'Edit Show' : 'Add Shows'} type='submit' />
                                    <Button variant='outlined' title='Cancel' onClick={() => {
                                        return (
                                            setView('table'),
                                            setShow('')
                                        )
                                    }} />
                                </div>
                            </Col>
                        </Row>

                    </Form>
                )}
            </Modal>
        </div>
    )
}

export default Shows



