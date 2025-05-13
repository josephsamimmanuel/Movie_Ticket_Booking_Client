import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import TheatresForMovies from './pages/TheatresForMovies'
import 'remixicon/fonts/remixicon.css'
import './stylesheets/alignments.css'
import './stylesheets/sizes.css'
import './stylesheets/form-elements.css'
import './stylesheets/custom.css'
import './stylesheets/theme.css'
import ProtectedRoute from './components/ProtectedRoute'
import { useSelector } from 'react-redux'
import BookShow from './pages/BookShow'

function App() {
  const {loading} = useSelector((state) => state.loader)
  return (
    <div>
      {loading && (
        <div className='loader-parent'>
          <div className='loader'></div>
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/movie/:id" element={<ProtectedRoute><TheatresForMovies /></ProtectedRoute>} />
          <Route path="/book-show/:id/:theatreId" element={<ProtectedRoute><BookShow /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
