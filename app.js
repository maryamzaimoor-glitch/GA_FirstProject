
/*-------------------------------- Constants --------------------------------*/

const WORDS = [
    'javascript',
    'hangman',
    'maryam',
    'matcha',
    'BMW',
    'turbo',
    'intake',
    'rain',
    'aubh',
    'student',
    'general assembly',
    'work',
    'training',
    'coding',
    'fun',
    'game',
    'puzzle',
    'challenge',
    'developer',
    'keyboard',
    'monitor',
    'laptop',
    'coffee',
    'tea',
    'water',
    'exercise',
    'music',
    'art',
    'travel',
    'adventure',
    'nature'
];
    

/*-------------------------------- Variables --------------------------------*/

let secretWord = '';
let correctGuess = [];
let wrongGuess = [];
let maxAttempts = 6;
let remainingAttempts = maxAttempts;
let gameOver = false;


/*------------------------ Cached Element References ------------------------*/


const wordEl = document.querySelector('#word');
const wrongLettersEl = document.querySelector('#wrong-letters');
const attemptsEl = document.querySelector('#attempts');
const keyboardEl = document.querySelector('#keyboard');
const hangmanImgEl = document.querySelector('#hangman-img');
const resetBtnEl = document.querySelector('#reset')
const messageEl = document.querySelector('#message');


/*----------------------------- Event Listeners -----------------------------*/

resetBtnEl.addEventListener('click', resetGame);

/*-------------------------------- Functions --------------------------------*/

function startGame(){
    messageEl.textContent = "Start Guessing!"  
    attemptsEl.textContent = "Attempts Left = " + remainingAttempts;
    hangmanImgEl.src = "hangman1.png";
    console.log("startGame() called ");
    secretWord= WORDS[Math.floor(Math.random() * WORDS.length)].toLowerCase();
    console.log("Secret word selected:", secretWord);

    correctGuess = [];
    wrongGuess =[];
    remainingAttempts = maxAttempts;
    gameOver = false;

  wordEl.textContent = secretWord.split('').map
  (letter => (correctGuess.includes(letter) ? letter : '_')).join(' ');

    generateKeyboard();
    updateWrongLetters();

}

function handleGuess(letter) {
    console.log("handleGuess triggered with:", letter);
    console.log("Remaining attempts before guess:", remainingAttempts);

    if (gameOver) return;
    if (correctGuess.includes(letter) || wrongGuess.includes(letter)) {
        console.log("Letter already guessed:", letter);
        return;
    }

    if (secretWord.includes(letter)) {
        correctGuess.push(letter);
        console.log("Correct guess:", letter);
    } 
    
    else {
        wrongGuess.push(letter);
        remainingAttempts--;
        attemptsEl.textContent = "Attempts Left = " + remainingAttempts;

        console.log("Wrong guess:", letter);
    }
    

    updateWordDisplay();   
    updateDisplayMsg(letter);
    checkGameOver();
    updateWrongLetters();
}

function updateWordDisplay() {
    wordEl.textContent = secretWord
        .split('')
        .map(letter => (correctGuess.includes(letter) ? letter : '_'))
        .join(' ');
}


function handLetterClick(){
    if (gameOver) return;
    const letter = this.textContent.toLowerCase()
    handleGuess(letter);

    this.disabled = true;
    this.classList.add('disabled');

    console.log("Button clicked:", this.textContent);


}

function updateWrongLetters(){
    wrongLettersEl.textContent = wrongGuess.join(', '); 
    if (wrongGuess.length === 0) {
        hangmanImgEl.src = "hangman1.png";
    } else {
hangmanImgEl.src = `hangman${wrongGuess.length + 1}.png?v=${Date.now()}`;
    }
    console.log("updateWrongLetters → wrongGuess:", wrongGuess);
    

}
function updateDisplayMsg(letter) {

    if (gameOver) {
        if (remainingAttempts > 0) {
            messageEl.textContent = "CONGRATS YOU WON!";
        } else {
            messageEl.textContent = "GAME OVER, THE WORD WAS: " + secretWord;
        }
        return;
    }

    if (wrongGuess.includes(letter)) {
        messageEl.textContent = `Incorrect guess: ${letter}`;
        return;
    }

    if (correctGuess.includes(letter)) {
        messageEl.textContent = "Good guess!";
        return;
    }
}


function checkGameOver(){

    if (remainingAttempts <= 0){
        gameOver= true;
        disableLetterButtons();
        updateDisplayMsg();
        return;
    }

const allLettersFound = secretWord.split('').every(letter => correctGuess.includes(letter));
    if (allLettersFound) {
        gameOver = true;
        disableLetterButtons();
        updateDisplayMsg();
    }
    console.log("Checking game over... remainingAttempts =", remainingAttempts);

}


function disableLetterButtons(){
    const buttons = document.querySelectorAll('.key-btn');
    buttons.forEach(btn=> btn.disabled = true);
}

function resetGame(){
    correctGuess = [];
    wrongGuess = [];
    remainingAttempts = maxAttempts;
    gameOver = false;

    wrongLettersEl.textContent = "";
    messageEl.textContent = "";
    wordEl.textContent = "";
    hangmanImgEl.src = "hangman1.png";

    const buttons = document.querySelectorAll('.key-btn');
    buttons.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('disabled');
    });

    startGame();

}

function generateKeyboard() {
    keyboardEl.innerHTML = "";

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    alphabet.split("").forEach(letter => {
        const btn = document.createElement("button");
        btn.textContent = letter;
        btn.classList.add("key-btn");
        btn.addEventListener("click", handLetterClick);
        keyboardEl.appendChild(btn);
    });
}

startGame(); 

