import React, { useEffect, useState } from 'react';
import { deleteDoc, doc, updateDoc, arrayRemove, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../firebase/Firebase';
import { FaTrash } from 'react-icons/fa';

function SelectedChat({ selectedChat, currentUser, setSelectedChat }) {
  const [messages, setMessages] = useState(selectedChat.messages);

  // Listen for real-time updates to the chat
  useEffect(() => {
    const chatRef = doc(firestore, 'chats', selectedChat.id);
    const unsubscribe = onSnapshot(chatRef, (snapshot) => {
      const data = snapshot.data();
      if (data?.messages) {
        setMessages(data.messages);
      }
    });

    return () => unsubscribe();
  }, [selectedChat.id]);

  const handleDeleteChat = async (chatId) => {
    try {
      await deleteDoc(doc(firestore, 'chats', chatId));
      setSelectedChat(null); // Deselect the deleted chat
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const handleDeleteMessage = async (message) => {
    try {
      const chatRef = doc(firestore, 'chats', selectedChat.id);
      await updateDoc(chatRef, {
        messages: arrayRemove(message),
      });
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">
          Chat with {selectedChat.hostelName}
        </h3>
        {selectedChat.ownerId === currentUser.uid && (
          <button
            onClick={() => handleDeleteChat(selectedChat.id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Delete Chat
          </button>
        )}
      </div>
      <div className="message-list space-y-4 max-h-[70vh] overflow-y-scroll">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.senderId === currentUser.uid
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            <div
              className={`px-3 py-1 max-w-xs ${
                msg.senderId === currentUser.uid
                  ? 'bg-blue-600 text-white rounded-br-none rounded-lg'
                  : 'bg-gray-400 text-black rounded-bl-none rounded-lg'
              } shadow-sm`}
            >
              {msg.content}
             <div className="flex justify-between items-center">
             <p className="text-xs mt-1 text-gray-200 i">
                {new Date(msg.timestamp?.seconds * 1000).toLocaleTimeString()}
              </p>
              {msg.senderId === currentUser.uid && (
                <button
                  onClick={() => handleDeleteMessage(msg)}
                  className="text-sm text-red-500 ms-3"
                >
                  <FaTrash/>
                </button>
              )}
             </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectedChat;
