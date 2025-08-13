import React, { useState } from 'react';
import { Brain, ArrowRight, CheckCircle } from 'lucide-react';
import { QuizQuestion, LearningStyle, LearningStyleResult } from '../types';
import { varkQuestions, analyzeLearningStyle } from '../utils/varkQuiz';

interface QuizPageProps {
  onQuizComplete: (style: LearningStyle) => void;
}

const QuizPage: React.FC<QuizPageProps> = ({ onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<LearningStyle[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<LearningStyleResult | null>(null);

  const handleAnswerSelect = (style: LearningStyle) => {
    const newAnswers = [...answers, style];
    setAnswers(newAnswers);

    if (currentQuestion < varkQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const analysisResult = analyzeLearningStyle(newAnswers);
      setResults(analysisResult);
      setShowResults(true);
    }
  };

  const handleStartTutoring = () => {
    if (results) {
      onQuizComplete(results.style);
    }
  };

  if (showResults && results) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Assessment Complete!</h2>
            <p className="text-gray-600">Your learning style has been identified</p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
            <h3 className="text-2xl font-bold text-center mb-4 capitalize text-gray-800">
              {results.style} Learner
            </h3>
            <p className="text-gray-700 text-center mb-4">{results.description}</p>
            
            <div className="grid gap-3">
              <h4 className="font-semibold text-gray-800">Your characteristics:</h4>
              {results.characteristics.map((characteristic, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{characteristic}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleStartTutoring}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            Start Personalized Learning
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {currentQuestion === 0 && answers.length === 0 && (
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">VARK Learning Style Assessment</h1>
            <p className="text-xl text-gray-600 mb-8">Discover your unique learning style and get personalized AI tutoring</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">
                Question {currentQuestion + 1} of {varkQuestions.length}
              </span>
              <span className="text-sm font-medium text-blue-600">
                {Math.round(((currentQuestion + 1) / varkQuestions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / varkQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {varkQuestions[currentQuestion].question}
          </h2>

          <div className="space-y-4">
            {varkQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option.style)}
                className="w-full p-4 text-left bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl transition-all duration-200 hover:shadow-md group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-gray-300 group-hover:border-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-gray-700 group-hover:text-blue-700">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;