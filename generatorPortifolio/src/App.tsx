import './App.css'
import Login from './components/Login'
import '@fontsource/roboto/300.css'; // Light
import '@fontsource/roboto/400.css'; // Regular
import '@fontsource/roboto/500.css'; // Medium
import '@fontsource/roboto/700.css'; // Bold
import {  Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Unpaid from './components/unPaidUser';
import Home from './components/home';
import Personal from './components/homePages/personal';
import Professional from './components/homePages/professional';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path='/plano' element={<Unpaid />} />
        <Route path="/personalPortifolio" element={<Personal />} />
        <Route path='/professionalPortifolio' element={<Professional />} />
      </Routes>
  )
}

export default App
