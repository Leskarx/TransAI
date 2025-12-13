import React from 'react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import WelcomeScreen from './WelcomeScreen'

const ChatArea = ({ messages, isTyping, mode, chatEndRef }) => {
  return (
    <main className="flex-1 overflow-y-auto px-4 py-6">
      <div className="max-w-3xl mx-auto space-y-4">
        {messages.length === 0 ? (
          <WelcomeScreen mode={mode} />
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
          </>
        )}
        <div ref={chatEndRef} />
      </div>
    </main>
  )
}

export default ChatArea
