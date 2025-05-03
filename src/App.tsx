import './App.css'
import Login from './components/Login'
import '@fontsource/roboto/300.css'; // Light
import '@fontsource/roboto/400.css'; // Regular
import '@fontsource/roboto/500.css'; // Medium
import '@fontsource/roboto/700.css'; // Bold
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Teste from './components/Teste';
import Unpaid from './components/unPaidUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path="/deucerto" element={<Teste />}/>
        <Route path='/plano' element={<Unpaid />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
