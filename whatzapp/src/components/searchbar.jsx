//searchbar.jsx
import React, { useContext, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { collection, query, where, getDocs, setDoc,doc, updateDoc,getDoc,serverTimestamp } from "firebase/firestore";
import {db} from '../pages/firebase'
import { AuthContext } from '../Context/AuthContext';

const Searchbar = () => {
  const [username,setUsername]=useState("")//username is the username we are typing
  const [user,setUser]=useState(null)//user is the actual user we want to find
  const [err,setErr]=useState(false)
  const {currentUser}=useContext(AuthContext)
const handleSearch=async ()=>{
const q =query(collection(db,"users"),where("displayName","==",username))
try{
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    setUser(doc.data())
      });
    }
catch{
  setErr(true)
}

}
  const handlekey=(e)=>{
e.code==="Enter" && handleSearch()
console.log( user)
  } 
  const handleSelect=async ()=>{
    const combinedId= currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid+currentUser.uid
    try{
      const res=await getDoc(doc(db,"chats",combinedId))
if(!res.exists()){
  //create chats collection
  await setDoc(doc(db,"chats",combinedId),{messages : []})
  //create user chats
  await updateDoc(doc(db,"userChats",currentUser.uid) ,{
    [combinedId+".userId"]:{
       displayName:user.displayName,
    photoURL:user.photoURL,
    uid:user.uid
    },
    [combinedId+".date"]: serverTimestamp()
});
await updateDoc(doc(db,"userChats",user.uid), {
  [combinedId+".userId"]:{
     displayName:currentUser.displayName,
  photoURL:currentUser.photoURL,
  uid:currentUser.uid
  },
  [combinedId+".date"]: serverTimestamp()
 

});
}
    }
catch(err){
setErr(true)
}
setUser(null)
username=""
  }
  return (
    <div className='searchbar'>
      <div className='searchform'>
        <input type="text" placeholder='find a user' onKeyDown={handlekey} onChange={(e)=>setUsername(e.target.value)}
        value={username}
        />
       <button onClick={handleSearch} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <CiSearch size={24} />
        </button>
      </div>
     {err && <span>Not Found</span>}
     {user &&
      <div className="user-chat" onClick={handleSelect}>
        <img src={user.photoURL} alt=""/>
        <span className='User-name'>
        {user.displayName}
        </span>
      </div>
      }
    </div>

  )
}
export default Searchbar;