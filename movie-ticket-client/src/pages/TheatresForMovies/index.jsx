import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setGetMovieById } from '../../redux/moviesSlice'
import { getMovieById } from '../../apicalls/movies'
import moment from 'moment'
import { message } from 'antd'
import { showLoader, hideLoader } from '../../redux/loader'
import { useNavigate } from 'react-router-dom'
import { getAllUniqueTheatresForAMovieOnADate } from '../../apicalls/theatre'
import { setGetAllUniqueTheatresForAMovieOnADate } from '../../redux/theatreListSlice'
function TheatresForMovies() {

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getMovieId = useSelector((state) => state.movies.getMovieById)
    const uniqueTheatre = useSelector((state) => state?.theatreList?.getAllUniqueTheatresForAMovieOnADate)
    console.log(uniqueTheatre)

    // get date from url
    const tempDate = new URLSearchParams(window.location.search).get('date')
    console.log(tempDate)

    const [date, setDate] = useState(tempDate || moment().format('YYYY-MM-DD'))

    useEffect(() => {
        fetchMovieById()
    }, [id])

    const fetchMovieById = async () => {
        try {
            dispatch(showLoader())
            const response = await getMovieById(id)
            message.success(response.message)
            dispatch(setGetMovieById(response.data))
            dispatch(hideLoader())
        } catch (error) {
            dispatch(hideLoader())
            message.error(error.message)
            console.log(error)
        }
    }

    const fetchUniqueTheatresForAMovieOnADate = async () => {
        try {
            const response = await getAllUniqueTheatresForAMovieOnADate(id, date)
            dispatch(setGetAllUniqueTheatresForAMovieOnADate(response.data))
            message.success(response.message)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUniqueTheatresForAMovieOnADate()
    }, [id, date])

    return (
        getMovieId && <div>
            <div className='flex justify-between items-center gap-2'>
                {/* Movie Information */}
                <div className='flex flex-col gap-1 mb-2'>
                    <span className='text-xl font-bold uppercase'>{getMovieId.title}</span>
                    <span><b>Release Date:</b> {moment(getMovieId.releaseDate).format('DD-MM-YYYY')}</span>
                    <span><b>Duration:</b> {getMovieId.duration}</span>
                    <span><b>Genre:</b> {getMovieId.genre}</span>
                </div>

                <div className='flex flex-col gap-1'>
                    <span><b>Select Date</b></span>
                    <input type="date" className='border-2 border-gray-300 rounded-md p-2' min={moment().format('YYYY-MM-DD')} value={date} onChange={(e) => {
                        setDate(e.target.value)
                        navigate(`/movie/${id}?date=${e.target.value}`)
                    }}/>
                </div>
            </div>
            <hr />

            {/* Theatres List */}
            <div className='flex flex-col gap-2'>
                <span className='text-2xl font-bold'>Theatres</span>
            </div>

            {uniqueTheatre && uniqueTheatre.length > 0 && uniqueTheatre.map((theatre) => (
                <div key={theatre._id} className='flex flex-col gap-2 border-2 theatre-card rounded-md mb-2 p-2'>
                    <span className='text-lg font-bold uppercase'>{theatre.theatreName}</span>
                    <span>{theatre.address}</span>
                    <div className='divider'></div>
                    <div className='flex gap-2 cursor-pointer' >
                        {[...theatre.shows].sort((a, b) => {
                            const timeA = moment(a.showTime, 'HH:mm');
                            const timeB = moment(b.showTime, 'HH:mm');
                            return timeA.diff(timeB);
                        }).map((show) => (
                            <div key={show._id} className='p-1 card' onClick={() => {
                                navigate(`/book-show/${id}/${theatre._id}?show=${show._id}&date=${date}`)
                            }}>
                                <span>{moment(show.showTime, 'HH:mm').format('hh:mm A')}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TheatresForMovies
