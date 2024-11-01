const images = [
    '🐶', '🐱', '🦊', '🐸', '🐵', '🦁', '🐷', '🐮',
    '🐶', '🐱', '🦊', '🐸', '🐵', '🦁', '🐷', '🐮'
];

let firstCard, secondCard;
let moves = 0;
let matchedPairs = 0;
let isFlipping = false;
let time = 0;
let timerInterval;

document.addEventListener('DOMContentLoaded', () => {
    setupGame();
    document.getElementById('newGame').addEventListener('click', resetGame);
});

function setupGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    moves = 0;
    matchedPairs = 0;
    isFlipping = false;
    document.getElementById('moves').textContent = moves;
    time = 0;
    document.getElementById('timer').textContent = formatTime(time);
    startTimer();

    const shuffledImages = shuffleArray(images.slice());
    shuffledImages.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<span class="card-content">${image}</span>`;
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    });
}

function flipCard(card) {
    if (isFlipping || card === firstCard || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    card.querySelector('.card-content').style.display = 'block'; // Show the card content

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        isFlipping = true;
        moves++;
        document.getElementById('moves').textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    const isMatch = firstCard.innerHTML === secondCard.innerHTML;

    if (isMatch) {
        matchedPairs++;
        resetFlippedCards();
        if (matchedPairs === images.length / 2) endGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.querySelector('.card-content').style.display = 'none'; // Hide the content again
            secondCard.querySelector('.card-content').style.display = 'none'; // Hide the content again
            resetFlippedCards();
        }, 1000);
    }
}

function resetFlippedCards() {
    [firstCard, secondCard] = [null, null];
    isFlipping = false;
}

function resetGame() {
    clearInterval(timerInterval);
    setupGame();
}

function startTimer() {
    timerInterval = setInterval(() => {
        time++;
        document.getElementById('timer').textContent = formatTime(time);
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    setTimeout(() => alert(`Congratulations! You completed the game in ${moves} moves and ${formatTime(time)}.`), 500);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
