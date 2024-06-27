import React, { useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../Context/AuthContext';
import { db } from '../pages/firebase';
import { ChatContext } from '../Context/ChatContext';

const Chats = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState([]);

  const handleSelect = (user) => {
    return () => {
      if (user && user.uid) {
        dispatch({ type: 'changeUser', payload: user });
      }
    };
  };

  useEffect(() => {
    const getChats = () => {
      if (currentUser && currentUser.uid) {
        const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
          setChats(doc.data());
        });

        return () => {
          unsub();
        };
      }
    };

    getChats();
  }, [currentUser]);

  return (
    <div className="Chat-log">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="user-chat"
            key={chat[0]}
            onClick={handleSelect(chat[1]?.userId)}
          >
            <img
              src={chat[1]?.userId?.photoURL || 'default-profile.png'}
              alt={chat[1]?.userId?.displayName || 'User'}
            />
            <div className="user-chat-info">
              <span className="User-name">
                {chat[1]?.userId?.displayName || 'User'}
              </span>
              <div>{chat[1]?.lastMessage?.text || 'No messages yet'}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
