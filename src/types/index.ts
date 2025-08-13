export type LearningStyle = 'visual' | 'auditory' | 'readwrite' | 'kinesthetic';

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    style: LearningStyle;
  }[];
}

export interface LearningStyleResult {
  style: LearningStyle;
  score: number;
  description: string;
  characteristics: string[];
}

export interface GeneratedContent {
  topic: string;
  content: string;
  visualElements?: string[];
  practicalTasks?: string[];
  readingMaterials?: string[];
}