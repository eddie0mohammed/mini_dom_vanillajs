
/*
GAME FUNCTIONS

- player must guess a number between a min and max
- player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if lose
- Let player choose to play again


*/

//game values
let min  = 1;
let max = 10;
let winnigNum = Math.floor(Math.random() * 10) + 1;
let guessesLeft = 3;


//ui elements
const game = document.getElementById('game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector("#guess-btn");
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

//assign Ui min and max
minNum.textContent = min;
maxNum.textContent = max;

//play-again event listener
game.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('play-again')){
        window.location.reload();
    }
})

//eventListener for submit
guessBtn.addEventListener('click', (e) => {
    let guess = parseInt(guessInput.value);

    //validate
    if (isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    //check if won
    if (guess == winnigNum){
        //disable input
        guessInput.disabled = true;
        //change border color
        guessInput.style.borderColor = 'green';
        //set message
        setMessage(`${winnigNum} is correct, YOU WIN!`, 'green');

        guessBtn.value = 'Play Again!';
        guessBtn.className += 'play-again';
    }else{
        //wrong number 
        guessesLeft -= 1;
        if (guessesLeft === 0){
            //gameover lost
            //disable input
            guessInput.disabled = true;
            //change border color
            guessInput.style.borderColor = 'red';
            //set message
            setMessage(`GameOver, YOU LOST. The correct answer was ${winnigNum}`, 'red');
            guessBtn.value = 'Play Again!';
            guessBtn.className += 'play-again';



        }else{
            //game continues - answer wrong
            setMessage(`Wrong, you have ${guessesLeft} guesses left.`, "red");

            //clear input
            guessInput.value = '';

        }
    }


})

//set message
function setMessage(msg, color){
    message.textContent = msg
    message.style.color = color;
}