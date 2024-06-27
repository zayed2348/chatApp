import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import { Timestamp } from 'firebase/firestore'; // Import Timestamp from Firestore

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [messageTime, setMessageTime] = useState(null); // State to hold formatted message time

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    // Format timestamp to display time when component mounts
    setMessageTime(formatMessageTime(message.date));
  }, [message.date]);

  // Function to format timestamp to readable time
  const formatMessageTime = (timestamp) => {
    const date = timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{messageTime}</span> {/* Display formatted message time */}
      </div>

       <div className={`messageContent ${message.senderId === currentUser.uid && "owner"}`}>
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
       </div>
       
    </div>
  );
};

export default Message;
