import React from 'react'
import './index.css'
import  Navbar  from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add";
import Orders from './pages/Orders/Orders';
import List from './pages/List/List';
//  import React from 'react';

  import { ToastContainer} from 'react-toastify';
  const url = "http://localhost:4000";

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path ="/add" element={<Add url={url}/>}/>
          <Route path ="/Orders" element={<Orders url={url}/>}/>
          <Route path ="/List" element={<List url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App