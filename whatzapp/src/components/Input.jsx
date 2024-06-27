import React, { useContext, useState } from 'react';
import { BsSend } from "react-icons/bs";
import { FaPaperclip } from "react-icons/fa6";
import { RiImageAddFill } from "react-icons/ri";
import { ChatContext } from '../Context/ChatContext';
import { AuthContext } from '../Context/AuthContext';
import { Timestamp, serverTimestamp } from 'firebase/firestore';
import { doc, updateDoc, arrayUnion,} from "firebase/firestore";
import {db,storage} from '../pages/firebase'
import {v4 as uuid} from "uuid"
import { ref ,uploadBytesResumable,getDownloadURL} from 'firebase/storage';

const Input = () => {
const [text,setText]=useState("")
const [img,setImg]=useState(null)
const{data}=useContext(ChatContext)
const{currentUser}=useContext(AuthContext)
const handleSend= async()=>{
  if(img){
    const storageRef = ref(storage,uuid());

    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on('state_changed', 
  (snapshot) => {
   
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
    //seterr(true)
    // Handle unsuccessful uploads
  }, 
  () => {
    
    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      await updateDoc(doc(db,"chats",data.chatId),{
        messages: arrayUnion({
        id:uuid(),
        text,
        senderId:currentUser.uid,
        date: Timestamp.now(),
        img:downloadURL
        }),
       });
    });
}
    )
  }
  else{
    await updateDoc(doc(db,"chats",data.chatId),{
      messages: arrayUnion({
      id:uuid(),
      text,
      senderId:currentUser.uid,
      date: Timestamp.now()
      })
  });
  }
  await updateDoc(doc(db,"userChats",currentUser.uid),{
   [data.chatId +".lastMessage"]:{
    text,
   },
   [data.chatId+".date"]:serverTimestamp(),
  })
  await updateDoc(doc(db,"userChats",data.user.uid),{
    [data.chatId +".lastMessage"]:{
     text,
    },
    [data.chatId+".date"]:serverTimestamp(),
   })
  setImg(null);
  setText("");
}
  return (
    <div className='Input'>
      <input type="text" className='inputText' onChange={e=>setText(e.target.value)} value={text} placeholder='type something here'/>
     <div className='send'>
        <FaPaperclip></FaPaperclip>
        <input type="file" name="" id="file" style={{display:"none"}} onChange={e=>setImg(e.target.files[0])} />
        <label htmlFor="file">
        <RiImageAddFill />
        </label>
        <div className='Button'><button onClick={handleSend}><BsSend/></button></div>
     </div>
    </div>
  )
}

export default Input
