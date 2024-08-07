import React, { useContext, useEffect, useState } from 'react'
import { onSnapshot, doc } from 'firebase/firestore' // Make sure to import doc from firebase/firestore
import { ChatContext } from '../Context/ChatContext'
import Message from './Message'
import {db} from '../pages/firebase'

const Messages = () => {
  const [messages,setMessages]=useState([])
  const {data}=useContext(ChatContext)

  useEffect(()=>{
    const unSub= onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
      doc.exists() && setMessages(doc.data().messages)
    });

     return()=>{
      unSub()
     }
    },[data.chatId]);

    console.log(messages)

  return (
    <div className='Messages'>
      {messages.map((m)=>(
          <Message message={m} key={m.id}/>
        ))}
    </div>
    
  )
}

export default Messages
