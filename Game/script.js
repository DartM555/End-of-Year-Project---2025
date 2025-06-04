const tiles = document.querySelectorAll('.tile');
const startButton = document.getElementById('startGame');
let sequence = [];
let playerSequence = [];
let level = 0;
let acceptingInput = false;

function getRandomTileIndex() {
    return Math.floor(Math.random() * tiles.length);
}

function flashTile(tile) {
    tile.classList.add('active');
    setTimeout(() => tile.classList.remove('active'), 300);
}

function playSequence() {
    acceptingInput = false;
    let i = 0;
    const interval = setInterval(() => {
        flashTile(tiles[sequence[i]]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
            setTimeout(() => acceptingInput = true, 500);
        }
    }, 500);
}

function startGame() {
    sequence = [];
    playerSequence = [];
    level = 1;
    nextRound();
}

function nextRound() {
    playerSequence = [];
    sequence.push(getRandomTileIndex());
    playSequence();
}

tiles.forEach((tile, idx) => {
    tile.addEventListener('click', () => {
        if (!acceptingInput) return;
        playerSequence.push(idx);
        if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
            tile.classList.add('wrong');
            setTimeout(() => {
                tile.classList.remove('wrong');
                alert('Wrong sequence! Try again.');
                startGame();
            }, 500);
        } else if (playerSequence.length === sequence.length) {
            setTimeout(nextRound, 1000);
        }
    });
});

startButton.addEventListener('click', startGame);


 function createParticles() {
            const particlesContainer = document.getElementById('particles');
            for (let i = 0; i < 15; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 8 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 8) + 's';
                particlesContainer.appendChild(particle);
            }
        }
//When the tile is clicked, it will briefly flash and then disappear to indicate which tile the player clicked

tiles.style.setProperty('--glow-color', '#ff0000');






        // Initialize
        createParticles(10);