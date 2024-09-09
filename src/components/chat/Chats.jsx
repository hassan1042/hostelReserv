import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebase/Firebase';
import { useAuth } from '../../contexts/AuthContext';
import ChatMessageInput from './MessageInputChat';
import SelectedChat from './SelectedChat';
import TabsOwnerUser from './TabsOwnerUser';
import ChatSelector from './ChatSelector';

const Chats = () => {
  const [ownerMessages, setOwnerMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null); // For tracking selected chat
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('owner');

  useEffect(() => {
    if (!currentUser) return;

    const chatsRef = collection(firestore, 'chats');

    // Fetch messages where the current user is the owner
    const ownerQuery = query(
      chatsRef,
      where('ownerId', '==', currentUser.uid)
    );

    const unsubscribeOwner = onSnapshot(ownerQuery, (snapshot) => {
      const ownerChats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOwnerMessages(ownerChats);
    });

    // Fetch messages where the current user is the user
    const userQuery = query(
      chatsRef,
      where('userId', '==', currentUser.uid)
    );

    const unsubscribeUser = onSnapshot(userQuery, (snapshot) => {
      const userChats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserMessages(userChats);
    });

    // Cleanup listeners on component unmount
    return () => {
      unsubscribeOwner();
      unsubscribeUser();
    };
  }, [currentUser,  ]);

 

  return (
    <>
      <TabsOwnerUser activeTab={activeTab} setActiveTab={setActiveTab}/>
    <div className="chats-container flex p-6 bg-gray-50 min-h-screen">
      {/* Sidebar for chat tabs */}

     <ChatSelector activeTab={activeTab} ownerMessages={ownerMessages} setSelectedChat={setSelectedChat} userMessages={userMessages} selectedChat={selectedChat} /> 

      {/* Chat content area */}
      <div className="chat-content w-3/4 p-6 space-y-4 bg-white rounded-lg shadow-lg">
        {selectedChat ? (
          <>
         <SelectedChat  selectedChat={selectedChat} currentUser={currentUser} setSelectedChat={setSelectedChat} />
            {/* Message input for sending new messages */}
            <ChatMessageInput
              chatId={selectedChat.id}
              userId={selectedChat.userId}
              senderId={currentUser.uid}
              ownerId={selectedChat.ownerId}
              hostelId={selectedChat.hostelId}
              hostelName={selectedChat.hostelName}
            />
          </>
        ) : (
          <p className="text-gray-500">Select a chat to view messages.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default Chats;
