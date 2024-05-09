import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Form from './pages/Form/Form';
import View from './pages/View/View';
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>
    <Routes>
      <Route path='/' exact element={<Home/>} />
      <Route path='/create' element={<Form/>}/>
      <Route path='/view' element={<View/>}/>
    </Routes>
    <ToastContainer />
    </>
  )
}

export default App
