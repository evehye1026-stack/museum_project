import { Route, Routes } from 'react-router-dom'
import ChatPanel from './components/ChatPanel'
import Header from './components/Header'
import { ChatbotProvider } from './context/ChatbotContext'
import ArtifactDetailPage from './pages/ArtifactDetailPage'
import ArtifactsPage from './pages/ArtifactsPage'
import CourseDetailPage from './pages/CourseDetailPage'
import CoursesPage from './pages/CoursesPage'
import ForYouPage from './pages/ForYouPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <ChatbotProvider>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailPage />} />
        <Route path="/for-you" element={<ForYouPage />} />
        <Route path="/artifacts" element={<ArtifactsPage />} />
        <Route path="/artifacts/:artifactId" element={<ArtifactDetailPage />} />
      </Routes>

      <ChatPanel />
    </ChatbotProvider>
  )
}

export default App
