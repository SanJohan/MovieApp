import './css/App.css'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import {Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar.jsx'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      </main>
    </>
  )
}

export default App
