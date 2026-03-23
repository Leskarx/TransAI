import React, { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import ChatArea from './components/ChatArea'
import InputSection from './components/InputSection'
import { useTheme } from './hooks/useTheme'

const API_BASE = import.meta.env.VITE_API_BASE;


function App() {
  const [mode, setMode] = useState('translator')
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const chatEndRef = useRef(null)

  // 🔽 Auto scroll
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 🔽 Common API handler
  const callAPI = async (endpoint, body) => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      throw new Error('Server error')
    }

    return response.json()
  }

  // 🔽 Send message handler
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

    try {
      let data

      if (mode === 'translator') {
        data = await callAPI('/translate', {
          text,
          source_lang: 'eng_Latn',
          target_lang: 'asm_Beng'
        })
      } else {
        data = await callAPI('/aimode', { text })
      }

      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: data?.message || '❌ No response from server.',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiResponse])

    } catch (error) {
      console.error('API Error:', error)

      const errorMsg = {
        id: Date.now() + 1,
        type: 'ai',
        content: '⚠️ Error: Unable to reach server.',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMsg])

    } finally {
      setIsTyping(false)
    }
  }

  // 🔽 Clear chat
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