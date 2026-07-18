import { Route, Routes, useLocation } from 'react-router-dom'
import ChatPanel from './components/ChatPanel'
import Header from './components/Header'
import { ChatbotProvider } from './context/ChatbotContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { ProgressProvider } from './context/ProgressContext'
import { RecentlyViewedProvider } from './context/RecentlyViewedContext'
import { ThemeProvider } from './context/ThemeContext'
import ArtifactDetailPage from './pages/ArtifactDetailPage'
import ArtifactsPage from './pages/ArtifactsPage'
import CourseDetailPage from './pages/CourseDetailPage'
import CoursesPage from './pages/CoursesPage'
import FavoritesPage from './pages/FavoritesPage'
import ForYouPage from './pages/ForYouPage'
import HomePage from './pages/HomePage'

function App() {
  const location = useLocation()
  const showChat = location.pathname.startsWith('/artifacts')

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <ProgressProvider>
          <RecentlyViewedProvider>
            <ChatbotProvider>
              <Header />

              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/courses/:courseId" element={<CourseDetailPage />} />
                <Route path="/for-you" element={<ForYouPage />} />
                <Route path="/artifacts" element={<ArtifactsPage />} />
                <Route path="/artifacts/:artifactId" element={<ArtifactDetailPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>

              {showChat && <ChatPanel />}
            </ChatbotProvider>
          </RecentlyViewedProvider>
        </ProgressProvider>
      </FavoritesProvider>
    </ThemeProvider>
  )
}

export default App
