# QuizBuddy

## Installation Guide

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
