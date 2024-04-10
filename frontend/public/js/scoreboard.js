// scoreboard.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('/scoreboard/topten')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch top ten scores: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            displayScoreboard(data);
        })
        .catch(error => {
            console.error('Error fetching top ten scores:', error);
            const scoreboardSection = document.getElementById('scoreboard');
            scoreboardSection.textContent = 'Error loading scoreboard.';
        });
});

function displayScoreboard(scores) {
    const scoreboardSection = document.getElementById('scoreboard');
    scoreboardSection.innerHTML = '';  // Clear any existing content
    const list = document.createElement('ol');

    scores.forEach(user => {
        const item = document.createElement('li');
        item.textContent = `${user.username} - ${user.highScore}`;
        list.appendChild(item);
    });

    scoreboardSection.appendChild(list);
}
