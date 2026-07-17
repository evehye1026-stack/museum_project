import { createContext, useContext, useState, useCallback } from 'react'

const ChatbotContext = createContext(null)

export function ChatbotProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [artifact, setArtifact] = useState(null)

  const openChat = useCallback((nextArtifact) => {
    if (nextArtifact) setArtifact(nextArtifact)
    setIsOpen(true)
  }, [])

  const closeChat = useCallback(() => setIsOpen(false), [])
  const resetArtifact = useCallback(() => setArtifact(null), [])

  return (
    <ChatbotContext.Provider
      value={{ isOpen, artifact, openChat, closeChat, resetArtifact }}
    >
      {children}
    </ChatbotContext.Provider>
  )
}

export function useChatbot() {
  const ctx = useContext(ChatbotContext)
  if (!ctx) throw new Error('useChatbot must be used within ChatbotProvider')
  return ctx
}
