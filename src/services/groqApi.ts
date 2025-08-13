import { LearningStyle, GeneratedContent } from '../types';

const GROQ_API_KEY = 'your-groq-api-key-here';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const generateContent = async (topic: string, learningStyle: LearningStyle): Promise<GeneratedContent> => {
  if (!GROQ_API_KEY || GROQ_API_KEY === 'your-groq-api-key-here') {
    // Fallback content for demo purposes
    return generateFallbackContent(topic, learningStyle);
  }

  try {
    const prompt = createPromptForLearningStyle(topic, learningStyle);
    
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';
    
    return parseGeneratedContent(topic, content, learningStyle);
  } catch (error) {
    console.error('Error calling Groq API:', error);
    return generateFallbackContent(topic, learningStyle);
  }
};

const createPromptForLearningStyle = (topic: string, learningStyle: LearningStyle): string => {
  const basePrompt = `Create educational content about "${topic}" specifically tailored for a ${learningStyle} learner. `;
  
  switch (learningStyle) {
    case 'visual':
      return basePrompt + 
        `Focus on visual learning by including descriptions of diagrams, flowcharts, mind maps, and visual representations. 
        Describe what visual aids would be helpful and how information should be presented graphically. 
        Include spatial relationships and visual metaphors.
        Format: Start with [VISUAL_ELEMENTS] section listing 3-4 visual aids, then [CONTENT] with the main explanation.`;
    
    case 'auditory':
      return basePrompt + 
        `Focus on auditory learning with explanations that work well when read aloud. 
        Use conversational tone, include discussion questions, and mention listening strategies. 
        Structure content for verbal presentation and include rhythmic or memorable phrases.
        Format: [CONTENT] with explanation optimized for audio learning.`;
    
    case 'readwrite':
      return basePrompt + 
        `Focus on reading and writing learning by providing detailed written explanations, key terms, and note-taking structure. 
        Include lists, definitions, and written exercises. Organize information for easy note-taking and review.
        Format: Start with [READING_MATERIALS] section with 3-4 reading suggestions, then [CONTENT] with detailed written explanation.`;
    
    case 'kinesthetic':
      return basePrompt + 
        `Focus on kinesthetic learning with hands-on activities, practical exercises, and real-world applications. 
        Include step-by-step activities, experiments, and physical ways to explore the concept.
        Format: Start with [PRACTICAL_TASKS] section listing 3-4 hands-on activities, then [CONTENT] with practical explanation.`;
    
    default:
      return basePrompt + 'Provide comprehensive educational content.';
  }
};

const parseGeneratedContent = (topic: string, content: string, learningStyle: LearningStyle): GeneratedContent => {
  const result: GeneratedContent = {
    topic,
    content: content
  };

  if (learningStyle === 'visual' && content.includes('[VISUAL_ELEMENTS]')) {
    const sections = content.split('[CONTENT]');
    if (sections.length > 1) {
      const visualSection = sections[0].replace('[VISUAL_ELEMENTS]', '').trim();
      result.visualElements = visualSection.split('\n').filter(line => line.trim()).slice(0, 4);
      result.content = sections[1].trim();
    }
  }

  if (learningStyle === 'kinesthetic' && content.includes('[PRACTICAL_TASKS]')) {
    const sections = content.split('[CONTENT]');
    if (sections.length > 1) {
      const tasksSection = sections[0].replace('[PRACTICAL_TASKS]', '').trim();
      result.practicalTasks = tasksSection.split('\n').filter(line => line.trim()).slice(0, 4);
      result.content = sections[1].trim();
    }
  }

  if (learningStyle === 'readwrite' && content.includes('[READING_MATERIALS]')) {
    const sections = content.split('[CONTENT]');
    if (sections.length > 1) {
      const readingSection = sections[0].replace('[READING_MATERIALS]', '').trim();
      result.readingMaterials = readingSection.split('\n').filter(line => line.trim()).slice(0, 4);
      result.content = sections[1].trim();
    }
  }

  return result;
};

const generateFallbackContent = (topic: string, learningStyle: LearningStyle): GeneratedContent => {
  const fallbackContent: Record<LearningStyle, GeneratedContent> = {
    visual: {
      topic,
      content: `This is a demonstration of visual learning for "${topic}". In a real implementation with Groq API, this content would be specifically generated for visual learners with detailed descriptions of diagrams, charts, and visual representations that would help you understand the concept better.\n\nVisual learners benefit from seeing information presented graphically, with clear visual relationships and spatial organization.`,
      visualElements: [
        "Conceptual diagram showing main components and relationships",
        "Flowchart illustrating the process or workflow",
        "Mind map connecting related concepts and ideas", 
        "Infographic summarizing key points with icons and colors"
      ]
    },
    auditory: {
      topic,
      content: `Welcome to your audio-optimized learning experience for "${topic}"! This content is designed to be read aloud and understood through listening. In the full implementation with Groq API, you would receive content with a conversational tone, discussion questions, and rhythmic patterns that make it perfect for auditory learning.\n\nAs an auditory learner, you'll benefit from reading this content aloud, discussing it with others, and using the text-to-speech feature available above.`,
    },
    readwrite: {
      topic,
      content: `Comprehensive Study Guide: ${topic}\n\nThis detailed written explanation is tailored for read/write learners. With the full Groq API integration, you would receive structured content perfect for note-taking, with clear definitions, organized lists, and detailed written explanations.\n\nKey points would be clearly outlined, making it easy for you to create study notes and written summaries.`,
      readingMaterials: [
        "Primary textbook chapters covering fundamental concepts",
        "Academic articles and research papers on the topic",
        "Supplementary reading materials and case studies",
        "Written exercises and reflection questions for deeper understanding"
      ]
    },
    kinesthetic: {
      topic,
      content: `Hands-On Learning Guide: ${topic}\n\nThis practical approach to learning "${topic}" focuses on doing and experiencing. With the complete Groq API integration, you would receive step-by-step activities, experiments, and real-world applications that let you learn through action.\n\nKinesthetic learners like you learn best by trying things out, experimenting, and applying concepts in practical ways.`,
      practicalTasks: [
        "Build a simple model or prototype to understand core concepts",
        "Conduct a hands-on experiment or demonstration",
        "Create a physical project that applies the learned principles",
        "Practice with real-world scenarios and problem-solving exercises"
      ]
    }
  };

  return fallbackContent[learningStyle];
};