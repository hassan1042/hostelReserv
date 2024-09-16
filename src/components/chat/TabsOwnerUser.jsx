import React from 'react'

function TabsOwnerUser({setActiveTab, activeTab, }) {
  return (
    <div className="tabs flex justify-center mb-6">
    <button
      onClick={() => setActiveTab('owner')}
      className={
        `
        px-4 py-2 mx-2 rounded-lg ${
        activeTab === 'owner'
          ? 'bg-blue-500 text-white dark:bg-blue-900'
          : 'bg-gray-200 text-gray-700 dark:bg-gray-500 dark:text-text hover:bg-gray-400'
      } `
      
      }
    >
      Messages as Owner
    </button>
    <button
      onClick={() => setActiveTab('user')}
      className={`
      px-4 py-2 mx-2 rounded-lg ${
        activeTab === 'user'
          ? 'bg-blue-500 text-white dark:bg-blue-900'
          : 'bg-gray-200 text-gray-700  dark:bg-gray-500 dark:text-text hover:bg-gray-400'
      
      }`}
    >
      Messages as User
    </button>
  </div>
  )
}

export default TabsOwnerUser
