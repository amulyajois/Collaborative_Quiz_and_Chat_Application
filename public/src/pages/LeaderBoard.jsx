import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
    const [scores, setScores] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/scores');
                setScores(response.data);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };

        fetchScores();
    }, []);

    return (
        <LeaderboardContainer>
            <LeaderboardBox>
                <h1>Leaderboard</h1>
                {scores.length > 0 ? (
                    <ul>
                        {scores.map((score) => (
                            <li key={score._id}>
                                User: {score.username}, Score: {score.score}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No scores available.</p>
                )}
            </LeaderboardBox>
            <GoBackButton onClick={() => navigate('/')}>Go Back</GoBackButton>
        </LeaderboardContainer>
    );
};

const LeaderboardContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #131324; /* Light background color */
  color: white;
  position: relative; /* Added to position the Go Back button */
`;

const LeaderboardBox = styled.div`
  background-color: #00000076;
  color: #ffffff;
  padding: 2rem;
  border-radius: 0.8rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 1; /* Ensure the box is above the light background */
  
  h1 {
    color: #4e0eff;
    margin-bottom: 2rem;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      background-color: #383838;
      padding: 1rem 2rem;
      margin: 0.5rem 0;
      border-radius: 0.4rem;
      font-size: 1.2rem;

      
    }
  }

  p {
    color: #ccc;
    font-size: 1.2rem;
  }
`;

const GoBackButton = styled.button`
  background-color: #4e0eff;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.4rem;
  font-size: 1rem;
  cursor: pointer;
  position: absolute;
  bottom: 2rem;
  left: 2rem;

  &:hover {
    background-color: #3a0cfc;
  }
`;

export default Leaderboard;
