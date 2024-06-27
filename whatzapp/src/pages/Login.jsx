import { useState } from 'react'
import React from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../pages/firebase'
function Login(){
    const[err,seterr]=useState(false)
    const navigate=useNavigate()

     const Handle1= async (e)=>{
        e.preventDefault()
        const email=e.target[0].value;
        const password=e.target[1].value;
          try{
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
 
}
          catch(err){
               seterr(true)
          }
    }
    
    return(
        <div className="login-container">
        <div className="login-wrapper">
            <span className="logoregister">WinstA</span>
            <span className=""></span>
   <form onSubmit={Handle1}>

    <input type="email" placeholder="Email" className='In'/>
    <input type="password" className='In' placeholder="password"/>
    <button >sign in</button>
    {err && <span>error occured</span>} 
   </form>
   <p className="para">do you have an account?<Link to="/register">Register</Link></p>
        </div>
        </div>


    );
}
export default Login
