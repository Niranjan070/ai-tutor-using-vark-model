import React, { useState } from 'react';
import QuizPage from './components/QuizPage';
import TutorPage from './components/TutorPage';
import VerticalNavbar from './components/VerticalNavbar';
import { LearningStyle } from './types';

interface HistoryItem {
  topic: string;
  timestamp: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'quiz' | 'tutor' | 'newTopic' | 'history'>('quiz');
  const [learningStyle, setLearningStyle] = useState<LearningStyle | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeSection, setActiveSection] = useState<'quiz' | 'tutor' | 'newTopic' | 'history'>('quiz');

  // Simulate topic selection for history
  const handleAddHistory = (topic: string) => {
    const timestamp = new Date().toLocaleString();
    setHistory(prev => [{ topic, timestamp }, ...prev].slice(0, 5));
  };

  const handleQuizComplete = (style: LearningStyle) => {
    setLearningStyle(style);
    setCurrentPage('tutor');
    setActiveSection('tutor');
  };

  const handleBackToQuiz = () => {
    setCurrentPage('quiz');
    setLearningStyle(null);
    setActiveSection('quiz');
  };

  const handleSelectTutor = () => {
    setCurrentPage('tutor');
    setActiveSection('tutor');
  };
  const handleSelectNewTopic = () => {
    setCurrentPage('newTopic');
    setActiveSection('newTopic');
  };
  const handleSelectHistory = () => {
    setCurrentPage('history');
    setActiveSection('history');
  };

  // Dummy new topic page
  const NewTopicPage = () => (
    <div className="flex-1 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold mb-4">New Topics</h2>
        <p className="mb-4">Select or enter a new topic to learn. (Demo page)</p>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => { handleAddHistory('Sample Topic'); setCurrentPage('tutor'); setActiveSection('tutor'); }}
        >
          Learn "Sample Topic"
        </button>
      </div>
    </div>
  );

  // History page
  const HistoryPage = () => (
    <div className="flex-1 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold mb-4">History</h2>
        <ul className="space-y-2">
          {history.length === 0 ? (
            <li className="text-gray-500">No history yet.</li>
          ) : (
            history.map((item, idx) => (
              <li key={idx} className="text-gray-700">
                <span className="font-semibold">{item.topic}</span> <span className="text-gray-400">({item.timestamp})</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      <VerticalNavbar
        onRetakeQuiz={handleBackToQuiz}
        onSelectTutor={handleSelectTutor}
        onSelectNewTopic={handleSelectNewTopic}
        onSelectHistory={handleSelectHistory}
        history={history}
        activeSection={activeSection}
      />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-lg py-4 px-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-700">AI Tutor Using VARK Model</h1>
        </header>
        <main className="flex-1">
          {currentPage === 'quiz' && <QuizPage onQuizComplete={handleQuizComplete} />}
          {currentPage === 'tutor' && learningStyle && (
            <TutorPage 
              learningStyle={learningStyle} 
              onBackToQuiz={handleBackToQuiz}
            />
          )}
          {currentPage === 'newTopic' && <NewTopicPage />}
          {currentPage === 'history' && <HistoryPage />}
        </main>
      </div>
    </div>
  );
}

export default App;