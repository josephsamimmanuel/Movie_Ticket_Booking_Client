import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { showLoader, hideLoader } from '../../redux/loaderSlice'
import { Button, message } from 'antd'
import moment from 'moment'
import { getShowDetails } from '../../apicalls/theatre'
import { setGetShowDetails } from '../../redux/theatreListSlice'

function BookShow() {
  const [searchParams] = useSearchParams()
  const date = searchParams.get('date')
  const showId = searchParams.get('show')
  const dispatch = useDispatch()
  const showDetails = useSelector((state) => state?.theatreList?.getShowDetails)
  const [selectedSeats, setSelectedSeats] = useState([])

  useEffect(() => {
    if (showId && date) {
      fetchUniqueTheatresForAMovieOnADate()
    }
  }, [showId, date])

  const fetchUniqueTheatresForAMovieOnADate = async () => {
    try {
      dispatch(showLoader())
      const response = await getShowDetails(showId, date)
      dispatch(setGetShowDetails(response.data))
      if (response.success) {
        dispatch(hideLoader())
        message.success(response.message)
      } else {
        dispatch(hideLoader())
        message.error(response.message)
      }
    } catch (error) {
      dispatch(hideLoader())
      message.error(error.message)
    }
  }

  const handleSeatClick = (seatNumber) => {
    // Check if seat is already booked
    if (showDetails?.bookedSeats?.includes(seatNumber)) {
      message.warning(`Seat ${seatNumber} is already booked!.. Please select another seat`)
      return
    }

    // Check if seat is already selected
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber))
      message.warning(`Seat ${seatNumber} deselected`)
      console.log('Seat deselected:', seatNumber)
    } else {
      setSelectedSeats([...selectedSeats, seatNumber])
      message.success(`Seat ${seatNumber} selected`)
      console.log('Seat selected:', seatNumber)
    }
  }

  const getSeats = () => {
    if (!showDetails) return null;
    
    const columns = 12
    const totalSeats = showDetails?.totalSeats || 0
    const rows = Math.ceil(totalSeats / columns)
    const seatArray = Array.from({ length: totalSeats }, (_, i) => i + 1)

    return (
      <div className="arrayBorder">
        {Array.from({ length: rows }).map((_, rowIndex) => {
          const rowSeats = seatArray.slice(rowIndex * columns, (rowIndex + 1) * columns);
          return (
            <div className="flex gap-1" key={rowIndex}>
              {rowSeats.map((seatNumber) => {
                const isSelected = selectedSeats.includes(seatNumber)
                const isBooked = showDetails?.bookedSeats?.includes(seatNumber)
                
                return (
                  <div 
                    className={`seat w-8 h-8 flex items-center justify-center border border-gray-300 rounded cursor-pointer
                      ${isSelected ? 'selected-seat' : ''} 
                      ${isBooked ? 'booked-seat' : 'hover:bg-gray-100'}`}
                    key={seatNumber}
                    onClick={() => handleSeatClick(seatNumber)}
                  >
                    <h1 className="text-sm">{seatNumber}</h1>
                  </div>
                )
              })}
            </div>
          );
        })}
      </div>
    )
  }

  if (!showDetails) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {/* Show Information */}
      <div className='flex justify-between items-center gap-2 card p-2'>
        <div className='flex flex-col'>
          <h1 className='text-xl font-bold'>{showDetails?.theatre?.theatreName}</h1>
          <h1 className='text-sm'>{showDetails?.theatre?.address}</h1>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-xl'>{showDetails?.movie?.title}</h1>
          <h1 className='text-xl'>{showDetails?.movie?.language}</h1>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-xl'>
            {moment(showDetails?.date).format('DD-MM-YYYY')}</h1>
          <h1 className='text-xl'>
            {moment(showDetails?.showTime, 'HH:mm').format('hh:mm A')}
          </h1>
        </div>
      </div>

      {/* Seats */}
      {getSeats()}
      {/* Payment */}
      <div className='flex justify-center items-center mt-2 gap-2'>
        <Button type='primary' className='bg-blue-500'>Book Now</Button>
        <Button type='default' variant='outlined'>Cancel</Button>
      </div>
    </div>
  )
}

export default BookShow
