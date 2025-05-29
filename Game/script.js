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
    setTimeout(() => tile.classList.remove('active'), 500);
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
    }, 1000);
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

