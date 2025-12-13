import React, { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import ChatArea from './components/ChatArea'
import InputSection from './components/InputSection'
import { useTheme } from './hooks/useTheme'

function App() {
  const [mode, setMode] = useState('translator')
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const chatEndRef = useRef(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text) => {
    if (!text.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: text,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    if (mode === 'translator') {
      try {
        // Send request to Flask API
        const response = await fetch('http://localhost:5000/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text,
            source_lang: 'eng_Latn',
            target_lang: 'asm_Beng'
          })
        })

        const data = await response.json()

        const aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: data.translated_text
            ? `${data.translated_text}`
            : '❌ Translation failed or no response.',
          timestamp: new Date()
        }

        setMessages(prev => [...prev, aiResponse])
      } catch (error) {
        console.error('Translation API Error:', error)
        const errorMsg = {
          id: Date.now() + 1,
          type: 'ai',
          content: '⚠️ Error: Unable to reach translation service.',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, errorMsg])
      } finally {
        setIsTyping(false)
      }
    } else {
      // Mode = assistant → Under progress
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: '🤖 Assistant mode is under progress. Please stay tuned!',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiResponse])
        setIsTyping(false)
      }, 1000)
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="flex flex-col h-screen max-w-4xl mx-auto">
        <Header 
          mode={mode}
          setMode={setMode}
          isDark={isDark}
          toggleTheme={toggleTheme}
          clearChat={clearChat}
        />
        
        <ChatArea 
          messages={messages}
          isTyping={isTyping}
          mode={mode}
          chatEndRef={chatEndRef}
        />
        
        <InputSection 
          onSendMessage={handleSendMessage}
          mode={mode}
        />
      </div>
    </div>
  )
}

export default App
