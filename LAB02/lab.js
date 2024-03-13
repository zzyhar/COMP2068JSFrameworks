const prompt = require('prompt');

// Define the choices for the game
const choices = ['ROCK', 'PAPER', 'SCISSORS'];

// Function to generate computer selection
function getComputerSelection() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to determine the winner
function determineWinner(userSelection, computerSelection) {
    if (userSelection === computerSelection) {
        return "It's a tie";
    } else if (
        (userSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
        (userSelection === 'PAPER' && computerSelection === 'ROCK') ||
        (userSelection === 'SCISSORS' && computerSelection === 'PAPER')
    ) {
        return "User Wins";
    } else {
        return "Computer Wins";
    }
}

// Start the prompt
prompt.start();

// Get user selection
prompt.get(['choice'], (err, result) => {
    if (err) {
        console.error(err);
        return;
    }

    const userSelection = result.choice.toUpperCase();
    const computerSelection = getComputerSelection();

    console.log(`User Selection: ${userSelection}`);
    console.log(`Computer Selection: ${computerSelection}`);

    const resultMessage = determineWinner(userSelection, computerSelection);
    console.log(`Result: ${resultMessage}`);
});
