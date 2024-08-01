import './App.css'

import { Outlet } from 'react-router-dom'

// COMPONENTES
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  

  return (
    <div className="App">
      
      <Navbar/>

      <div className="container">
        <Outlet/>
      </div>

      <Footer/>
    </div>    
  )
}

export default App
