import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import MoviesForm from './MoviesForm'
import moment from 'moment'
import { message, Table } from 'antd'
import { getAllMovies } from '../../apicalls/movies'
import { deleteMovie } from '../../apicalls/movies'
import { showLoader, hideLoader } from '../redux/loader'
import { useDispatch } from 'react-redux'
import { setDeleteMovie, setGetAllMovies } from '../../redux/moviesSlice'
import { useSelector } from 'react-redux'
import ConfirmationModal from '../../components/ConfirmationModal'
function MoviesList() {
  const [showMovieFormModel, setShowMovieFormModel] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [formType, setFormType] = useState('add')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [movieDeleteId, setMovieDeleteId] = useState(null)
  const dispatch = useDispatch()
  const movies = useSelector((state) => state?.movies?.getAllMovies)

  const handleAddMovie = () => {
    setShowMovieFormModel(true)
    setFormType('add')
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try{
      dispatch(showLoader())
      const response = await getAllMovies()
      dispatch(setGetAllMovies(response.data))
      dispatch(hideLoader())
    }catch(error){
      dispatch(hideLoader())
      message.error(error.message)
    }
  }

  const handleEditMovie = (movie) => {
    setShowMovieFormModel(true)
    setFormType('edit')
    setSelectedMovie(movie)
  }

  const handleDeleteClick = (movieId) => {
    setMovieDeleteId(movieId)
    setShowDeleteModal(true)
  }

  const handleDeleteMovieConfirm = async () => {
    if (movieDeleteId) {
      await handleDeleteMovie(movieDeleteId)
      setShowDeleteModal(false)
      setMovieDeleteId(null)
    }
  }

  const handleDeleteMovie = async (movieId) => {
    try {
      dispatch(showLoader())
      const response = await deleteMovie(movieId)
      console.log(response)
      dispatch(setDeleteMovie(response.message))
      dispatch(setGetAllMovies(response?.movieList))
      if (response.success) {
        dispatch(hideLoader())
        message.success(response.message)
      }
      else {
        dispatch(hideLoader())
        message.error(response.message)
      }
    } catch (error) {
      dispatch(hideLoader())
      message.error(error.message)
    }
  }


const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Poster',
    dataIndex: 'posterUrl',
    key: 'posterUrl',
    render: (text, record) => {
      return <img src={record.posterUrl} style={{width: '80px', height: '60px'}} className='rounded-md' alt='poster' />
    }
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration'
  },
  {
    title: 'Language',
    dataIndex: 'language',
    key: 'language'
  },
  {
    title: 'Genre',
    dataIndex: 'genre',
    key: 'genre',
  },
  {
    title: 'Release Date',
    dataIndex: 'releaseDate',
    key: 'releaseDate',
    render: (text, record) => {
      return moment(record.releaseDate).format('DD-MM-YYYY')
    }
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    render: (text, record) => {
      return (
        <div className='flex gap-2'>
          <Button title='Edit' variant='outlined' onClick={() => handleEditMovie(record)} />
          <Button title='Delete' variant='outlined' onClick={() => handleDeleteClick(record._id)} />
        </div>
      )
    }
  }
]

return (
  <div>
    <div className='flex justify-end'>
      <Button title='Add Movie' variant='outlined' onClick={handleAddMovie}>Create Movie</Button>
    </div>

    <Table columns={columns} dataSource={movies} />

    {showMovieFormModel && (
      <MoviesForm
        showMovieFormModel={showMovieFormModel}
        setShowMovieFormModel={setShowMovieFormModel}
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
        formType={formType}
      />
    )}
    <ConfirmationModal
      isOpen={showDeleteModal}
      onClose={() => setShowDeleteModal(false)}
      onConfirm={handleDeleteMovieConfirm}
      title="Delete Movie"
      message="Are you sure you want to delete this movie?"
      confirmText="Delete"
      cancelText="Cancel"
      confirmButtonType="danger"
    />
  </div>
)
}

export default MoviesList
