// array of symbols
const symbols = ['🍎', '🍌', '🍇', '🍒', '🍉', '🍓', '🍋', '🍍'];
const cards = [...symbols, ...symbols];

//shuffle cards using Fisher-yates
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}

shuffle(cards); 

//game board
const gameBoard = document.querySelector('.game-board');
cards.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = symbol;
    card.addEventListener('click', handleCardClick);
    gameBoard.appendChild(card);
});

let flippedCards = []; 
function handleCardClick(event) {
    const clickedCard = event.target;

    //ignore already flipped cards
    if (clickedCard.classList.contains('flipped') || flippedCards.length === 2) return; 

    clickedCard.classList.add('flipped');
    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.textContent === card2.textContent) {
        // Match found
        flippedCards = []; 
    }
    else {
        //no match, flip back
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

let timeLeft = 60; 
const timerElement = document.getElementById('timer');

//start the timer
const timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert('Time is up! Game Over!');
        disableAllCards();
    }
}, 1000);

function disableAllCards() {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => card.removeEventListener('click', handleCardClick));
}