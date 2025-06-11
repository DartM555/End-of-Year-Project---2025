const tiles = document.querySelectorAll('.tile');
const startButton = document.getElementById('startGame');
const successSound = document.getElementById('successSound');

let sequence = [];
let playerSequence = [];
let level = 0;
let acceptingInput = false;

function getRandomTile() {
    return Math.floor(Math.random() * tiles.length);
}

function flashTile(tile) {
    tile.classList.add('active');
    setTimeout(() => {
        tile.classList.remove('active');
    }, 320);
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
            }, 470);
        }
    }, 510);
}

function saveRecord(level) {
    let records = JSON.parse(localStorage.getItem('gameRecords') || '[]');
    records.unshift({
        level: level,
        date: new Date().toLocaleDateString()
    });
    records = records.slice(0, 5);
    localStorage.setItem('gameRecords', JSON.stringify(records));
    updateRecordsDisplay();
}

function updateRecordsDisplay() {
    const recordsList = document.getElementById('recordsList');
    if (!recordsList) return;
    
    const records = JSON.parse(localStorage.getItem('gameRecords') || '[]');
    recordsList.innerHTML = records.map(record => 
        `<li>Level ${record.level} - ${record.date}</li>`
    ).join('');
}

function updateLevelDisplay() {
    const levelDisplay = document.getElementById('h1Level');
    if (levelDisplay) {
        levelDisplay.textContent = `LEVEL: ${level}`;
        levelDisplay.classList.remove('level-up');
        void levelDisplay.offsetWidth;
        levelDisplay.classList.add('level-up');
    }
}

function nextRound() {
    playerSequence = [];
    sequence.push(getRandomTile());
    showSequence();
}

function startGame() {
    sequence = [];
    playerSequence = [];
    level = 1;
    updateLevelDisplay();
    nextRound();
}
// Revised by AI
tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => {
        if (!acceptingInput) return;

        playerSequence.push(index);
        flashTile(tile);

        const currentMove = playerSequence.length - 1;
        if (playerSequence[currentMove] !== sequence[currentMove]) {
            tile.classList.add('wrong');
            setTimeout(() => {
                tile.classList.remove('wrong');
                saveRecord(level);
                alert('Wrong sequence! Try again.');
                startGame();
            }, 450);
        } else if (playerSequence.length === sequence.length) {
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
//End of AI revision
startButton.addEventListener('click', startGame);


document.addEventListener('DOMContentLoaded', () => {
    updateRecordsDisplay();
    createParticles();
});
// Used AI
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