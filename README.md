# EECS 1012 Group Project  
* Team: Bravo
* Members: Allen Pham, Arian Amiri, Atoosa Kordnaeij  

## Description
This project is a web-based game application developed as part of the EECS 1012 course. The game, inspired by the classic memory sequence challenge, tests players' ability to remember and replicate a series of increasingly complex sequences. Players interact with a visually engaging interface where sequences are presented using themed images and sounds to enhance the gaming experience.

Key features of the game include:
- **Session Management**: Users can sign up, log in, and have their sessions maintained for a seamless gaming experience.
- **Score Tracking**: The game tracks scores live and updates high scores across sessions using a secure backend system.
- **Interactive UI**: The game features an interactive user interface that allows users to start new games, view scores, and navigate various sections of the game.
- **Sound Effects**: Enhancing the gameplay with audio cues that correspond to player actions and game events.

The backend is built on Node.js and Express, with session management implemented via express-session. Frontend interactions are powered by vanilla JavaScript, showcasing the team's skills in handling both server-side and client-side development.

## Instructions
1. Download the code.
2. After opening the code environment, open the terminal and use `cd` to navigate to the `backend` directory.
3. Once in `backend`, run `npm install` to install all dependencies.
4. Ensure the `backend/.env` file exists (if not, create one and include `JWT_SECRET_KEY=mysupersecretkey123`).
5. Now in the terminal (while in `backend`), run `npm start` to launch the server.
6. The website will now be running at `localhost:5001`.
7. Type `localhost:5001` in your browser to test out the web application.

## Notes
Although some features are not fully developed, the main learning objectives of the project were achieved. We plan to develop these features further in the summer.
### Un-developed features
- **Forgot Password**: Allows users to receive an email with password recovery instructions.
- **Multiple Game Themes**: This allows users to choose between varying themes for the game's images like cars, flowers, or sports. Default implementation in current version is a car-themed game.
- **Difficulty Levels**: Option to choose between Hard and Normal modes to provide challenges for players of various skill levels.
- **Save Score After Game Over**: Ability for an anonymous player to save their score once they create a new account.
- **Safely deleting deprecated features**: Some features that were discussed in design phase no longer seem reasonable. All-time highest score might be confused with the high score, which was originally supposed to represent the user's highest score in current login session.
### Minor bugs
- **Scoreboard not showing for anonymous players**: Sometimes if an un-registered user tries loading the scoreboard page they encounter an error
- **Anonymous player high score**: When an anonymous player plays the game the value of High Score is the object promise from the backend. Proper handling of the promise for un-registered users shall be implemented.
