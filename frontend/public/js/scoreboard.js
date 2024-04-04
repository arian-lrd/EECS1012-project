document.addEventListener('DOMContentLoaded', function () {
    // Sample scoreboard data
    const scoreboardData = [
        { player: 'Player 1', score: 100 },
        { player: 'Player 2', score: 95 },
        { player: 'Player 3', score: 90 },
        // Add more player data as needed
    ];

    // Reference to the scoreboard section
    const scoreboardSection = document.getElementById('scoreboard');

    // Function to create scoreboard entries
    function createScoreboardEntry(player, score) {
        const entry = document.createElement('div');
        entry.classList.add('scoreboard-entry');
        entry.innerHTML = `
            <span class="player">${player}</span>
            <span class="score">${score}</span>
        `;
        return entry;
    }

    // Function to render the scoreboard
    function renderScoreboard(data) {
        scoreboardSection.innerHTML = ''; // Clear previous entries
        data.forEach(({ player, score }) => {
            const entry = createScoreboardEntry(player, score);
            scoreboardSection.appendChild(entry);
        });
    }

    // Initially render the scoreboard with sample data
    renderScoreboard(scoreboardData);
});

