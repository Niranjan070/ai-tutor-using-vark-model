import React, { useState } from 'react';
import QuizPage from './components/QuizPage';
import TutorPage from './components/TutorPage';
import { LearningStyle } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<'quiz' | 'tutor'>('quiz');
  const [learningStyle, setLearningStyle] = useState<LearningStyle | null>(null);

  const handleQuizComplete = (style: LearningStyle) => {
    setLearningStyle(style);
    setCurrentPage('tutor');
  };

  const handleBackToQuiz = () => {
    setCurrentPage('quiz');
    setLearningStyle(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {currentPage === 'quiz' ? (
        <QuizPage onQuizComplete={handleQuizComplete} />
      ) : (
        <TutorPage 
          learningStyle={learningStyle!} 
          onBackToQuiz={handleBackToQuiz}
        />
      )}
    </div>
  );
}

export default App;