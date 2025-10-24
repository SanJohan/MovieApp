import './css/App.css'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import {Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import { MovieProvider } from './contexts/MovieContext.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import Footer from './components/Footer.jsx'



function App() {
  //const [count, setCount] = useState(0)

  return (
    <MovieProvider>
      <>  
          <NavBar />
          <main className='main-content'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/favorites' element={<Favorites />} />
              <Route path='/movie/:id' element={<MovieDetails />} />
            </Routes>
          </main>
          <Footer />
      </>
    </MovieProvider>
  )
}

export default App
