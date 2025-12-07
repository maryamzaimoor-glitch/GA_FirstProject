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
let maxAttempsts = 6;
let remainingAttempts = maxAttempsts;
let gameOver = false;


/*------------------------ Cached Element References ------------------------*/


const wordEl = document.querySelector('#word');
const wrongLettersEl = document.querySelector('#wrong-letters');
const attemptsEl = document.querySelector('#attempts');
const keyboardEl = document.querySelector('#keyboard');
const hangmanImgEl = document.querySelector('#hangman-img');
const resetBtnEl = document.querySelector('#reset')



/*----------------------------- Event Listeners -----------------------------*/

resetBtnEl.addEventListener('click', resetGame);
letterBtnEl.addEventListener('click', handLetterClick());



/*-------------------------------- Functions --------------------------------*/

function startGame(){
    secretWord= WORDS[Math.floor(Math.random() * WORDS.length)].toLowerCase();
    correctGuess = [];
    wrongGuess =[];
    remainingAttempts = [];
    gameOver = false;
    attemptsEl.textContent = 'Attempts Left = ' + remainingAttempts;

  wordEl.textContent = secretWord.split('').map
  (letter => (correctGuess.includes(letter) ? letter : '_')).join(' ');

    generateKeyboard();
    updateWrongLetters();

}



function handleGuess(letter){
    if (gameOver) return;
    let userGuess = letter.split("");
    userGuess.forEach(guess => {
        if (secretWord.includes(guess)) {
            console.log(`${secretWord} contains letter chosen`);
        }
        else console.log(`${secretWord} does not contain letter chosen`);
        wrongGuess.push(guess)
    });
    
    updateDisplayMsg();
    updateWrongLetters();
    attemptsEl.textContent= 'Attemps Left = ' + remainingAttempts;
    checkGameOver();

}


function handLetterClick(){
    if (gameOver) return;
    const letter = this.textContent.toLowerCase()
    handleGuess(letter);

    this.disabled = true;
    this.classList.add('disabled');

}

function updateWrongLetters(){
    wrongLettersEl.textContent = wrongGuess.join(', '); // joins the wrong guesses array

}

function updateDisplayMsg(){   
    if (gameOver)
    if (remainingAttempts >0){
        messageEl.textContent = "CONGRATS YOU WON!"
    }
    else {
        messageEl.textContent = "GAME OVER, THE WORD WAS: " + secretWord;
    }
    return;
    
}
    if (remainingAttempts === maxAttempsts){
        messageEl.textContent = "Start Guessing!";
    }
    
    if (correctGuess.length > 0) {
        messageEl.textContent = "Good guess!";
    }

    if (wrongGuess.length > 0) {
        const lastWrong = wrongGuess[wrongGuess.length - 1];
        messageEl.textContent = `Incorrect guess: ${lastWrong}`;
}


function checkGameOver(){
    if (remainingAttempts === maxAttempsts){
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
}


function disableLetterButtons(){
    const buttons = document.querySelectorAll('.key-btn');
    buttons.forEach(btn=> btn.disabled = true);
}

function resetGame(){
    correctGuess = [];
    wrongGuess = [];
    remainingAttempts = maxAttempsts;
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