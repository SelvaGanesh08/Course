import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import NavBar from './components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'owl.carousel/dist/assets/owl.carousel.css'
import './css/font-awesome.min.css'
import './css/owl.carousel.css'
import './css/style.css'
import FooterBar from '../src/components/FooterBar'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <BrowserRouter>
     <App />
     <NavBar />
     <FooterBar/>
     </BrowserRouter>
    
  </React.StrictMode>,
)
