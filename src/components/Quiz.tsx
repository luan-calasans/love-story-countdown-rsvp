import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

// Function to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const questionsData: Question[] = [
  {
    id: 1,
    question: 'Qual é o time do coração do casal?',
    options: [
      'Flamengo',
      'Cruzeiro',
      'Bahia',
      'Palmeiras',
      'Botafogo',
      'Atlético-MG',
      'Corinthians',
      'Mirassol',
      'Grêmio',
      'Santos',
      'Internacional',
      'São Paulo',
      'Juventude',
      'Fortaleza',
    ],
    correctAnswer: 'Santos',
  },
  {
    id: 2,
    question: 'Onde foi o primeiro encontro do casal?',
    options: [
      'La Bannoferia - Santos',
      'Terraço Chopp - São Vicente',
      'Bistrô Calixto Café - Santos',
      'Cantinho do Sabor - São Vicente',
      'Pizzaria Bella Vista - Santos',
      'Bar do Porto - Santos',
      'Restaurante Praia Grande - São Vicente',
      'Café Colonial - Santos',
    ],
    correctAnswer: 'La Bannoferia - Santos',
  },
  {
    id: 3,
    question: 'Onde aconteceu o pedido de casamento?',
    options: [
      'Holambra - Cidade das Flores',
      'Santos - Museu do Café',
      'Parque Municipal Roberto Mário Santini - Santos',
      'Aquário Municipal de Santos',
      'Orquidário Municipal de Santos',
      'Praia do Gonzaga - Santos',
      'Jardim Botânico Chico Mendes - Santos',
      'Parque Estadual da Serra do Mar - São Vicente',
    ],
    correctAnswer: 'Holambra - Cidade das Flores',
  },
];

// Shuffle questions and their options on component mount
const questions: Question[] = questionsData.map((question) => ({
  ...question,
  options: shuffleArray(question.options),
}));

interface QuizProps {
  onComplete: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  const currentQuestion = questions[currentQuestionIndex];
  const maxAttempts = 3;

  const handleAnswerSelect = (answer: string) => {
    if (blocked || showResult) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || blocked || showResult) return;

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setCompletedQuestions((prev) => [...prev, currentQuestion.id]);
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          // Move to next question
          setCurrentQuestionIndex((prev) => prev + 1);
          setAttempts(0);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          // All questions completed
          onComplete();
        }
      }, 2000);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= maxAttempts) {
        setBlocked(true);
      } else {
        setTimeout(() => {
          setSelectedAnswer(null);
          setShowResult(false);
        }, 2000);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAttempts(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setBlocked(false);
    setCompletedQuestions([]);
  };

  if (blocked) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-wedding-cream p-4'>
        <Card className='w-full max-w-md'>
          <CardHeader className='text-center'>
            <XCircle className='w-16 h-16 text-red-500 mx-auto mb-4' />
            <CardTitle className='text-2xl font-playfair text-red-600'>
              Tentativas Esgotadas
            </CardTitle>
          </CardHeader>
          <CardContent className='text-center'>
            <p className='mb-6 text-gray-600'>
              Você esgotou todas as tentativas para esta pergunta. Infelizmente
              não poderá acessar o conteúdo do site.
            </p>
            <Button
              onClick={resetQuiz}
              className='w-full bg-wedding-olive hover:bg-wedding-olive/90 transition-colors duration-200'
            >
              Tentar Novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-wedding-cream p-4'>
      <Card className='w-full max-w-5xl mx-4'>
        <CardHeader className='text-center'>
          <CardTitle className='text-4xl font-playfair text-wedding-olive mb-3'>
            Quiz do Casal
          </CardTitle>
          <p className='text-lg text-gray-600'>
            Responda corretamente para acessar o site do casamento
          </p>
          <div className='flex justify-center items-center gap-3 mt-4'>
            <span className='text-base text-gray-500'>
              Pergunta {currentQuestionIndex + 1} de {questions.length}
            </span>
            <span className='text-base text-gray-500'>
              • Tentativas: {attempts}/{maxAttempts}
            </span>
          </div>

          {/* Progress bar */}
          <div className='w-full bg-gray-200 rounded-full h-2 mt-4'>
            <div
              className='bg-wedding-olive h-2 rounded-full transition-all duration-300'
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / questions.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </CardHeader>

        <CardContent className='space-y-6'>
          <div className='text-center'>
            <h3 className='text-2xl font-medium mb-8'>
              {currentQuestion.question}
            </h3>
          </div>

          <div className='grid grid-cols-2 lg:grid-cols-2 gap-3 min-h-[200px]'>
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === option ? 'default' : 'outline'}
                className={`min-h-[60px] p-3 text-left justify-start whitespace-normal break-words ${
                  selectedAnswer === option
                    ? 'bg-wedding-olive text-white border-wedding-olive'
                    : 'hover:bg-wedding-olive hover:text-white hover:border-wedding-olive transition-colors duration-200'
                }`}
                onClick={() => handleAnswerSelect(option)}
                disabled={showResult || blocked}
              >
                <span className='text-xs leading-tight block w-full'>
                  {option}
                </span>
              </Button>
            ))}
          </div>

          {showResult && (
            <Alert
              className={`mt-4 ${
                isCorrect
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
              }`}
            >
              {isCorrect ? (
                <CheckCircle className='h-4 w-4 text-green-600' />
              ) : (
                <XCircle className='h-4 w-4 text-red-600' />
              )}
              <AlertDescription
                className={isCorrect ? 'text-green-800' : 'text-red-800'}
              >
                {isCorrect
                  ? 'Resposta correta! Parabéns!'
                  : `Resposta incorreta. Tentativas restantes: ${
                      maxAttempts - attempts
                    }`}
              </AlertDescription>
            </Alert>
          )}

          {!showResult && selectedAnswer && (
            <Button
              onClick={handleSubmit}
              className='w-full py-6 text-xl font-medium bg-wedding-olive hover:bg-wedding-olive/90 transition-colors duration-200'
              disabled={!selectedAnswer}
            >
              Confirmar Resposta
            </Button>
          )}

          {attempts > 0 && !showResult && (
            <Alert className='border-yellow-500 bg-yellow-50'>
              <AlertCircle className='h-4 w-4 text-yellow-600' />
              <AlertDescription className='text-yellow-800'>
                Tentativas restantes: {maxAttempts - attempts}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;
