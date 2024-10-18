import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
// import Lad2 from './Lad2'
import Lad1 from './Lad1'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App/> */}
    <Lad1 />
    {/* <Lad2 /> */}
  </StrictMode>,
)
