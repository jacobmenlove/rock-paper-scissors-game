let wins = 0;
let ties = 0;
let losses = 0;
let rockCount = 0;
let paperCount = 0;
let scissorsCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const winsElement = document.getElementById('wins');
    const tiesElement = document.getElementById('ties');
    const lossesElement = document.getElementById('losses');
    const rockCountElement = document.getElementById('rockCount');
    const paperCountElement = document.getElementById('paperCount');
    const scissorsCountElement = document.getElementById('scissorsCount');
    
    startButton.addEventListener('click', playRound);
});

function playRound() {

    let userChoice = prompt("Enter R for Rock, P for Paper, or S for Scissors:");
    
    if (userChoice === null) {
        endGame();
        return;
    }
    
    userChoice = userChoice.toUpperCase();
    
    if (userChoice !== 'R' && userChoice !== 'P' && userChoice !== 'S') {
        alert("Invalid choice! Please enter R, P, or S.");
        playRound();
        return;
    }
    
    updateChoiceCount(userChoice);
    
    const choices = ['R', 'P', 'S'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    
    const result = determineWinner(userChoice, computerChoice);
    
    let computerChoiceText = computerChoice === 'R' ? 'Rock' : computerChoice === 'P' ? 'Paper' : 'Scissors';
    let userChoiceText = userChoice === 'R' ? 'Rock' : userChoice === 'P' ? 'Paper' : 'Scissors';
    
    updateStats(result);
    
    alert(`You chose: ${userChoiceText}\nComputer chose: ${computerChoiceText}\n\nResult: ${getResultText(result)}`);
    
    const playAgain = confirm("Do you want to play again?");
    if (playAgain) {
        playRound();
    } else {
        endGame();
    }
}

function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "tie";
    } else if (
        (userChoice === 'R' && computerChoice === 'S') ||
        (userChoice === 'P' && computerChoice === 'R') ||
        (userChoice === 'S' && computerChoice === 'P')
    ) {
        return "win";
    } else {
        return "loss";
    }
}

function getResultText(result) {
    if (result === "win") {
        return "You win!";
    } else if (result === "tie") {
        return "It's a tie!";
    } else {
        return "You lose!";
    }
}

function updateChoiceCount(choice) {
    const rockCountElement = document.getElementById('rockCount');
    const paperCountElement = document.getElementById('paperCount');
    const scissorsCountElement = document.getElementById('scissorsCount');
    
    if (choice === 'R') {
        rockCount++;
        rockCountElement.textContent = rockCount;
    } else if (choice === 'P') {
        paperCount++;
        paperCountElement.textContent = paperCount;
    } else if (choice === 'S') {
        scissorsCount++;
        scissorsCountElement.textContent = scissorsCount;
    }
}

function updateStats(result) {
    const winsElement = document.getElementById('wins');
    const tiesElement = document.getElementById('ties');
    const lossesElement = document.getElementById('losses');
    
    if (result === "win") {
        wins++;
        winsElement.textContent = wins;
    } else if (result === "tie") {
        ties++;
        tiesElement.textContent = ties;
    } else {
        losses++;
        lossesElement.textContent = losses;
    }
}

function endGame() {
    alert(`Game Over!\n\nFinal Score:\nWins: ${wins}\nTies: ${ties}\nLosses: ${losses}\n\nYour Choices:\nRock: ${rockCount}\nPaper: ${paperCount}\nScissors: ${scissorsCount}`);
}