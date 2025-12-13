import React from 'react'

const MessageBubble = ({ message }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className="flex flex-col max-w-xs sm:max-w-md lg:max-w-lg">
        <div className={`chat-bubble ${message.type === 'user' ? 'user-bubble' : 'ai-bubble'}`}>
          <div className="whitespace-pre-wrap break-words">
            {message.content}
          </div>
        </div>
        <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${
          message.type === 'user' ? 'text-right' : 'text-left'
        }`}>
          {formatTime(message.timestamp)}
          {message.isTranslated && (
            <span className="ml-2 text-gray-400">• Translated from English</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble
