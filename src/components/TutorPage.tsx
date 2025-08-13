import React, { useState } from 'react';
import { Search, ArrowLeft, Volume2, BookOpen, Eye, Activity } from 'lucide-react';
import { LearningStyle, GeneratedContent } from '../types';
import { generateContent } from '../services/groqApi';
import ContentDisplay from './ContentDisplay';

interface TutorPageProps {
  learningStyle: LearningStyle;
  onBackToQuiz: () => void;
}

const TutorPage: React.FC<TutorPageProps> = ({ learningStyle, onBackToQuiz }) => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<GeneratedContent | null>(null);

  const handleSearch = async () => {
    if (!topic.trim()) return;
    
    setLoading(true);
    try {
      const generatedContent = await generateContent(topic, learningStyle);
      setContent(generatedContent);
    } catch (error) {
      console.error('Error generating content:', error);
      alert('Error generating content. Please check your API key and try again.');
    }
    setLoading(false);
  };

  const getStyleIcon = (style: LearningStyle) => {
    switch (style) {
      case 'visual': return <Eye className="w-5 h-5" />;
      case 'auditory': return <Volume2 className="w-5 h-5" />;
      case 'readwrite': return <BookOpen className="w-5 h-5" />;
      case 'kinesthetic': return <Activity className="w-5 h-5" />;
    }
  };

  const getStyleColor = (style: LearningStyle) => {
    switch (style) {
      case 'visual': return 'from-purple-500 to-pink-500';
      case 'auditory': return 'from-green-500 to-teal-500';
      case 'readwrite': return 'from-blue-500 to-indigo-500';
      case 'kinesthetic': return 'from-orange-500 to-red-500';
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <header className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBackToQuiz}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Retake Assessment
            </button>
            
            <div className={`px-4 py-2 bg-gradient-to-r ${getStyleColor(learningStyle)} text-white rounded-full flex items-center gap-2`}>
              {getStyleIcon(learningStyle)}
              <span className="font-medium capitalize">{learningStyle} Learner</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Personal Tutor</h1>
          <p className="text-gray-600">Content tailored specifically for your learning style</p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="What would you like to learn about? (e.g., Python programming, photosynthesis, calculus)"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading || !topic.trim()}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              {loading ? 'Generating...' : 'Learn'}
            </button>
          </div>
        </div>

        {content && (
          <ContentDisplay content={content} learningStyle={learningStyle} />
        )}
      </div>
    </div>
  );
};

export default TutorPage;