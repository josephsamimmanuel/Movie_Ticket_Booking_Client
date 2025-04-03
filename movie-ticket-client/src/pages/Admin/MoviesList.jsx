import React, { useState } from 'react'
import Button from '../../components/Button'
import MoviesForm from './MoviesForm'
function MoviesList() {
    const [movies, setMovies] = useState([])
    const [showMovieFormModel, setShowMovieFormModel] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [formType, setFormType] = useState('add')

    const handleAddMovie = () => {
        setShowMovieFormModel(true)
        setFormType('add')
    }
    
  return (
    <div>
      <div className='flex justify-end'>
        <Button title='Add Movie' variant='outlined' onClick={handleAddMovie}>Create Movie</Button>
      </div>

      {showMovieFormModel && (
        <MoviesForm 
            showMovieFormModel={showMovieFormModel}
            setShowMovieFormModel={setShowMovieFormModel}
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
            formType={formType}
        />
      )}
    </div>
  )
}

export default MoviesList
