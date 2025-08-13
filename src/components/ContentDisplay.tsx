import React, { useState } from 'react';
import { Volume2, VolumeX, Eye, BookOpen, Activity, Play } from 'lucide-react';
import { LearningStyle, GeneratedContent } from '../types';

interface ContentDisplayProps {
  content: GeneratedContent;
  learningStyle: LearningStyle;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content, learningStyle }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleTextToSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(content.content);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
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
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className={`bg-gradient-to-r ${getStyleColor(learningStyle)} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getStyleIcon(learningStyle)}
            <h2 className="text-2xl font-bold capitalize">{content.topic}</h2>
          </div>
          
          {learningStyle === 'auditory' && (
            <button
              onClick={handleTextToSpeech}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              {isSpeaking ? 'Stop' : 'Listen'}
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        {learningStyle === 'visual' && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Visual Elements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {content.visualElements?.map((element, index) => (
                <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4 text-purple-600" />
                    <span className="font-medium text-purple-800">Visual Aid {index + 1}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{element}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {learningStyle === 'kinesthetic' && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Hands-on Activities</h3>
            <div className="space-y-4 mb-6">
              {content.practicalTasks?.map((task, index) => (
                <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Play className="w-4 h-4 text-orange-600" />
                    <span className="font-medium text-orange-800">Activity {index + 1}</span>
                  </div>
                  <p className="text-gray-700">{task}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {learningStyle === 'readwrite' && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Reading Materials</h3>
            <div className="space-y-3 mb-6">
              {content.readingMaterials?.map((material, index) => (
                <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Reading {index + 1}</span>
                  </div>
                  <p className="text-gray-700">{material}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="prose max-w-none">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Learning Content</h3>
          <div className="bg-gray-50 rounded-lg p-6 whitespace-pre-wrap text-gray-800 leading-relaxed">
            {content.content}
          </div>
        </div>

        {learningStyle === 'auditory' && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-700">
              <Volume2 className="w-5 h-5" />
              <span className="font-medium">Audio Learning Tip:</span>
            </div>
            <p className="text-green-600 text-sm mt-1">
              Click the "Listen" button above to have the content read aloud. You can also try reading the content out loud yourself or discussing it with others.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentDisplay;