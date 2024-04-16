# EECS 12 Group Project  
* Team: Bravo
* Members: Allen Pham, Arian Amiri, Atoosa Kordnaeij  

## Description
This project is a web-based game application developed as part of the EECS 12 course. The game, inspired by the classic memory sequence challenge, tests players' ability to remember and replicate a series of increasingly complex sequences. Players interact with a visually engaging interface where sequences are presented using themed images and sounds to enhance the gaming experience.

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
Although some features are not fully developed, the main goals of the project are achieved. These features can be further developed in the future, such as:
- **Password Change Feature**: For enhanced security.
- **Multiple Game Themes**: Allowing users to choose between themes like a car theme or flower theme.
- **Difficulty Levels**: Including Hard and Normal to provide challenges for various skill levels.
