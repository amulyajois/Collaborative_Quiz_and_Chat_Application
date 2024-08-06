import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export default function Question() {
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/auth/question");
        setQuestionData(data);
      } catch (err) {
        console.error("Error fetching question data:", err);
        setError("Failed to fetch question.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { question } = questionData;
      const { data } = await axios.post("http://localhost:5000/api/auth/validate-answer", {
        question,
        selectedOption,
      });
      if (data.status) {
        navigate("/"); // Redirect to the main page
      } else {
        alert("Incorrect answer. Please try again.");
      }
    } catch (err) {
      console.error("Error validating answer:", err);
      alert("An error occurred while validating the answer.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!questionData) return <div>No question available</div>;

  return (
    <QuestionContainer>
      <form onSubmit={handleSubmit}>
        <div className="question">
          <h2>{questionData.question}</h2>
        </div>
        <div className="options">
          {questionData.options.map((option, index) => (
            <div key={index} className="option">
              <input
                type="radio"
                id={`option${index}`}
                name="option"
                value={option}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <label htmlFor={`option${index}`}>{option}</label>
            </div>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </QuestionContainer>
  );
}

const QuestionContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;

    .question {
      h2 {
        color: white;
        text-align: center;
      }
    }

    .options {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .option {
        display: flex;
        align-items: center;

        input {
          margin-right: 0.5rem;
        }

        label {
          color: white;
        }
      }
    }

    button {
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
    }
  }
`;

