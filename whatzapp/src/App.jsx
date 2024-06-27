import { useContext, useState } from 'react'
import './App.css'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Newregister from './pages/Newregister.jsx';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import { AuthContext } from './Context/AuthContext.jsx'; // Adjust the path as needed

function App() {
  const {currentUser}= useContext(AuthContext);
 console.log(currentUser);
 const ProtectedRoute=({children})=>{
  if(!currentUser)
  {
    return(<Navigate to="/login"></Navigate>)
  }
  return children;
  
 }
  return(
<BrowserRouter>
      <Routes>
        <Route path="/"> {/* 👈 Renders at /app/ */}
          <Route index element={<ProtectedRoute><Home/></ProtectedRoute> }/>
          <Route path="login" element={<Login></Login>}/>
          <Route path="register" element={<Newregister/>}/>
         </Route> 
      </Routes>
</BrowserRouter>

  )
  
}

export default App
