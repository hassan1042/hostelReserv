import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { firestore } from '../../firebase/Firebase';
import { useAuth } from '../../contexts/AuthContext';
import ChatWindow from './Chats';

const OwnerMessages = () => {
  const [hostelChats, setHostelChats] = useState([]);
  const { currentUser } = useAuth();
  const ownerId = currentUser.uid;

  useEffect(() => {
    // Fetch all hostels owned by the current owner
    const hostelsRef = collection(firestore, 'hostels');
    const unsubscribe = onSnapshot(
      query(hostelsRef, where('ownerId', '==', ownerId)),
      (snapshot) => {
        const hostelsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Loop through each hostel to fetch chats
        const chatsPromises = hostelsData.map((hostel) => {
          const chatRef = collection(firestore, 'chats', `${ownerId}_${hostel.id}`, 'messages');
          return new Promise((resolve) => {
            onSnapshot(chatRef, (chatSnapshot) => {
              const messages = chatSnapshot.docs.map((msgDoc) => ({
                id: msgDoc.id,
                ...msgDoc.data(),
              }));
              resolve({ hostelId: hostel.id, messages });
            });
          });
        });

        Promise.all(chatsPromises).then((chatData) => setHostelChats(chatData));
      }
    );

    return () => unsubscribe();
  }, [ownerId]);

  return (
    <div className="owner-messages-container p-4">
      <h2 className="text-2xl font-bold mb-4">Messages From Users</h2>

      {hostelChats.length > 0 ? (
        hostelChats.map((chat) => (
          <div key={chat.hostelId} className="chat-summary border-b py-4">
            <h3 className="font-semibold">Hostel: {chat.hostelId}</h3>
            <ChatWindow hostelId={chat.hostelId} ownerId={ownerId} messages={chat.messages} />
          </div>
        ))
      ) : (
        <p>No messages available.</p>
      )}
    </div>
  );
};

export default OwnerMessages;
