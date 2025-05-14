import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showLoader, hideLoader } from '../../redux/loader'
import { Card, Col, message, Row } from 'antd'
import { setGetAllMovies } from '../../redux/moviesSlice'
import { getAllMovies, autoSearch } from '../../apicalls/movies'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const movies = useSelector((state) => state?.movies?.getAllMovies)

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      dispatch(showLoader())
      const response = await getAllMovies()

      if (response.success) {
        message.success(response.message)
        dispatch(setGetAllMovies(response.data))
        dispatch(hideLoader())
      } else {
        message.error(response.message || "Failed to fetch movies")
        dispatch(hideLoader())
      }
    } catch (error) {
      dispatch(hideLoader())
      message.error(error.message || "Failed to fetch movies")
    }
  }

  const handleAutoSearch = async (movieName) => {
    // Debounce the search
    if (movieName.length > 2) {
      // Debounce the search
      setTimeout(async () => {
        try {
          dispatch(showLoader())
          const response = await autoSearch(movieName)
          if (response.success) {
            dispatch(hideLoader())
            message.success(response.message)
            dispatch(setGetAllMovies(response.data))
          } else {
            message.error(response.message || "Failed to fetch movies")
            dispatch(hideLoader())
          }
        } catch (error) {
          dispatch(hideLoader())
          message.error(error.message || "Failed to fetch movies")
        }
      }, 1000)
    }
  }

  return (
    <div>
      <input type="text" placeholder='Search Movie' className='search-input' onChange={(e) => handleAutoSearch(e.target.value)} />
      <Row>
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <Col key={movie._id}>
              <Card className='movie-card' onClick={() => navigate(`/movie/${movie._id}?date=${moment().format('YYYY-MM-DD')}`)}>
                <img src={movie.posterUrl} alt={movie.title} className='movie-poster' />
                <Card.Meta title={movie.title} description={movie.description} />
              </Card>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <div className="text-center p-4">No movies found</div>
          </Col>
        )}
      </Row>
    </div>
  )
}

export default Home
