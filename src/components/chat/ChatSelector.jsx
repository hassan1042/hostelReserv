import React, { useState } from "react";

function ChatSelector({
  activeTab,
  ownerMessages,
  setSelectedChat,
  userMessages,
  selectedChat,
}) {
  const [menuOpen, setMenuOpen] = useState(false); // State for toggling menu visibility on small screens

  return (
    <div className="chat-selector ">
      {/* Toggle Menu Button for Smaller Screens */}
      <button
        className="sm:hidden  flex justify-center items-center w-full p-2 bg-blue-500 text-white rounded-lg mb-4"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "Close Menu" : "Open Menu"}
      </button>

      {/* Chat Tabs - Conditional rendering for smaller screens */}
      <div
        className={`chat-tabs sm:flex flex-col ${
          menuOpen ? "block" : "hidden"
        } sm:block w-full sm:w-full h-full space-y-2 bg-gray-200 dark:bg-slate-600 p-2 sm:p-4 rounded-lg shadow-inner`}
      >
        <h3 className="font-bold text-lg mb-2 dark:text-text">Chats</h3>

        {/* Messages as Owner */}
        {activeTab === "owner" &&
          ownerMessages.map((message) => (
            <button
              key={message.id}
              onClick={() => setSelectedChat(message)}              
              className={`p-3 text-left rounded-lg  ${
                selectedChat?.id === message.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {message.hostelName}
            </button>
          ))}

        {/* Messages as User */}
        {activeTab === "user" &&
          userMessages.map((message) => (
            <button
              key={message.id}
              onClick={() => setSelectedChat(message)}
              className={`p-3 text-left rounded-lg ${
                selectedChat?.id === message.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {message.hostelName}
            </button>
          ))}
      </div>
    </div>
  );
}

export default ChatSelector;
