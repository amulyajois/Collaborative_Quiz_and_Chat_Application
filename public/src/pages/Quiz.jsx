import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [quizStarted, setQuizStarted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple');
                setQuestions(response.data.results);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, []);

    const handleAnswerSubmit = () => {
        if (questions.length > 0) {
            const currentQuestion = questions[currentQuestionIndex];
            if (userAnswer.toLowerCase() === currentQuestion.correct_answer.toLowerCase()) {
                setScore(score + 1);
            }
            setUserAnswer("");
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleEndQuiz = async () => {
        const storedUser = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
        if (storedUser) {
            const { email, username } = JSON.parse(storedUser);
            await axios.post('http://localhost:5000/api/scores/add', { email, username, score });
            navigate('/leaderboard');
        } else {
            console.error('User not found in local storage');
        }
    };

    const startQuizContent = (
        <StartQuizContainer>
            <h1>Ready to test your knowledge?</h1>
            <div>
                <Button onClick={() => setQuizStarted(true)}>Start Quiz</Button>
                <Button onClick={() => navigate('/leaderboard')}>Show Leaderboard</Button>
                <Button onClick={() => navigate('/')}>Go Back</Button>
            </div>
        </StartQuizContainer>
    );

    if (!quizStarted) {
        return startQuizContent;
    }

    if (currentQuestionIndex >= questions.length) {
        handleEndQuiz();
        return <h2>Quiz completed! Your score: {score}</h2>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <QuizContainer>
            <QuizBox>
                <QuizTitle>Quiz</QuizTitle>
                <Question>{currentQuestion.question}</Question>
                <Answers>
                    {currentQuestion.incorrect_answers.map((answer, index) => (
                        <Answer key={index}>
                            <label>
                                <input 
                                    type="radio" 
                                    name="answer" 
                                    value={answer}
                                    checked={userAnswer === answer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                />
                                {answer}
                            </label>
                        </Answer>
                    ))}
                    <Answer>
                        <label>
                            <input 
                                type="radio" 
                                name="answer" 
                                value={currentQuestion.correct_answer}
                                checked={userAnswer === currentQuestion.correct_answer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                            />
                            {currentQuestion.correct_answer}
                        </label>
                    </Answer>
                </Answers>
                <ButtonContainer>
                    <Button onClick={handleAnswerSubmit}>Submit Answer</Button>
                    <Button onClick={handleEndQuiz}>End Quiz</Button>
                </ButtonContainer>
            </QuizBox>
        </QuizContainer>
    );
};

const QuizContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  height: 100vh;
  padding: 2rem;
`;

const QuizBox = styled.div`
  background-color: #00000076;
  border-radius: 1rem;
  padding: 2rem;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
`;

const QuizTitle = styled.h1`
  margin-bottom: 1rem;
  color: #4e0eff;
  text-align: center;
`;

const Question = styled.h2`
  margin-bottom: 1rem;
  color: white;
`;

const Answers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Answer = styled.div`
  label {
    cursor: pointer;
    color: white;
  }
  input {
    margin-right: 0.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #4e0eff;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: #997af0;
  }
`;

const StartQuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #131324;
  height: 100vh;
  justify-content: center;
  color: white;

  h1 {
    margin-bottom: 2rem;
    color: #4e0eff;
  }

  div {
    display: flex;
    gap: 1rem;
  }
`;

export default Quiz;
