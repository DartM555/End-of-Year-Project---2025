const tiles = document.querySelectorAll('.tile');
const startButton = document.getElementById('startGame');
let sequence = [];
let playerSequence = [];
let level = 0;

function getRandomTile() {
    return tiles[Math.floor(Math.random() * tiles.length)];
}

function flashTile(tile) {
    tile.classList.add('active');
    setTimeout(() => tile.classList.remove('active'), 500);
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        flashTile(sequence[i]);
        i++;
        if (i >= sequence.length) clearInterval(interval);
    }, 1000);
}

function startGame() {
    sequence = [];
    playerSequence = [];
    level = 1;
    nextRound();
}

function nextRound() {
    sequence.push(getRandomTile());
    playSequence();
}

tiles.forEach(tile => {
    tile.addEventListener('click', () => {
        playerSequence.push(tile);
        if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
            alert('Wrong sequence! Try again.');
            startGame();
        } else if (playerSequence.length === sequence.length) {
            playerSequence = [];
            setTimeout(nextRound, 1000);
        }
    });
});



startButton.addEventListener('click', startGame);