import rabbit from './rabbit.png'
import { useState } from 'react'
import React from 'react'
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import {auth,storage,db} from './firebase.jsx'
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate,Link } from 'react-router-dom';
const  Newregister=()=>{
    const[err,seterr]=useState(false)
    const navigate=useNavigate()
     const Handle1= async (e)=>{
        e.preventDefault()
        const displayName= e.target[0].value;
        const email=e.target[1].value;
        const password=e.target[2].value;
        const file=e.target[3].files[0];

      
          try{
  const res= await createUserWithEmailAndPassword(auth, email, password)
  console.log(res.user)

const storageRef = ref(storage,displayName);

const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    seterr(true)
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      await updateProfile(res.user,{
        displayName,
        photoURL:downloadURL,
      })
      await setDoc(doc(db,"users", res.user.uid),{
        uid: res.user.uid,
        displayName,
        email,
        photoURL: downloadURL, 
                  });
        await setDoc(doc(db,"userChats",res.user.uid),{})
       navigate("/")
       console.log(auth);

    });
  }
);

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
   <form onSubmit={Handle1} >
    <input type="text" placeholder="Username" className='In'/>
    <input type="email" placeholder="Email" className='In'/>
    <input type="password" className='In' placeholder='Password'/>
    <input style={{display:"none"}} type="file" id="file" className='In'/>
    <label htmlFor="file">
        
        <img src={rabbit} alt="no image" height={30} />
   <span>Choose Avatar</span>
    </label>
    <button>sign up</button>
    {err && <span>error occured</span>}

   </form>
   <p className="para">do you have an account? <Link to="/login">Login</Link></p>
   
        </div>
        </div>


    );
}
export default Newregister
