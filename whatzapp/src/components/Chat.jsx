import React from 'react'
import { IoMdVideocam } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { BsThreeDots } from "react-icons/bs";
import Messages from './Messages'
import Input from './Input'
import { useContext } from 'react';
import { ChatContext } from '../Context/ChatContext';
const Chat = () => {
  const {data}=useContext(ChatContext)
  return (
    <div className='Chat'>
      <div className='chat-info'>
        <span>{data.user?.displayName}</span>
        <div className='chat-icons'>
          < IoMdVideocam size={20} />
          <CgProfile />
        <BsThreeDots />
        </div>
      </div>
       <Messages/>
       <Input/>
    </div>
  );
};

export default Chat
