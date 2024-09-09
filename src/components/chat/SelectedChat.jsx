import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react'
import { firestore } from '../../firebase/Firebase';

function SelectedChat({selectedChat, currentUser, setSelectedChat}) {
    const handleDeleteChat = async (chatId) => {
        try {
          await deleteDoc(doc(firestore, 'chats', chatId));
          setSelectedChat(null); // Deselect the deleted chat
        } catch (error) {
          console.error('Error deleting chat:', error);
        }
      };
    
  return (
    <div>
          <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">
                Chat with {selectedChat.hostelName}
              </h3>
             {
              selectedChat.ownerId === currentUser.uid &&
              <button
                onClick={() => handleDeleteChat(selectedChat.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete Chat
              </button>
             }
            </div>
            <div className="message-list space-y-4">
              {selectedChat.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.senderId === currentUser.uid
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div
                    className={`p-3 max-w-xs ${
                      msg.senderId === currentUser.uid
                        ? 'bg-blue-300 text-white rounded-br-none rounded-lg'
                        : 'bg-gray-300 text-black rounded-bl-none rounded-lg'
                    } shadow-sm`}
                  >
                    {msg.content}
                    <p className="text-xs mt-1 text-gray-500">
                      {new Date(msg.timestamp?.seconds * 1000).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
    </div>
  )
}

export default SelectedChat
