import React, { useState } from 'react';
import { doc, setDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../firebase/Firebase';

const ChatMessageInput = ({ chatId, userId, ownerId, hostelId, hostelName, senderId , }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return; // Don't send empty messages

    try {
      const chatRef = doc(firestore, 'chats', chatId); // Reference to the chat document

      // Check if chat exists, if not create it, then update it
      await setDoc(chatRef, {
        ownerId: ownerId,
        userId: userId,
        hostelId: hostelId,
        hostelName: hostelName,
        messages: arrayUnion({
          content: message,
          userId: userId,
          senderId: senderId,
          ownerId: ownerId,
          timestamp: { seconds: Math.floor(Date.now() / 1000) }, // Mimicking serverTimestamp
        }),
      }, { merge: true });

      setMessage(''); // Clear the input after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <form onSubmit={handleSendMessage} className="flex items-center space-x-2 mt-4">
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-icons dark:bg-bgInputsDark dark:text-text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type='submit'
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-800 transition"
      >
        Send
      </button>
    </form>
  );
};

export default ChatMessageInput;
