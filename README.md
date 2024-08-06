# QuizBuddy

## 📚 Introduction

**QuizBuddy** is a MERN stack-based application designed to make learning more engaging and effective. In a world where children are increasingly absorbed in social media, **QuizBuddy** offers a unique solution by integrating a chat platform with a quiz application. 

### Key Features

- **Initial Question for Access**: Users must answer a question correctly to enter the main page.
- **Quiz Application**: After gaining access, users can participate in a quiz with various questions, each carrying a score for correct answers.
- **Leaderboard**: Track and compete with other users based on quiz performance.

## 🚀 Features

- **Chat Platform**: Engage with other users in real-time while participating in quizzes.
- **Dynamic Quizzes**: Test and expand knowledge with a range of questions.
- **Interactive Leaderboard**: View and compete for the top spots based on quiz scores.
  
## 🛠️ Technologies Used
-**Frontend**: React, 
-**Backend**: Node.js, Express
-**Database**: MongoDB
-**Real-Time Communication**: Socket.io

### Requirements
- [Nodejs](https://nodejs.org/en/download)
- [Mongodb](https://www.mongodb.com/docs/manual/administration/install-community/)

Both should be installed and make sure mongodb is running.

### Installation
```shell
git clone https://github.com/amulyajois/chatapp
cd chatapp
cd public
mv .env.example .env
cd ..
cd server
mv .env.example .env
cd ..

Now install the dependencies
cd server
yarn
cd ..
cd public
yarn

For Frontend.
cd public
yarn start

For Backend.
Open another terminal in folder, Also make sure mongodb is running in background.
cd server
yarn start

Done! Now open localhost:3000 in your browser.
