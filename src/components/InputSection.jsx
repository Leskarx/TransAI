import React, { useState } from 'react'
import { Send, Mic } from 'lucide-react'

const InputSection = ({ onSendMessage, mode }) => {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input)
      setInput('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <footer className="sticky bottom-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 p-4">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32"
              rows="1"
              style={{ minHeight: '48px' }}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Mic className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-2xl transition-colors disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        
        <div className="flex items-center justify-center mt-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Current mode: <span className="font-medium">{mode === 'translator' ? 'Translator' : 'AI Assistant'}</span>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default InputSection
