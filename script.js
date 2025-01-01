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

//check if two flipped cards match
function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.textContent === card2.textContent) {
        //cards match, increase the score and reset flippedCards array
        score++; 
        scoreElement.textContent = `Score: ${score}`;
        flippedCards = []; 

        //check if all pairs are matched
        if (score === symbols.length) {
            //stop the timer
            clearInterval(timerInterval);
            alert('Congratulations! You matched all pairs!'); 
        }
    }
    else {
        //cards do not match, flip them back 
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = []; 
        }, 1000); 
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