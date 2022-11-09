**Author:**
 Harshit Gajjar Mihir Mesia

**Youtube Link**
[Demo](https://youtu.be/9ZP1YUmB4yE)

**Website Link**
[Slides](https://docs.google.com/presentation/d/1pbwqfanXbBBvygGy7RpWY47h24gk93kbKrWLz83vDgo/edit?usp=sharing)

**Design Document**
[Design Document](https://drive.google.com/file/d/1JbQcfZ85_FxeVhW2Ig8f8A0JoiIQaje6/view?usp=share_link)

**Project Objective:**
 A Quiz application for user’s to test their knowledge on various tools, technology and framework such as GIT, JavaScript, ReactJs. The website allows the users to take a single player quiz and test their knowledge, or they can compete with their friends in a timer based quiz. The project is intended to get experience working with NodeJS + MongoDB + ExpressJS + HTML + JavaScript. It also gives exposure working with API’s and their testing in postman

## Installation and running it in local monodb compass (it uses mongoimport)
1. Clone the repository
2. Open it in your favourite editor
3. Run yarn install/ npm install to install node modules
4. Go to terminal and Run **npm run initcat**
5. Run **npm run initques**
6. Run the command **npm start**
7. Go to **http://localhost:3001/**

## Features
1. Login Page (index.html) -> The user can login to the QuizScript app or create account
2. Create Account Page (newuser.html) -> The User can register in the website.
3. Categories Page (categories.html) -> This page shows the various categories the user can choose from to take quiz
4. SinglePlayer Quiz Page (singlequiz.html) -> After choosing a category, user can take the quiz and get result
5. Multiplayer Quiz Page (mulquiz.html) -> User need to select a category and also match with another player to start the quiz and get the result
6. SinglePlayer Result Page (singleResult.html) -> After completing the quiz, they can see their score and their performance
7. Multiplayer Result Page (mulresult.html) -> After completing the quiz, they can see which player won and who has how many points
8. Dashboard page (dashboard.html) -> User can see the summary of all the single and multiplayer quizes taken by them

## Running the multiplayer quiz
For best experience, please close both the browsers, restart the server, start it fresh for it work best
1. Start the server
2. Open the app in 2 different browsers
3. Log in using 2 different credentials
4. Hover over a category in each browser, click on multiplayer quiz
5. Do the same on other browser and make sure that category selected is same for it work.


## Tech Requirements
1. HTML5
2. CSS3
3. JavaScript
4. NodeJs
5. Express
6. Socket.io
7. MongoDB

## Class Link
[CS5610 Web Development Course](https://johnguerra.co/classes/webDevelopment_fall_2022/)

## Screenshots

<img width="1596" alt="Login" src="https://user-images.githubusercontent.com/35658851/199158094-5824d7b7-36e7-4fcf-969d-4235a2e19931.png">
<img width="1727" alt="Categories" src="https://user-images.githubusercontent.com/35658851/199158123-2f4b6432-d798-45e2-b78c-a480bee1dc80.png">
<img width="1728" alt="Categories-Hover" src="https://user-images.githubusercontent.com/35658851/199158147-33ea437b-57bc-4bcd-bc3d-566be4abf4ab.png">
<img width="1728" alt="single-player-quiz" src="https://user-images.githubusercontent.com/35658851/199158167-8416a81f-4274-427f-a030-8f4e4a489ffe.png">
<img width="1726" alt="single player score" src="https://user-images.githubusercontent.com/35658851/199158198-84bcc587-4a38-4faa-941b-531065737627.png">
<img width="1728" alt="dashboard" src="https://user-images.githubusercontent.com/35658851/199158220-6e40355e-8965-4d77-a836-35ae2be71076.png">
<img width="1719" alt="multiplayer" src="https://user-images.githubusercontent.com/35658851/199158306-8d47d1a4-a1e0-48f0-b74c-ad5c242ecdb7.png">
<img width="1726" alt="multiplayer result" src="https://user-images.githubusercontent.com/35658851/199158349-18ee6a92-0614-461c-8b56-403b42bfb64b.png">

## Branching
We followed the concept of pair progarmming while working on this project
1. main - Contains the final code
2. master - Contains the final code
3. rls/harshit - All code commits by Harshit Gajjar
4. rls/mihir - All code commits by Mihir Mesia
5. rls/master - branch to merge changes from rls/harshit and rls/mihir
