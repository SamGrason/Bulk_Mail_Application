import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './assets/login.jsx'
import AddUser from './assets/addUser.jsx'
import History from './assets/History.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Login/>}></Route>
    <Route path ='/home' element={<App/>}></Route>
    <Route path ='/adduser' element={<AddUser />}></Route>
    <Route path='/history' element={<History/>}></Route>
  </Routes>
  </BrowserRouter>
)
