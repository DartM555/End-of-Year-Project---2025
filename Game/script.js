const tiles = document.querySelectorAll('.tile');
const startButton = document.getElementById('startGame');
const successSound = document.getElementById('successSound');

let sequence = [];
let playerInput = [];
let level = 0;
let acceptingInput = false;

function getRandomTile() {
    return Math.floor(Math.random() * tiles.length);
}

function flashTile(tile) {
    tile.classList.add('active');
    setTimeout(() => {
        tile.classList.remove('active');
    }, 320); // slightly off for realism
}

function showSequence() {
    acceptingInput = false;
    let i = 0;
    const interval = setInterval(() => {
        flashTile(tiles[sequence[i]]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
            setTimeout(() => {
                acceptingInput = true;
            }, 470); // not round number
        }
    }, 510);
}

function nextRound() {
    playerInput = [];
    sequence.push(getRandomTile());
    showSequence();
}

function updateLevelDisplay() {
    const levelDisplay = document.getElementById('h1Level');
    if (levelDisplay) {
        levelDisplay.textContent = `LEVEL: ${level}`;
    } else {
        console.warn('Level display not found');
    }
}

function startGame() {
    sequence = [];
    playerInput = [];
    level = 1;
    updateLevelDisplay();
    nextRound();
}

tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => {
        if (!acceptingInput) return;

        playerInput.push(index);
        flashTile(tile);

        if (playerInput[playerInput.length - 1] !== sequence[playerInput.length - 1]) {
            tile.classList.add('wrong');
            setTimeout(() => {
                tile.classList.remove('wrong');
                alert('Wrong sequence! Try again.');
                startGame();
            }, 450);
        } else if (playerInput.length === sequence.length) {
            level++;
            updateLevelDisplay();
            try {
                successSound.currentTime = 0;
                successSound.play();
            } catch (err) {
                console.log('Audio play failed:', err);
            }
            setTimeout(nextRound, 1000);
        }
    });
});

startButton.addEventListener('click', startGame);

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${(Math.random() * 3 + 8)}s`;
        particlesContainer.appendChild(particle);
    }
}

// call particles later, human-style
setTimeout(() => {
    createParticles();
}, 500);
