import React from 'react'
import { Languages, MessageCircle, Sparkles } from 'lucide-react'

const WelcomeScreen = ({ mode }) => {
  const features = mode === 'translator' 
    ? [
        { icon: Languages, text: "Instant translation to Assamese" },
        { icon: Sparkles, text: "Auto-detect source language" },
        { icon: MessageCircle, text: "Natural conversation flow" }
      ]
    : [
        { icon: MessageCircle, text: "Chat in Assamese or English" },
        { icon: Sparkles, text: "AI responses in Assamese" },
        { icon: Languages, text: "Seamless language switching" }
      ]

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
        {mode === 'translator' ? (
          <Languages className="w-8 h-8 text-white" />
        ) : (
          <MessageCircle className="w-8 h-8 text-white" />
        )}
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {mode === 'translator' ? 'Welcome to Translator Mode' : 'Welcome to AI Assistant Mode'}
      </h2>
      
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        {mode === 'translator' 
          ? 'Type or paste any text to get instant translations to Assamese'
          : 'Chat with AI in Assamese or English. All responses will be in Assamese'
        }
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <feature.icon className="w-6 h-6 text-blue-600 mb-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WelcomeScreen
