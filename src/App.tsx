

import React, { useState } from 'react';
import { LearningStyle } from './types';
import { varkQuestions, analyzeLearningStyle } from './utils/varkQuiz';
import { generateContent } from './services/groqApi';

const NAV_ITEMS = [
  { key: 'home', label: 'Home' },
  { key: 'quiz', label: 'Quiz' },
  { key: 'tutor', label: 'AI Tutor' },
];

const Header: React.FC<{ active: string; onNav: (key: string) => void }> = ({ active, onNav }) => (
  <header className="glassmorphism-header fixed top-0 left-0 w-full py-4 px-8 flex items-center justify-between z-10">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
        <span className="text-white font-bold text-lg">AI</span>
      </div>
      <h1 className="text-2xl font-bold text-white">
        VARK Learning Assistant
      </h1>
    </div>
    <nav>
      <ul className="flex gap-4">
        {NAV_ITEMS.map(item => (
          <li key={item.key}>
            <button
              className={`glassmorphism-button px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                active === item.key 
                  ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg' 
                  : 'text-white hover:text-red-300'
              }`}
              onClick={() => onNav(item.key)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);

const HomePage: React.FC<{ onStartQuiz: () => void }> = ({ onStartQuiz }) => (
  <div className="min-h-screen flex flex-col items-center justify-center pt-24">
    
    <div className="w-full max-w-4xl px-4">
      <div className="glassmorphism-card p-8 text-center mb-8">
        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full mx-auto flex items-center justify-center shadow-xl mb-4">
            <span className="text-white text-2xl font-bold">🎓</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Discover Your Learning Style
          </h2>
        </div>
        <p className="text-lg text-gray-200 mb-8 leading-relaxed">
          Take our scientifically-backed VARK assessment to unlock personalized AI tutoring tailored to your unique learning preferences!
        </p>
        <button
          className="bg-gradient-to-r from-red-600 to-red-800 text-white px-10 py-4 rounded-xl font-semibold text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={onStartQuiz}
        >
          Start Your Learning Journey →
        </button>
      </div>
      
      <div className="glassmorphism-card p-8 text-left">
        <h3 className="text-2xl font-bold text-red-300 mb-4 flex items-center">
          <span className="mr-3">🔬</span>
          What is the VARK Model?
        </h3>
        <p className="text-gray-200 mb-6 leading-relaxed">
          The VARK model is a proven framework that categorizes learners into four distinct types: 
          <span className="font-semibold text-red-300"> Visual</span>, 
          <span className="font-semibold text-orange-300"> Auditory</span>, 
          <span className="font-semibold text-red-400"> Read/Write</span>, and 
          <span className="font-semibold text-red-500"> Kinesthetic</span>. 
          Understanding your learning style helps you absorb information more effectively.
        </p>
        
        <h4 className="text-xl font-semibold text-red-300 mb-3 flex items-center">
          <span className="mr-2">⚡</span>
          How It Works
        </h4>
        <ul className="space-y-3 mb-6">
          <li className="flex items-start">
            <span className="w-6 h-6 bg-red-500/20 text-red-300 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
            <span className="text-gray-200">Complete a short, engaging quiz about your learning preferences</span>
          </li>
          <li className="flex items-start">
            <span className="w-6 h-6 bg-orange-500/20 text-orange-300 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
            <span className="text-gray-200">Get instant analysis of your learning style</span>
          </li>
          <li className="flex items-start">
            <span className="w-6 h-6 bg-red-500/20 text-red-300 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
            <span className="text-gray-200">Access personalized AI tutoring for any subject</span>
          </li>
        </ul>
        
        <div className="glassmorphism-content p-4 rounded-xl">
          <div className="flex items-center">
            <span className="text-2xl mr-3">💡</span>
            <div>
              <span className="font-semibold text-red-300">Why VARK?</span>
              <p className="text-sm text-gray-300 mt-1">Understanding your learning style can improve your study efficiency by up to 40%!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const QuizPage: React.FC<{ onComplete: (style: LearningStyle) => void }> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<LearningStyle[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<LearningStyle | null>(null);

  const handleAnswer = (style: LearningStyle) => {
    setAnswers([...answers, style]);
    if (currentQuestion < varkQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const analysis = analyzeLearningStyle([...answers, style]);
      setResult(analysis.style);
      setShowResults(true);
    }
  };

  const handleContinue = () => {
    if (result) onComplete(result);
  };

  if (showResults && result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24">
        <div className="glassmorphism-card p-8 text-center max-w-2xl">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-full mx-auto flex items-center justify-center shadow-xl mb-4">
              <span className="text-white text-3xl">🎉</span>
            </div>
            <h2 className="text-3xl font-bold text-red-300 mb-2">
              Your Learning Style: <span className="capitalize text-red-200">{result}</span>
            </h2>
          </div>
          <p className="text-lg text-gray-200 mb-8 leading-relaxed">
            Congratulations! You are a <span className="font-semibold capitalize text-red-200">{result}</span> learner. 
            Your AI tutor is now customized to match your learning preferences perfectly.
          </p>
          <button
            className="bg-gradient-to-r from-red-600 to-red-800 text-white px-10 py-4 rounded-xl font-semibold text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={handleContinue}
          >
            Start Learning with AI Tutor →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-24">
      <div className="glassmorphism-card p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            VARK Learning Style Assessment
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex-1 glassmorphism-progress rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-red-500 to-red-700 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / varkQuestions.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-300 font-medium">
              {currentQuestion + 1} of {varkQuestions.length}
            </span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-8 text-center leading-relaxed">
          {varkQuestions[currentQuestion].question}
        </h3>
        
        <div className="space-y-4">
          {varkQuestions[currentQuestion].options.map((option, idx) => (
            <button
              key={idx}
              className="w-full p-6 text-left glassmorphism-quiz-option rounded-xl transition-all duration-300 hover:scale-105 group"
              onClick={() => handleAnswer(option.style)}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white font-bold mr-4 group-hover:scale-110 transition-transform">
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="text-gray-200 group-hover:text-white font-medium leading-relaxed">
                  {option.text}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const TutorPage: React.FC<{ learningStyle: LearningStyle }> = ({ learningStyle }) => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLearn = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError('');
    try {
      const generated = await generateContent(topic, learningStyle);
      setContent(generated.content);
    } catch (err) {
      setError('Failed to generate content. Please check your API key and try again.');
    }
    setLoading(false);
  };

  const getLearningStyleIcon = (style: LearningStyle) => {
    switch (style) {
      case 'visual': return '👁️';
      case 'auditory': return '🎧';
      case 'readwrite': return '📖';
      case 'kinesthetic': return '🤲';
      default: return '🎓';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-24">
      <div className="glassmorphism-card p-8 max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl mr-3">{getLearningStyleIcon(learningStyle)}</span>
            <h2 className="text-3xl font-bold text-white">
              AI Learning Assistant
            </h2>
          </div>
          <p className="text-lg text-gray-200 leading-relaxed">
            Your personalized tutor for <span className="capitalize font-semibold text-red-300">{learningStyle}</span> learning style
          </p>
        </div>
        
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="What would you like to learn? (e.g., Photosynthesis, Calculus, World History)"
            className="flex-1 p-4 glassmorphism-input rounded-xl focus:outline-none text-white placeholder-gray-400"
            onKeyDown={e => e.key === 'Enter' && handleLearn()}
          />
          <button
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleLearn}
            disabled={loading || !topic.trim()}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Generating...
              </div>
            ) : (
              'Learn Now'
            )}
          </button>
        </div>
        
        {error && (
          <div className="glassmorphism-content p-4 rounded-xl border border-red-500/30 text-red-300 mb-6">
            <div className="flex items-center">
              <span className="mr-2">⚠️</span>
              {error}
            </div>
          </div>
        )}
        
        {content && (
          <div className="glassmorphism-content rounded-xl p-6">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">📚</span>
              <h3 className="text-xl font-semibold text-white">Your Personalized Learning Content</h3>
            </div>
            <div className="glassmorphism-scrollbar max-h-96 overflow-y-auto p-6 glassmorphism-content rounded-xl">
              <div className="whitespace-pre-wrap text-gray-200 leading-relaxed text-lg">
                {content}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  const [page, setPage] = useState<'home' | 'quiz' | 'tutor'>('home');
  const [learningStyle, setLearningStyle] = useState<LearningStyle | null>(null);

  const handleNav = (key: string) => {
    if (key === 'quiz') setPage('home'); // Quiz nav returns to home for quiz option
    else if (key === 'tutor' && learningStyle) setPage('tutor');
    else setPage('home');
  };

  const handleStartQuiz = () => setPage('quiz');
  const handleQuizComplete = (style: LearningStyle) => {
    setLearningStyle(style);
    setPage('tutor');
  };

  return (
    <>
      <Header active={page === 'quiz' ? 'quiz' : page} onNav={handleNav} />
      {page === 'home' && <HomePage onStartQuiz={handleStartQuiz} />}
      {page === 'quiz' && <QuizPage onComplete={handleQuizComplete} />}
      {page === 'tutor' && learningStyle && <TutorPage learningStyle={learningStyle} />}
    </>
  );
}

export default App;