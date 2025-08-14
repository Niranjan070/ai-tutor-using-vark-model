# AI Tutor Using VARK Model

This project is an interactive AI-powered tutor built with React and TypeScript, utilizing the VARK learning model to personalize educational experiences. The VARK model categorizes learners into Visual, Auditory, Reading/Writing, and Kinesthetic types, allowing the tutor to adapt content and quizzes for optimal engagement.

## Features

- **Personalized Learning:** Adapts content delivery based on the user's VARK profile.
- **Quiz System:** Interactive quizzes to assess and reinforce learning styles.
- **AI Integration:** Uses Groq API for intelligent content generation and tutoring.
- **Modern UI:** Built with React, Tailwind CSS, and Vite for fast, responsive interfaces.

## Project Structure

```
project/
  ├── eslint.config.js
  ├── index.html
  ├── package.json
  ├── postcss.config.js
  ├── tailwind.config.js
  ├── tsconfig.app.json
  ├── tsconfig.json
  ├── tsconfig.node.json
  ├── vite.config.ts
  └── src/
      ├── App.tsx
      ├── index.css
      ├── main.tsx
      ├── vite-env.d.ts
      ├── components/
      │   ├── ContentDisplay.tsx
      │   ├── QuizPage.tsx
      │   └── TutorPage.tsx
      ├── services/
      │   └── groqApi.ts
      ├── types/
      │   └── index.ts
      └── utils/
          └── varkQuiz.ts
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation
1. Clone the repository:
   ```powershell
   git clone https://github.com/Niranjan070/ai-tutor-using-vark-model.git
   cd ai-tutor-using-vark-model/project
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the development server:
   ```powershell
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage
- Take the VARK quiz to determine your learning style.
- Explore personalized content and interact with the AI tutor.
- Use the quiz and feedback features to improve your learning experience.

## Technologies Used
- **React**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **Groq API**: AI-powered content and tutoring

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License
This project is licensed under the MIT License.

## Contact
For questions or support, contact [Niranjan070](https://github.com/Niranjan070).
