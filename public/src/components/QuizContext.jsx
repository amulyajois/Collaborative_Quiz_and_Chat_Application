import React, { createContext, useState, useContext } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [scores, setScores] = useState({});

    const updateScore = (userId, score) => {
        setScores((prevScores) => ({
            ...prevScores,
            [userId]: (prevScores[userId] || 0) + score,
        }));
    };

    return (
        <QuizContext.Provider value={{ scores, updateScore }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => useContext(QuizContext);
