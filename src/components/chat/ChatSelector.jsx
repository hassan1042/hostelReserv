import React from 'react'

function ChatSelector({activeTab , ownerMessages , setSelectedChat , userMessages, selectedChat  }) {
  return (
    <div className="chat-tabs flex flex-col  w-1/4 space-y-2 bg-gray-200 dark:bg-slate-600 p-4 rounded-lg shadow-inner">
    <h3 className="font-bold text-lg mb-2 dark:text-text">Chats</h3>

    {/* Messages as Owner */}
    {activeTab === 'owner' &&
      ownerMessages.map((message) => (
        <button
          key={message.id}
          onClick={() => setSelectedChat(message)}
          className={`p-3 text-left rounded-lg ${
            selectedChat?.id === message.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-700'
          }`}
        >
          {message.hostelName}
        </button>
      ))}

    {/* Messages as User */}
    {activeTab === 'user' &&
      userMessages.map((message) => (
        <button
          key={message.id}
          onClick={() => setSelectedChat(message)}
          className={`p-3 text-left rounded-lg ${
            selectedChat?.id === message.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-700'
          }`}
        >
          {message.hostelName}
        </button>
      ))}
  </div>
  )
}

export default ChatSelector
