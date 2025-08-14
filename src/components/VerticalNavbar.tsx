import React from 'react';

interface HistoryItem {
  topic: string;
  timestamp: string;
}

interface VerticalNavbarProps {
  onRetakeQuiz: () => void;
  onSelectTutor: () => void;
  onSelectNewTopic: () => void;
  onSelectHistory: () => void;
  history: HistoryItem[];
  activeSection: 'quiz' | 'tutor' | 'newTopic' | 'history';
}

const VerticalNavbar: React.FC<VerticalNavbarProps> = ({
  onRetakeQuiz,
  onSelectTutor,
  onSelectNewTopic,
  onSelectHistory,
  history,
  activeSection,
}) => {
  return (
    <nav className="h-full w-64 bg-gradient-to-b from-blue-700 to-purple-700 text-white flex flex-col py-8 px-4 shadow-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center mb-2">AI Tutor</h1>
        <p className="text-center text-sm text-blue-200">VARK Model</p>
      </div>
      <ul className="flex-1 space-y-4">
        <li>
          <button
            className={`w-full text-left px-4 py-2 rounded-lg font-semibold transition-colors ${activeSection === 'quiz' ? 'bg-blue-900' : 'hover:bg-blue-800'}`}
            onClick={onRetakeQuiz}
          >
            Retake Quiz
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left px-4 py-2 rounded-lg font-semibold transition-colors ${activeSection === 'tutor' ? 'bg-purple-900' : 'hover:bg-purple-800'}`}
            onClick={onSelectTutor}
          >
            AI Tutor
          </button>
          <ul className="ml-4 mt-2 space-y-2">
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeSection === 'newTopic' ? 'bg-purple-800' : 'hover:bg-purple-700'}`}
                onClick={onSelectNewTopic}
              >
                New Topics
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeSection === 'history' ? 'bg-purple-800' : 'hover:bg-purple-700'}`}
                onClick={onSelectHistory}
              >
                History
              </button>
              {activeSection === 'history' && (
                <div className="mt-2 bg-purple-900 rounded-lg p-2">
                  <h3 className="text-sm font-semibold mb-2">Latest 5 Topics</h3>
                  <ul className="space-y-1">
                    {history.slice(0, 5).map((item, idx) => (
                      <li key={idx} className="text-xs text-purple-200 truncate">
                        {item.topic} <span className="text-purple-400">({item.timestamp})</span>
                      </li>
                    ))}
                    {history.length === 0 && <li className="text-xs text-purple-400">No history yet.</li>}
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default VerticalNavbar;
