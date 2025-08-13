import { QuizQuestion, LearningStyle, LearningStyleResult } from '../types';

export const varkQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "When you need to learn something new, what do you prefer?",
    options: [
      { text: "Watch videos or look at diagrams and charts", style: "visual" },
      { text: "Listen to explanations or audio recordings", style: "auditory" },
      { text: "Read books or written materials", style: "readwrite" },
      { text: "Try it out hands-on or do practical exercises", style: "kinesthetic" }
    ]
  },
  {
    id: 2,
    question: "When giving directions to someone, you would:",
    options: [
      { text: "Draw a map or show them pictures", style: "visual" },
      { text: "Give verbal directions", style: "auditory" },
      { text: "Write down the directions", style: "readwrite" },
      { text: "Walk with them or guide them physically", style: "kinesthetic" }
    ]
  },
  {
    id: 3,
    question: "In a classroom, you learn best when:",
    options: [
      { text: "The teacher uses visual aids like slides and diagrams", style: "visual" },
      { text: "The teacher explains concepts verbally", style: "auditory" },
      { text: "You can take notes and read materials", style: "readwrite" },
      { text: "There are hands-on activities and experiments", style: "kinesthetic" }
    ]
  },
  {
    id: 4,
    question: "When you have free time, you prefer to:",
    options: [
      { text: "Watch movies or browse visual content", style: "visual" },
      { text: "Listen to music or podcasts", style: "auditory" },
      { text: "Read books or articles", style: "readwrite" },
      { text: "Play sports or do physical activities", style: "kinesthetic" }
    ]
  },
  {
    id: 5,
    question: "When solving a problem, you tend to:",
    options: [
      { text: "Visualize the solution or draw it out", style: "visual" },
      { text: "Talk through it or discuss with others", style: "auditory" },
      { text: "Write down the steps and analyze", style: "readwrite" },
      { text: "Try different approaches until something works", style: "kinesthetic" }
    ]
  }
];

export const analyzeLearningStyle = (answers: LearningStyle[]): LearningStyleResult => {
  const counts = answers.reduce((acc, style) => {
    acc[style] = (acc[style] || 0) + 1;
    return acc;
  }, {} as Record<LearningStyle, number>);

  const dominantStyle = Object.entries(counts).reduce((a, b) => 
    counts[a[0] as LearningStyle] > counts[b[0] as LearningStyle] ? a : b
  )[0] as LearningStyle;

  const styleDescriptions: Record<LearningStyle, { description: string; characteristics: string[] }> = {
    visual: {
      description: "You learn best through visual elements like diagrams, charts, and images. You prefer to see information presented graphically.",
      characteristics: [
        "You understand better with visual aids and diagrams",
        "You like to see the big picture before details",
        "You often think in images and spatial relationships",
        "You prefer colorful, well-organized materials",
        "You benefit from mind maps and flowcharts"
      ]
    },
    auditory: {
      description: "You learn best through listening and discussing. You prefer verbal explanations and audio content.",
      characteristics: [
        "You learn well through lectures and discussions",
        "You like to talk through problems and ideas",
        "You remember information better when you hear it",
        "You enjoy group discussions and verbal feedback",
        "You benefit from reading aloud and audio materials"
      ]
    },
    readwrite: {
      description: "You learn best through reading and writing. You prefer text-based information and taking notes.",
      characteristics: [
        "You prefer reading and writing as learning methods",
        "You like to take detailed notes",
        "You learn well from textbooks and written materials",
        "You enjoy making lists and organizing information",
        "You benefit from rewriting and summarizing content"
      ]
    },
    kinesthetic: {
      description: "You learn best through hands-on experience and physical activity. You prefer practical, real-world applications.",
      characteristics: [
        "You learn best through hands-on experience",
        "You prefer practical examples and real-world applications",
        "You like to move around while learning",
        "You learn well through trial and error",
        "You benefit from experiments and simulations"
      ]
    }
  };

  return {
    style: dominantStyle,
    score: counts[dominantStyle] || 0,
    description: styleDescriptions[dominantStyle].description,
    characteristics: styleDescriptions[dominantStyle].characteristics
  };
};