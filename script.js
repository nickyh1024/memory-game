// array of symbols
const symbols = ['🍎', '🍌', '🍇', '🍒', '🍉', '🍓', '🍋', '🍍'];
//create two sets of each symbol to form pairs
const cards = [...symbols, ...symbols];

//shuffle cards using Fisher-yates
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}
//shuffle cards array
shuffle(cards); 

//game board
const gameBoard = document.querySelector('.game-board');

//dynamically create card elements and add them to the game board
cards.forEach(symbol => {
    const card = document.createElement('div');
    //add the 'card' class for styling
    card.classList.add('card');
    //set the card's content
    card.textContent = symbol;
    //attach click event listener so user can click
    card.addEventListener('click', handleCardClick);
    //add to game board
    gameBoard.appendChild(card);
});

//array to track flipped cards
let flippedCards = []; 

//handle card click events
function handleCardClick(event) {
    const clickedCard = event.target;

    //ignore already flipped cards
    if (clickedCard.classList.contains('flipped') || flippedCards.length === 2) return; 

    //flip the clicked card
    clickedCard.classList.add('flipped');
    flippedCards.push(clickedCard);

    //if two cards are flipped, check for a match
    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

//choose single or multiplayer mode
//elements for mode selection and game container
const modeSelection = document.getElementById('mode-selection');
const gameContainer = document.getElementById('game-container');

//buttons to choose mode
const singlePlayerButton = document.getElementById('single-player-button');
const multiPlayerButton = document.getElementById('multi-player-button');

//variable to track game mode
let isSinglePlayer = true; 

//event listener for mode selection
singlePlayerButton.addEventListener('click', () => {
    isSinglePlayer = true; 
    startGame(); 
});

multiPlayerButton.addEventListener('click', () => {
    isSinglePlayer = false; 
    startGame(); 
});

function startGame() {
    modeSelection.style.display = 'none';
    gameContainer.style.display = 'block';
    resetGame(); 
}



//multiplayer mode logic
let player1Score = 0; 
let player2Score = 0; 
let currentPlayer = 1; 

const player1ScoreElement = document.getElementById('player1-score');
const player2ScoreElement = document.getElementById('player2-score');
const currentTurnElement = document.getElementById('current-turn');

// Adjust scoring for single-player mode
function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.textContent === card2.textContent) {
        if (isSinglePlayer) {
            // Update single player score
            score++;
            scoreElement.textContent = `Score: ${score}`;
        } else {
            // Multiplayer mode logic
            if (currentPlayer === 1) {
                player1Score++;
                player1ScoreElement.textContent = `Player 1: ${player1Score}`;
            } else {
                player2Score++;
                player2ScoreElement.textContent = `Player 2: ${player2Score}`;
            }
        }
        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            if (!isSinglePlayer) {
                // Multiplayer mode: Switch turn
                currentPlayer = currentPlayer === 1 ? 2 : 1;
                currentTurnElement.textContent = `Current Turn: Player ${currentPlayer}`;
            }
        }, 1000);
    }

    // Check if the game is over
    if (isSinglePlayer && score === symbols.length) {
        clearInterval(timerInterval);
        alert(`Congratulations! You matched all pairs!`);
    } else if (!isSinglePlayer && player1Score + player2Score === symbols.length) {
        clearInterval(timerInterval);
        const winner = player1Score > player2Score ? 'Player 1 Wins!' : player2Score > player1Score ? 'Player 2 Wins!' : 'It\'s a Tie!';
        alert(winner);
    }
}

//Timer
let timeLeft = 60; 
const timerElement = document.getElementById('timer');

//start the timer
const timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time left: ${timeLeft}s`;

    //check if time runs out
    if (timeLeft <= 0) {
        //stop the timer
        clearInterval(timerInterval);
        alert('Time is up! Game Over!');
        disableAllCards();
    }
}, 1000);

//disable all card interactions after time runs out
function disableAllCards() {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => card.removeEventListener('click', handleCardClick));
}

//track score
let score = 0; 
const scoreElement = document.getElementById('score');


