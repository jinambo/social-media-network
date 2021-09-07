// Dependencies
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar'

// Pages
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Signup from './pages/Signup'

// Styles
import './styles/library/simple-grid.css'
import './styles/root.css'

const App = () => {
  return(
    <div className="container">
      <Navbar />

      <Router>
        <Route exact path='/' component={ Homepage } />
        <Route exact path='/login' component={ Login } />
        <Route exact path='/signup' component={ Signup } />
      </Router>
    </div>
  )
}

export default App
