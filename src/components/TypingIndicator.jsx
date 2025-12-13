import React from 'react'

const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="chat-bubble ai-bubble">
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <span className="text-sm text-gray-500 ml-2">AI is typing...</span>
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator
