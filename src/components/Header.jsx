import React from 'react'
import { Moon, Sun, Settings, Trash2 } from 'lucide-react'

const Header = ({ mode, setMode, isDark, toggleTheme, clearChat }) => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TA</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">TransAI</h1>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1">
          <button
            onClick={() => setMode('translator')}
            className={`mode-toggle ${mode === 'translator' ? 'mode-active' : 'mode-inactive'}`}
          >
            Translator
          </button>
          <button
            onClick={() => setMode('assistant')}
            className={`mode-toggle ${mode === 'assistant' ? 'mode-active' : 'mode-inactive'}`}
          >
            AI Assistant
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={clearChat}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Clear chat"
          >
            <Trash2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
