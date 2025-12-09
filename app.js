
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
    'general assembly'
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


/* console logs */
console.log("JS Connected Successfully 🔥");

console.log("wordEl =", wordEl);
console.log("wrongLettersEl =", wrongLettersEl);
console.log("attemptsEl =", attemptsEl);
console.log("keyboardEl =", keyboardEl);
console.log("hangmanImgEl =", hangmanImgEl);
console.log("resetBtnEl =", resetBtnEl);

/*----------------------------- Event Listeners -----------------------------*/

resetBtnEl.addEventListener('click', resetGame);

/*-------------------------------- Functions --------------------------------*/

function startGame(){
    console.log("startGame() called ");
    secretWord= WORDS[Math.floor(Math.random() * WORDS.length)].toLowerCase();
    console.log("Secret word selected:", secretWord);

    correctGuess = [];
    wrongGuess =[];
    remainingAttempts = maxAttempts;
    gameOver = false;
    attemptsEl.textContent = 'Attempts Left = ' + remainingAttempts;

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
        console.log("Wrong guess:", letter);
    }

    updateWordDisplay();   
    updateDisplayMsg()
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
    wrongLettersEl.textContent = wrongGuess.join(', '); // joins the wrong guesses array

    console.log("updateWrongLetters → wrongGuess:", wrongGuess);

}

function updateDisplayMsg() {   

    if (gameOver) {
        if (remainingAttempts > 0) {
            messageEl.textContent = "CONGRATS YOU WON!";
        } else {
            messageEl.textContent = "GAME OVER, THE WORD WAS: " + secretWord;
        }
        return; 
    }

    if (remainingAttempts === maxAttempts) {
        messageEl.textContent = "Start Guessing!";
        return;
    }

    if (correctGuess.length > 0) {
        messageEl.textContent = "Good guess!";
        return;
    }

    if (wrongGuess.length > 0) {
        const lastWrong = wrongGuess[wrongGuess.length - 1];
        messageEl.textContent = `Incorrect guess: ${lastWrong}`;
        return;
    }
}


function checkGameOver(){
    if (remainingAttempts === maxAttempts){
        messageEl.textContent = "Start Guessing!";
    }

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
    hangmanImgEl.src = '';

    const buttons = document.querySelectorAll('.key-btn');
    buttons.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('disabled');
    });

    startGame();

}
function generateKeyboard() {
    keyboardEl.innerHTML = "";

    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    alphabet.split("").forEach(letter => {
        const btn = document.createElement("button");
        btn.textContent = letter;
        btn.classList.add("key-btn");
        btn.addEventListener("click", handLetterClick);
        keyboardEl.appendChild(btn);
    });
}
startGame();

